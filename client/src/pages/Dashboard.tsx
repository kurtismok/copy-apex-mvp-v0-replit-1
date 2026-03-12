import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Activity, 
  AlertTriangle, 
  Calendar, 
  Crosshair, 
  Dumbbell, 
  HeartPulse,
  RefreshCw
} from "lucide-react";
import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  ComposedChart, 
  Line, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";

import { useDashboardMetrics, useChartData } from "@/hooks/use-metrics";
import { TacticalCard, CardHeader, CardTitle, CardContent } from "@/components/ui/TacticalCard";
import { SystemOffline } from "@/components/dashboard/SystemOffline";
import { Button } from "@/components/ui/Button";

export default function Dashboard() {
  const { 
    data: metrics, 
    isLoading: metricsLoading, 
    error: metricsError,
    refetch: refetchMetrics
  } = useDashboardMetrics();
  
  const { 
    data: chartData, 
    isLoading: chartLoading, 
    error: chartError,
    refetch: refetchChart
  } = useChartData();

  const handleRetry = () => {
    refetchMetrics();
    refetchChart();
  };

  if (metricsError || chartError) {
    return (
      <div className="pt-20 px-4 max-w-7xl mx-auto">
        <SystemOffline 
          message={(metricsError as Error)?.message || (chartError as Error)?.message || "Connection refused"} 
          onRetry={handleRetry} 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Activity className="text-primary w-5 h-5" />
              <h1 className="text-3xl font-display font-bold uppercase tracking-wider text-foreground">
                Athlete Telemetry Feed
              </h1>
            </div>
            <p className="text-muted-foreground font-sans">
              Live biometrics and tactical adjustments for current training block.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-xs font-display text-primary tracking-widest uppercase mb-1">Status</div>
              <div className="flex items-center space-x-2 bg-secondary border border-border px-3 py-1.5 rounded-sm">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-sans font-medium text-foreground">SYNCED</span>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => handleRetry()} className="h-10 px-3">
              <RefreshCw className={`w-4 h-4 ${(metricsLoading || chartLoading) ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <TacticalCard delay={0.1}>
            <CardHeader><Calendar className="w-4 h-4" /> Cycle Phase</CardHeader>
            <CardTitle>{metricsLoading ? "---" : metrics?.cyclePhase || "Luteal"}</CardTitle>
            <CardContent className="mt-2">Hormonal state baseline</CardContent>
          </TacticalCard>

          <TacticalCard delay={0.2}>
            <CardHeader><Dumbbell className="w-4 h-4" /> Training Intensity</CardHeader>
            <CardTitle className="text-primary glow-text">
              {metricsLoading ? "---" : metrics?.trainingIntensity || "85%"}
            </CardTitle>
            <CardContent className="mt-2">Recommended load capacity</CardContent>
          </TacticalCard>

          <TacticalCard delay={0.3}>
            <CardHeader><Crosshair className="w-4 h-4" /> Tactical S&C</CardHeader>
            <CardTitle className="text-xl">
              {metricsLoading ? "---" : metrics?.tacticalAdjustment || "Reduce plyometric volume"}
            </CardTitle>
            <CardContent className="mt-2">Neuromuscular adjustment</CardContent>
          </TacticalCard>

          <TacticalCard delay={0.4}>
            <CardHeader><HeartPulse className="w-4 h-4" /> Recovery</CardHeader>
            <CardTitle className="text-xl">
              {metricsLoading ? "---" : metrics?.recoveryProtocol || "Ice bath, 8hrs sleep"}
            </CardTitle>
            <CardContent className="mt-2">Post-session protocol</CardContent>
          </TacticalCard>
        </div>

        {/* Biomechanical Alert (if present or mocked) */}
        {(!metricsLoading && (metrics?.biomechanicalAlert || true)) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <TacticalCard variant="destructive">
              <div className="flex items-start space-x-4">
                <div className="bg-destructive/20 p-3 rounded-sm border border-destructive/50">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold uppercase tracking-wider text-destructive mb-1">
                    Biomechanical Safety Alert
                  </h3>
                  <p className="text-foreground font-sans">
                    {metrics?.biomechanicalAlert || "Elevated knee valgus risk detected based on current phase and load history. Prioritize hamstring/glute activation in warm-up."}
                  </p>
                </div>
              </div>
            </TacticalCard>
          </motion.div>
        )}

        {/* Chart Section */}
        <TacticalCard delay={0.6} className="col-span-full h-[500px]">
          <div className="flex items-center justify-between mb-6">
            <CardHeader className="mb-0"><Activity className="w-4 h-4" /> 28-Day Physiological Trend</CardHeader>
            <div className="flex space-x-4 text-xs font-display uppercase tracking-widest">
              <div className="flex items-center"><span className="w-3 h-3 bg-primary rounded-sm mr-2" /> HRV</div>
              <div className="flex items-center"><span className="w-3 h-3 bg-destructive rounded-sm mr-2 opacity-50" /> Injury Risk</div>
            </div>
          </div>
          
          <div className="flex-1 min-h-0 relative">
            {chartLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin glow-box" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData || MOCK_CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis 
                    dataKey="day" 
                    stroke="hsl(var(--muted-foreground))" 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontFamily: 'var(--font-sans)' }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(val) => `D${val}`}
                  />
                  <YAxis 
                    yAxisId="left" 
                    stroke="hsl(var(--muted-foreground))" 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    yAxisId="right" 
                    orientation="right" 
                    stroke="hsl(var(--destructive))" 
                    tick={{ fill: 'hsl(var(--destructive))', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      borderColor: 'hsl(var(--border))',
                      borderRadius: '4px',
                      color: 'hsl(var(--foreground))',
                      fontFamily: 'var(--font-sans)'
                    }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                    labelStyle={{ fontFamily: 'var(--font-display)', textTransform: 'uppercase', color: 'hsl(var(--muted-foreground))', marginBottom: '4px' }}
                  />
                  
                  <Area 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="injuryRisk" 
                    name="Injury Risk %"
                    stroke="hsl(var(--destructive))" 
                    fill="url(#riskGradient)" 
                    strokeWidth={2}
                  />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="hrv" 
                    name="HRV (ms)"
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3} 
                    dot={{ r: 3, fill: 'hsl(var(--background))', stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: 'hsl(var(--primary))', glow: 'true' }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            )}
          </div>
        </TacticalCard>

      </div>
    </div>
  );
}

// Fallback data if API doesn't exist yet but we want to show the beautiful UI
const MOCK_CHART_DATA = Array.from({ length: 28 }, (_, i) => {
  const day = i + 1;
  // Simulate cyclical changes
  const phase = Math.sin((day / 28) * Math.PI * 2);
  return {
    day,
    hrv: Math.round(60 + phase * 15 + Math.random() * 5),
    rhr: Math.round(55 - phase * 5 + Math.random() * 3),
    injuryRisk: Math.max(0, Math.round(15 - phase * 20 + Math.random() * 10)),
  };
});
