import { AlertTriangle, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function SystemOffline({ onRetry, message }: { onRetry: () => void, message: string }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-destructive/10 border border-destructive/30 p-8 rounded-md relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-destructive to-transparent opacity-50" />
        
        <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-6" strokeWidth={1.5} />
        
        <h2 className="font-display text-2xl tracking-widest text-destructive font-bold uppercase mb-2">
          Telemetry Offline
        </h2>
        
        <p className="text-muted-foreground font-sans mb-8">
          {message}. Data feed interrupted or backend systems are not responding. Check connection and retry.
        </p>

        <Button onClick={onRetry} variant="outline" className="border-destructive text-destructive hover:bg-destructive/10 w-full">
          <RefreshCcw className="w-4 h-4 mr-2" />
          Re-establish Connection
        </Button>
      </motion.div>
    </div>
  );
}
