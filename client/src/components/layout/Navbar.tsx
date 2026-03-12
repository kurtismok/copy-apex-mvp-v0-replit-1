import { Link, useLocation } from "wouter";
import { Activity, Menu } from "lucide-react";
import { cn } from "@/components/ui/TacticalCard";

export function Navbar() {
  const [location] = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group outline-none">
          <Activity className="w-6 h-6 text-primary group-hover:glow-text transition-all" />
          <span className="font-display font-bold text-2xl tracking-[0.2em] text-foreground">APEX</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <NavLink href="/" active={location === "/"}>Mission</NavLink>
          <NavLink href="/dashboard" active={location === "/dashboard"}>Data Feed</NavLink>
          <div className="h-6 w-px bg-border"></div>
          <Link 
            href="/dashboard" 
            className="font-display uppercase tracking-wider text-sm font-bold bg-primary text-primary-foreground px-4 py-2 rounded-sm hover:glow-box transition-all"
          >
            System Login
          </Link>
        </div>

        <button className="md:hidden text-foreground hover:text-primary transition-colors">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
}

function NavLink({ href, active, children }: { href: string, active: boolean, children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className={cn(
        "font-display uppercase tracking-widest text-sm transition-colors hover:text-primary outline-none",
        active ? "text-primary glow-text" : "text-muted-foreground"
      )}
    >
      {children}
    </Link>
  );
}
