import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import { Navbar } from "@/components/layout/Navbar";
import { SearchCommand } from "@/components/search/SearchCommand";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col font-sans relative text-foreground bg-background selection:bg-primary selection:text-primary-foreground">
          {/* Global UI Grid overlay for subtle tactical texture */}
          <div 
            className="fixed inset-0 z-[-1] opacity-[0.03] pointer-events-none"
            style={{ 
              backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)', 
              backgroundSize: '50px 50px' 
            }}
          />
          <Navbar />
          <main className="flex-1 w-full">
            <Router />
          </main>
          <SearchCommand />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
