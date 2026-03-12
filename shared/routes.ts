import { z } from 'zod';
import { metrics } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  metrics: {
    dashboard: {
      method: 'GET' as const,
      path: '/api/metrics/dashboard' as const,
      responses: {
        200: z.custom<typeof metrics.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    chart: {
      method: 'GET' as const,
      path: '/api/metrics/chart' as const,
      responses: {
        200: z.array(z.object({
          day: z.number(),
          hrv: z.number(),
          rhr: z.number(),
          injuryRisk: z.number(),
        })),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type DashboardResponse = z.infer<typeof api.metrics.dashboard.responses[200]>;
export type ChartDataResponse = z.infer<typeof api.metrics.chart.responses[200]>;
