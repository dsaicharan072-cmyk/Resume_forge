import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../../components/Button';
import { ArrowRight, Sparkles, Target, Zap } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';

const LandingPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  const handleCTA = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <header className="h-16 flex items-center justify-between px-6 lg:px-12 border-b border-border bg-background/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold text-xl text-foreground">
          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center text-sm">RF</div>
          ResumeForge
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
        </nav>
        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors">Sign In</Link>
              <Button onClick={() => navigate('/register')}>Get Started</Button>
            </>
          ) : (
            <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col">
        <section className="relative px-6 lg:px-12 pt-24 pb-32 flex flex-col items-center text-center overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Sparkles size={16} />
            <span>ResumeForge AI is now in Beta</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mb-6 text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/70">
            Forge a resume that <br className="hidden md:block"/> impossible to ignore.
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mb-10">
            Stop guessing what recruiters want. Use advanced AI to analyze your skills, rewrite your bullet points, and match you with your dream companies instantly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="text-base px-8 h-14" onClick={handleCTA}>
              Start Forging Free <ArrowRight className="ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 h-14 bg-background">
              View Demo
            </Button>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="px-6 lg:px-12 py-24 bg-muted/30 border-y border-border">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to land the job</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Our platform combines intelligent analysis with actionable market data to give you an unfair advantage.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                  <Zap size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">AI Rewrite Engine</h3>
                <p className="text-muted-foreground">Transform weak bullet points into high-impact, metric-driven achievements that pass ATS screeners with flying colors.</p>
              </div>
              
              <div className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                  <Target size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Skill Gap Analysis</h3>
                <p className="text-muted-foreground">Compare your current resume against real-time market requirements for your target role and get a personalized learning roadmap.</p>
              </div>
              
              <div className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                  <Sparkles size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Live AI Recruiter</h3>
                <p className="text-muted-foreground">Practice your pitch with an interactive AI agent that asks technical questions tailored exactly to your identified weak points.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6 lg:px-12 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} ResumeForge. Built for the modern job seeker.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
