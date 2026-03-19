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

  // ⭐ NEW STATE FOR DAILY CHECK-IN
  const [energy, setEnergy] = useState(3);
  const [mood, setMood] = useState("Neutral");
  const [soreness, setSoreness] = useState(3);
  const [cycleDay, setCycleDay] = useState(1);

  const handleSubmit = () => {
    console.log({ energy, mood, soreness, cycleDay });
    alert("Check-in saved!");
  };

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

        {/* ⭐ NEW: DAILY CHECK-IN */}
        <div className="mb-8">
          <TacticalCard delay={0.45}>
            <CardHeader>
              <CardTitle>Daily Check-In</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              
              {/* Energy */}
              <div>
                <label className="text-sm font-medium">Energy: {energy}</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={energy}
                  onChange={(e) => setEnergy(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Mood */}
              <div>
                <label className="text-sm font-medium">Mood</label>
                <div className="flex gap-2 mt-1">
                  {["Happy", "Neutral", "Tired"].map((m) => (
                    <button
                      key={m}
                      onClick={() => setMood(m)}
                      className={`px-3 py-1 rounded ${
                        mood === m ? "bg-primary text-white" : "bg-muted"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Soreness */}
              <div>
                <label className="text-sm font-medium">Soreness: {soreness}</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={soreness}
                  onChange={(e) => setSoreness(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Cycle Day */}
              <div>
                <label className="text-sm font-medium">Cycle Day</label>
                <input
                  type="number"
                  min="1"
                  max="28"
                  value={cycleDay}
                  onChange={(e) => setCycleDay(Number(e.target.value))}
                  className="w-full border rounded px-2 py-1 mt-1"
                />
              </div>

              <Button onClick={handleSubmit} className="w-full">
                Save Check-In
              </Button>
            </CardContent>
          </TacticalCard>
        </div>
