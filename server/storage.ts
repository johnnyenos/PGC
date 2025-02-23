import { users, players, giveawayEntries, type User, type InsertUser, type Player, type GiveawayEntry } from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByVerificationToken(token: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User>;

  // Player operations
  getPlayers(): Promise<Player[]>;
  getPlayersByCategory(category: string): Promise<Player[]>;
  getPlayersByTeam(team: string): Promise<Player[]>;
  createPlayer(player: any): Promise<Player>;
  updatePlayer(id: number, player: Partial<any>): Promise<Player>;

  // Giveaway operations
  createGiveawayEntry(entry: GiveawayEntry): Promise<GiveawayEntry>;
  getGiveawayEntry(userId: number): Promise<GiveawayEntry | undefined>;
  getAllGiveawayEntries(): Promise<GiveawayEntry[]>;
  updateGiveawayEntry(id: number, updates: Partial<GiveawayEntry>): Promise<GiveawayEntry>;

  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // Prune expired entries every 24h
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByVerificationToken(token: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.verificationToken, token));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User> {
    const [user] = await db
      .update(users)
      .set(updates)
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // Player operations
  async getPlayers(): Promise<Player[]> {
    return await db.select().from(players);
  }

  async getPlayersByCategory(category: string): Promise<Player[]> {
    return await db.select().from(players).where(eq(players.category, category));
  }

  async getPlayersByTeam(team: string): Promise<Player[]> {
    return await db.select().from(players).where(eq(players.team, team));
  }

  async createPlayer(player: any): Promise<Player> {
    const [newPlayer] = await db.insert(players).values(player).returning();
    return newPlayer;
  }

  async updatePlayer(id: number, player: Partial<any>): Promise<Player> {
    const [updatedPlayer] = await db
      .update(players)
      .set(player)
      .where(eq(players.id, id))
      .returning();
    return updatedPlayer;
  }

  // Giveaway operations
  async createGiveawayEntry(entry: GiveawayEntry): Promise<GiveawayEntry> {
    const [newEntry] = await db.insert(giveawayEntries).values(entry).returning();
    return newEntry;
  }

  async getGiveawayEntry(userId: number): Promise<GiveawayEntry | undefined> {
    const [entry] = await db
      .select()
      .from(giveawayEntries)
      .where(eq(giveawayEntries.userId, userId));
    return entry;
  }

  async getAllGiveawayEntries(): Promise<GiveawayEntry[]> {
    return await db.select().from(giveawayEntries);
  }

  async updateGiveawayEntry(id: number, updates: Partial<GiveawayEntry>): Promise<GiveawayEntry> {
    const [entry] = await db
      .update(giveawayEntries)
      .set(updates)
      .where(eq(giveawayEntries.id, id))
      .returning();
    return entry;
  }
}

export const storage = new DatabaseStorage();