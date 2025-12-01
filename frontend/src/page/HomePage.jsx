import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useProblemStore } from "../store/useProblemStore.js";
import { Code2, Zap, Target, TrendingUp, Sparkles, ChevronDown, Award, BookOpen } from "lucide-react";
import ProblemTable from "../components/ProblemTable.jsx";

// Matrix Rain Effect Component
const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        
        ctx.fillStyle = drops[i] * fontSize < 50 ? '#00ff41' : '#00aa00';
        ctx.font = fontSize + 'px monospace';
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
};

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-emerald-400 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 10}s`
          }}
        />
      ))}
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const { getAllProblems, problems, isProblemsLoading } = useProblemStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    getAllProblems();
    setTimeout(() => setIsVisible(true), 100);
  }, [getAllProblems]);

  const handleStartSolving = () => {
    // Option 1: Navigate to the first problem if problems are loaded
    if (problems && problems.length > 0) {
      navigate(`/problem/${problems[0].id}`);
    } else {
      // Option 2: Scroll to problems section if no problems loaded yet
      const problemsSection = document.getElementById('problems-section');
      if (problemsSection) {
        problemsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const features = [
    { icon: Code2, title: "Real Challenges", desc: "Industry-standard problems", color: "emerald" },
    { icon: Zap, title: "Instant Feedback", desc: "Test your solutions live", color: "green" },
    { icon: Target, title: "Track Progress", desc: "Monitor your growth", color: "lime" },
    { icon: TrendingUp, title: "Level Up", desc: "Master algorithms", color: "teal" }
  ];

  const getColorClasses = (color) => {
    const colors = {
      emerald: {
        border: "border-emerald-500/20 hover:border-emerald-500/50",
        bg: "bg-emerald-500/10 group-hover:bg-emerald-500/20",
        text: "text-emerald-400",
        shadow: "hover:shadow-emerald-500/20",
        gradient: "from-emerald-500/5 to-emerald-500/5"
      },
      green: {
        border: "border-green-500/20 hover:border-green-500/50",
        bg: "bg-green-500/10 group-hover:bg-green-500/20",
        text: "text-green-400",
        shadow: "hover:shadow-green-500/20",
        gradient: "from-green-500/5 to-green-500/5"
      },
      lime: {
        border: "border-lime-500/20 hover:border-lime-500/50",
        bg: "bg-lime-500/10 group-hover:bg-lime-500/20",
        text: "text-lime-400",
        shadow: "hover:shadow-lime-500/20",
        gradient: "from-lime-500/5 to-lime-500/5"
      },
      teal: {
        border: "border-teal-500/20 hover:border-teal-500/50",
        bg: "bg-teal-500/10 group-hover:bg-teal-500/20",
        text: "text-teal-400",
        shadow: "hover:shadow-teal-500/20",
        gradient: "from-teal-500/5 to-teal-500/5"
      }
    };
    return colors[color];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden" style={{ fontFamily: "'Rajdhani', 'Roboto Mono', monospace" }}>
      {/* Matrix Rain Background - Full Page */}
      <div className="fixed inset-0 z-0">
        <MatrixRain />
      </div>

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-lime-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none z-[1]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className={`text-center mb-16 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6 backdrop-blur-sm animate-fade-in">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-sm font-semibold text-emerald-300 tracking-wider uppercase">Your Coding Journey Starts Here</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-emerald-400 to-green-400 bg-clip-text text-transparent leading-tight animate-pulse tracking-wider" style={{ fontFamily: "'Orbitron', 'Rajdhani', 'Audiowide', monospace" }}>
            WELCOME TO CODEFLUX
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed tracking-wide" style={{ fontFamily: "'Rajdhani', 'Share Tech Mono', 'Roboto Mono', monospace" }}>
            Master coding interviews with <span className="text-emerald-400 font-semibold">CURATED CHALLENGES</span>, 
            real-time feedback, and a platform designed to <span className="text-green-400 font-semibold">ELEVATE YOUR SKILLS</span>
          </p>

          {/* CTA Button - Updated with onClick */}
          <button 
            onClick={handleStartSolving}
            className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl font-bold text-white shadow-lg shadow-emerald-500/50 hover:shadow-emerald-500/70 transition-all duration-300 hover:scale-105 overflow-hidden tracking-wider uppercase"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Solving Problems
              <ChevronDown className="w-5 h-5 rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          {/* Scroll Indicator */}
          <div className="mt-12 animate-bounce">
            <ChevronDown className="w-6 h-6 mx-auto text-emerald-500/50" />
          </div>
        </div>

        {/* Features Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            const colors = getColorClasses(feature.color);
            return (
              <div 
                key={idx}
                className={`group relative bg-slate-900/50 backdrop-blur-xl border ${colors.border} rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg ${colors.shadow} hover:-translate-y-2`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 tracking-wide uppercase">{feature.title}</h3>
                  <p className="text-gray-400 text-sm tracking-wide">{feature.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className={`mb-16 transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-slate-900/50 backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-8 shadow-xl shadow-emerald-500/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-emerald-500/10 mb-4 group-hover:bg-emerald-500/20 transition-all group-hover:scale-110 group-hover:rotate-6">
                  <BookOpen className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="text-4xl font-black text-emerald-400 mb-2" style={{ fontFamily: "'Orbitron', monospace" }}>{problems.length}+</div>
                <div className="text-gray-400 tracking-wider uppercase font-semibold">Problems</div>
              </div>
              
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-green-500/10 mb-4 group-hover:bg-green-500/20 transition-all group-hover:scale-110 group-hover:rotate-6">
                  <Target className="w-8 h-8 text-green-400" />
                </div>
                <div className="text-4xl font-black text-green-400 mb-2" style={{ fontFamily: "'Orbitron', monospace" }}>50+</div>
                <div className="text-gray-400 tracking-wider uppercase font-semibold">Topics</div>
              </div>
              
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-lime-500/10 mb-4 group-hover:bg-lime-500/20 transition-all group-hover:scale-110 group-hover:rotate-6">
                  <Award className="w-8 h-8 text-lime-400" />
                </div>
                <div className="text-4xl font-black text-lime-400 mb-2" style={{ fontFamily: "'Orbitron', monospace" }}>1000+</div>
                <div className="text-gray-400 tracking-wider uppercase font-semibold">Solvers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Problems Section - Added ID for smooth scroll */}
        <div 
          id="problems-section"
          className={`transition-all duration-1000 delay-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3 tracking-wide" style={{ fontFamily: "'Orbitron', monospace" }}>
              AVAILABLE <span className="text-emerald-400">CHALLENGES</span>
            </h2>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-emerald-300 font-semibold tracking-wider uppercase">Live</span>
            </div>
          </div>

          {isProblemsLoading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-slate-900/50 backdrop-blur-xl border border-emerald-500/20 rounded-2xl">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-green-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
              </div>
              <p className="text-gray-400 mt-6 font-medium tracking-wider uppercase">Loading challenges...</p>
            </div>
          ) : problems.length > 0 ? (
            <div className="bg-slate-900/50 backdrop-blur-xl border border-emerald-500/20 rounded-2xl overflow-hidden shadow-2xl shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300">
              <ProblemTable problems={problems} />
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-900/50 backdrop-blur-xl border-2 border-emerald-500/20 border-dashed rounded-2xl">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-emerald-500/10 mb-6">
                <Code2 className="w-10 h-10 text-emerald-400" />
              </div>
              <p className="text-xl font-semibold text-gray-300 mb-2 tracking-wide uppercase">No problems found</p>
              <p className="text-gray-500 tracking-wide">Check back soon for new challenges!</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap');
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-float {
          animation: float linear infinite;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }

        .delay-700 {
          animation-delay: 0.7s;
        }
      `}</style>
    </div>
  );
};

export default HomePage;