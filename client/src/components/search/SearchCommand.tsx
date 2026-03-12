import * as React from "react";
import { useLocation } from "wouter";
import {
  Activity,
  AlertTriangle,
  Calendar,
  Crosshair,
  Dumbbell,
  HeartPulse,
  Home,
  LayoutDashboard,
  Search,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

type SearchItem = {
  id: string;
  label: string;
  description: string;
  href: string;
  keywords: string[];
  icon: React.ReactNode;
};

const searchItems: SearchItem[] = [
  {
    id: "home",
    label: "Home",
    description: "Go to the landing page",
    href: "/",
    keywords: ["landing", "mission", "apex", "main"],
    icon: <Home className="w-4 h-4" />,
  },
  {
    id: "dashboard",
    label: "Dashboard",
    description: "Open the athlete telemetry feed",
    href: "/dashboard",
    keywords: ["data", "feed", "metrics", "overview", "telemetry"],
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    id: "cycle-phase",
    label: "Cycle Phase",
    description: "View hormonal state baseline",
    href: "/dashboard",
    keywords: ["calendar", "phase", "hormonal", "baseline"],
    icon: <Calendar className="w-4 h-4" />,
  },
  {
    id: "training-intensity",
    label: "Training Intensity",
    description: "View recommended load capacity",
    href: "/dashboard",
    keywords: ["intensity", "load", "training", "capacity"],
    icon: <Dumbbell className="w-4 h-4" />,
  },
  {
    id: "tactical-sc",
    label: "Tactical S&C",
    description: "View neuromuscular adjustment",
    href: "/dashboard",
    keywords: ["tactical", "adjustment", "strength", "conditioning"],
    icon: <Crosshair className="w-4 h-4" />,
  },
  {
    id: "recovery",
    label: "Recovery",
    description: "View post-session protocol",
    href: "/dashboard",
    keywords: ["recovery", "sleep", "protocol", "heart"],
    icon: <HeartPulse className="w-4 h-4" />,
  },
  {
    id: "biomechanical-alert",
    label: "Biomechanical Alert",
    description: "Review current safety warning",
    href: "/dashboard",
    keywords: ["alert", "risk", "injury", "warning", "biomechanical"],
    icon: <AlertTriangle className="w-4 h-4" />,
  },
  {
    id: "trend-chart",
    label: "Physiological Trend",
    description: "View 28-day trend chart",
    href: "/dashboard",
    keywords: ["chart", "trend", "hrv", "injury risk", "graph"],
    icon: <Activity className="w-4 h-4" />,
  },
];

export function SearchCommand() {
  const [, navigate] = useLocation();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";

      if (isShortcut) {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleSelect = (href: string) => {
    setOpen(false);
    navigate(href);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-sm border border-border bg-background/95 px-4 py-2 text-sm text-foreground shadow-lg backdrop-blur hover:border-primary hover:text-primary transition-all"
        aria-label="Open search"
      >
        <Search className="w-4 h-4" />
        <span className="font-display uppercase tracking-wider">Search</span>
        <span className="rounded-sm border border-border px-2 py-0.5 text-[10px] text-muted-foreground">
          Ctrl K
        </span>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search pages, metrics, and dashboard sections..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Navigation">
            {searchItems.slice(0, 2).map((item) => (
              <CommandItem
                key={item.id}
                value={[item.label, item.description, ...item.keywords].join(" ")}
                onSelect={() => handleSelect(item.href)}
              >
                {item.icon}
                <div className="flex flex-col">
                  <span>{item.label}</span>
                  <span className="text-xs text-muted-foreground">{item.description}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Dashboard">
            {searchItems.slice(2).map((item) => (
              <CommandItem
                key={item.id}
                value={[item.label, item.description, ...item.keywords].join(" ")}
                onSelect={() => handleSelect(item.href)}
              >
                {item.icon}
                <div className="flex flex-col">
                  <span>{item.label}</span>
                  <span className="text-xs text-muted-foreground">{item.description}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Shortcut">
            <CommandItem onSelect={() => setOpen(false)}>
              <Search className="w-4 h-4" />
              <span>Close Search</span>
              <CommandShortcut>Esc</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
