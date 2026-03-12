import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useDashboardMetrics() {
  return useQuery({
    queryKey: [api.metrics.dashboard.path],
    queryFn: async () => {
      const res = await fetch(api.metrics.dashboard.path, { credentials: "include" });
      if (!res.ok) {
        if (res.status === 404) throw new Error("Dashboard data not found");
        throw new Error("Failed to fetch dashboard metrics");
      }
      return api.metrics.dashboard.responses[200].parse(await res.json());
    },
    // Adding some retry logic for robustness in MVP
    retry: 1,
  });
}

export function useChartData() {
  return useQuery({
    queryKey: [api.metrics.chart.path],
    queryFn: async () => {
      const res = await fetch(api.metrics.chart.path, { credentials: "include" });
      if (!res.ok) {
        throw new Error("Failed to fetch chart data");
      }
      return api.metrics.chart.responses[200].parse(await res.json());
    },
  });
}
