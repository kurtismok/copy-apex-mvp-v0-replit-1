import { db } from "./db";
import { metrics, type InsertMetric, type Metric } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getDashboardMetrics(): Promise<Metric | undefined>;
  createMetrics(metric: InsertMetric): Promise<Metric>;
}

export class DatabaseStorage implements IStorage {
  async getDashboardMetrics(): Promise<Metric | undefined> {
    const [metric] = await db.select().from(metrics).orderBy(metrics.id).limit(1);
    return metric;
  }

  async createMetrics(metric: InsertMetric): Promise<Metric> {
    const [newMetric] = await db.insert(metrics).values(metric).returning();
    return newMetric;
  }
}

export const storage = new DatabaseStorage();
