import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const metrics = pgTable("metrics", {
  id: serial("id").primaryKey(),
  athleteId: integer("athlete_id").notNull(),
  cyclePhase: text("cycle_phase").notNull(),
  trainingIntensity: text("training_intensity").notNull(),
  biomechanicalAlert: text("biomechanical_alert"),
  tacticalAdjustment: text("tactical_adjustment").notNull(),
  recoveryProtocol: text("recovery_protocol").notNull(),
  date: timestamp("date").defaultNow().notNull(),
});

export const insertMetricSchema = createInsertSchema(metrics).omit({ id: true, date: true });

export type InsertMetric = z.infer<typeof insertMetricSchema>;
export type Metric = typeof metrics.$inferSelect;
