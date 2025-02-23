import { pgTable, text, serial, varchar, integer, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
});

export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  school: varchar("school", { length: 100 }).notNull(),
  accolade: varchar("accolade", { length: 200 }).notNull(),
  category: varchar("category", { length: 50 }).notNull(), // 'allstar', 'threepoint', 'dunk'
  team: varchar("team", { length: 50 }), // 'rising' or 'varsity' for all-stars
  // New fields for enhanced player profiles
  jersey_number: integer("jersey_number"),
  position: varchar("position", { length: 50 }),
  height: varchar("height", { length: 20 }),
  weight: integer("weight"),
  grad_year: integer("grad_year"),
  // Stats
  stats: json("stats").default({
    points_per_game: 0,
    assists_per_game: 0,
    rebounds_per_game: 0,
    steals_per_game: 0,
    blocks_per_game: 0,
    field_goal_percentage: 0,
    three_point_percentage: 0,
  }),
  // Social media
  social_media: json("social_media").default({
    instagram: "",
    twitter: "",
    facebook: "",
    youtube: "",
  }),
  // Media content
  highlight_video_url: text("highlight_video_url"),
  profile_image_url: text("profile_image_url"),
  // Performance tracking
  performance_history: json("performance_history").default([]),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

// Enhanced player schema
export const insertPlayerSchema = createInsertSchema(players).omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Player = typeof players.$inferSelect;

// Additional types for stats
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