import { motion } from "framer-motion";
import { Link } from "wouter";
import { Shield, Target, Zap, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center overflow-hidden min-h-[80vh]">
        {/* Abstract grid background for tactical feel */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(hsl(var(--primary)/0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        {/* landing page hero tactical athlete training dark wash */}
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2940&auto=format&fit=crop" 
          alt="Elite athlete training" 
          className="absolute inset-0 z-0 w-full h-full object-cover opacity-20 object-top mix-blend-luminosity"
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center space-x-2 bg-secondary/80 border border-border rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-display tracking-widest text-muted-foreground uppercase font-bold">System Status: Active</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold uppercase tracking-tight text-foreground mb-6 leading-none">
              The Performance Engine <br />
              <span className="text-primary glow-text">For Elite Female Athletes</span>
            </h1>
            
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-sans leading-relaxed mb-10">
              Move beyond 'black box' wellness scores. Apex integrates cycle-specific physiological data with neuromuscular training load adjustments to mitigate ACL injury risk and maximize power output.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto group">
                  Integrate Your Program
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={() => window.scrollTo({ top: 800, behavior: 'smooth'})}>
                View Telemetry Specs
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Bottom edge gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      {/* Apex Advantage Section */}
      <section className="py-24 relative z-20 border-t border-border/50 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-wider text-foreground mb-4">
              The Apex Advantage
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto glow-box" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AdvantageCard 
              icon={<Shield className="w-8 h-8" />}
              title="Transparency Protocol"
              description="No 'black box' proprietary algorithms. Our models are trained on aggregated female performance metrics, not general step counts."
              delay={0.1}
            />
            <AdvantageCard 
              icon={<Target className="w-8 h-8" />}
              title="Biomechanical Safety"
              description="Specifically designed to address the increased likelihood of ACL tears in female physiology using predictive loading models."
              delay={0.2}
            />
            <AdvantageCard 
              icon={<Zap className="w-8 h-8" />}
              title="Tactical Integration"
              description="We don't replace your coach's sport-specific plan; we provide the service layer to optimize the training you're already doing."
              delay={0.3}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function AdvantageCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      className="bg-card border border-border p-8 rounded-md relative overflow-hidden group hover:border-primary/50 transition-colors"
    >
      <div className="text-primary mb-6 group-hover:scale-110 transition-transform origin-left">
        {icon}
      </div>
      <h3 className="text-xl font-display font-bold uppercase tracking-wide text-foreground mb-3">
        {title}
      </h3>
      <p className="text-muted-foreground font-sans leading-relaxed">
        {description}
      </p>
      
      {/* Decorative tactical dots */}
      <div className="absolute top-4 right-4 flex space-x-1">
        <div className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
        <div className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
        <div className="w-1 h-1 bg-primary/50 rounded-full" />
      </div>
    </motion.div>
  );
}
