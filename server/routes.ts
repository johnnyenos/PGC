import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { Player } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // Mock player data
  const mockPlayers: Player[] = [
    {
      id: 1,
      name: "Marcus Johnson",
      school: "Central High",
      accolade: "State MVP 2023",
      category: "allstar",
      team: "varsity"
    },
    {
      id: 2,
      name: "Sarah Williams",
      school: "East Academy",
      accolade: "All-Conference First Team",
      category: "threepoint",
      team: null
    },
    // Add more mock players as needed
  ];

  // Player routes
  app.get("/api/players", (_req, res) => {
    res.json(mockPlayers);
  });

  app.get("/api/players/threepoint", (_req, res) => {
    res.json(mockPlayers.filter(p => p.category === "threepoint"));
  });

  app.get("/api/players/dunk", (_req, res) => {
    res.json(mockPlayers.filter(p => p.category === "dunk"));
  });

  app.get("/api/players/allstar", (_req, res) => {
    res.json(mockPlayers.filter(p => p.category === "allstar"));
  });

  // Giveaway form submission
  app.post("/api/giveaway", (req, res) => {
    // TODO: Store giveaway entry
    res.status(201).json({ message: "Entry submitted successfully" });
  });

  const httpServer = createServer(app);
  return httpServer;
}
