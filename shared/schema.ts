import { pgTable, text, serial, varchar, integer, json, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  isVerified: boolean("is_verified").default(false),
  verificationToken: text("verification_token"),
  verificationTokenExpiry: timestamp("verification_token_expiry"),
  hasSignedWaiver: boolean("has_signed_waiver").default(false),
  isAdmin: boolean("is_admin").default(false),
});

export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  school: varchar("school", { length: 100 }).notNull(),
  accolade: varchar("accolade", { length: 200 }).notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  team: varchar("team", { length: 50 }),
  jersey_number: integer("jersey_number"),
  position: varchar("position", { length: 50 }),
  height: varchar("height", { length: 20 }),
  weight: integer("weight"),
  grad_year: integer("grad_year"),
  stats: json("stats").$type<PlayerStats>().default({
    points_per_game: 0,
    assists_per_game: 0,
    rebounds_per_game: 0,
    steals_per_game: 0,
    blocks_per_game: 0,
    field_goal_percentage: 0,
    three_point_percentage: 0,
  }),
  social_media: json("social_media").$type<SocialMedia>().default({
    instagram: "",
    twitter: "",
    facebook: "",
    youtube: "",
  }),
  highlight_video_url: text("highlight_video_url"),
  profile_image_url: text("profile_image_url"),
  performance_history: json("performance_history").$type<PerformanceRecord[]>().default([]),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// New giveaway entries table
export const giveawayEntries = pgTable("giveaway_entries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  isWinner: boolean("is_winner").default(false),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

export const insertPlayerSchema = createInsertSchema(players).omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const insertGiveawayEntrySchema = createInsertSchema(giveawayEntries).omit({
  id: true,
  userId: true,
  created_at: true,
  isWinner: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Player = typeof players.$inferSelect;
export type GiveawayEntry = typeof giveawayEntries.$inferSelect;

export type PlayerStats = {
  points_per_game: number;
  assists_per_game: number;
  rebounds_per_game: number;
  steals_per_game: number;
  blocks_per_game: number;
  field_goal_percentage: number;
  three_point_percentage: number;
};

export type SocialMedia = {
  instagram: string;
  twitter: string;
  facebook: string;
  youtube: string;
};

export type PerformanceRecord = {
  event_name: string;
  date: string;
  stats: PlayerStats;
  highlights: string[];
};