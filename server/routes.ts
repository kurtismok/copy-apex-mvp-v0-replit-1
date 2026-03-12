import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.metrics.dashboard.path, async (req, res) => {
    const metric = await storage.getDashboardMetrics();
    if (!metric) {
      return res.status(404).json({ message: 'No dashboard metrics found' });
    }
    res.json(metric);
  });

  app.get(api.metrics.chart.path, async (req, res) => {
    // Generate mock 28-day cycle data
    const data = Array.from({ length: 28 }, (_, i) => {
      const day = i + 1;
      const isOvulatory = day >= 12 && day <= 16;
      return {
        day,
        hrv: Math.floor(Math.random() * 20) + (isOvulatory ? 50 : 65),
        rhr: Math.floor(Math.random() * 10) + (isOvulatory ? 65 : 55),
        injuryRisk: isOvulatory ? 80 : 30 + Math.floor(Math.random() * 20),
      };
    });
    res.json(data);
  });

  // Seed data
  const existing = await storage.getDashboardMetrics();
  if (!existing) {
    await storage.createMetrics({
      athleteId: 1,
      cyclePhase: "Late Follicular Phase",
      trainingIntensity: "Moderate",
      biomechanicalAlert: "ACL Injury-Risk Alert: Elevated relaxin levels detected.",
      tacticalAdjustment: "Neuromuscular Control Emphasis. Reduce heavy plyometrics.",
      recoveryProtocol: "15 min active recovery bike + targeted hamstring/glute mobility.",
    });
  }

  return httpServer;
}
