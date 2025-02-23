import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";
import { sendVerificationEmail, generateVerificationToken } from "./utils/email";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export function setupAuth(app: Express) {
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !(await comparePasswords(password, user.password))) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  app.post("/api/register", async (req, res, next) => {
    try {
      // Check for existing username
      const existingUserByUsername = await storage.getUserByUsername(req.body.username);
      if (existingUserByUsername) {
        return res.status(400).json({ error: "Username already exists" });
      }

      // Check for existing email
      const existingUserByEmail = await storage.getUserByEmail(req.body.email);
      if (existingUserByEmail) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const verificationToken = generateVerificationToken();
      const tokenExpiry = new Date();
      tokenExpiry.setHours(tokenExpiry.getHours() + 24); // Token expires in 24 hours

      const user = await storage.createUser({
        ...req.body,
        password: await hashPassword(req.body.password),
        verificationToken,
        verificationTokenExpiry: tokenExpiry,
        isVerified: false,
        hasSignedWaiver: false,
      });

      // Send verification email
      try {
        await sendVerificationEmail(user.email, verificationToken);
      } catch (error) {
        console.error("Failed to send verification email:", error);
        // Don't fail registration if email fails, but log it
      }

      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json(user);
      });
    } catch (error: any) {
      console.error("Registration error:", error);
      if (error.code === '23505') { // PostgreSQL unique constraint violation
        return res.status(400).json({ error: "Username or email already exists" });
      }
      next(error);
    }
  });

  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ error: "Invalid credentials" });

      req.login(user, (err) => {
        if (err) return next(err);

        if (!user.isVerified) {
          return res.status(403).json({
            error: "Email not verified",
            message: "Please verify your email before logging in",
          });
        }

        res.json(user);
      });
    })(req, res, next);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    res.json(req.user);
  });

  // Email verification endpoint
  app.get("/api/verify-email", async (req, res) => {
    const { token } = req.query;
    if (!token) {
      return res.status(400).send("Verification token is required");
    }

    try {
      const user = await storage.getUserByVerificationToken(token as string);
      if (!user) {
        return res.status(404).send("Invalid verification token");
      }

      if (user.verificationTokenExpiry && new Date() > new Date(user.verificationTokenExpiry)) {
        return res.status(400).send("Verification token has expired");
      }

      await storage.updateUser(user.id, {
        isVerified: true,
        verificationToken: null,
        verificationTokenExpiry: null,
      });

      res.send("Email verified successfully. You can now log in.");
    } catch (error) {
      console.error("Email verification error:", error);
      res.status(500).send("Failed to verify email");
    }
  });

  // Digital waiver endpoints
  app.post("/api/waiver/sign", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!req.user.isVerified) {
      return res.status(403).send("Please verify your email before signing the waiver");
    }

    try {
      await storage.updateUser(req.user.id, {
        hasSignedWaiver: true,
      });
      res.sendStatus(200);
    } catch (error) {
      console.error("Waiver signing error:", error);
      res.status(500).send("Failed to sign waiver");
    }
  });

  app.get("/api/waiver/status", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    res.json({ hasSignedWaiver: req.user.hasSignedWaiver });
  });
}