import React from 'react';
import { Link } from 'react-router-dom'; // Standard React Router
import { motion } from 'framer-motion'; // Animations
import { Code2, Trophy, BarChart3, Terminal, ArrowRight, Cpu, Users } from 'lucide-react';

const LandingPage = () => {
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-base-100 text-white overflow-x-hidden font-sans selection:bg-primary selection:text-white">
      
      {/* --- Navbar --- */}
      <div className="navbar fixed top-0 z-50 bg-base-100/80 backdrop-blur-lg border-b border-white/5 px-4 lg:px-12">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border border-white/10">
              <li><Link to="/problems">Problems</Link></li>
              <li><Link to="/contests">Contests</Link></li>
              <li><Link to="/leaderboard">Leaderboard</Link></li>
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-2xl font-bold tracking-tighter hover:bg-transparent">
            <Code2 className="text-primary w-8 h-8" />
            Code<span className="text-primary">Flux</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2 text-base font-medium text-slate-300">
            <li><Link to="/problems" className="hover:text-white hover:bg-white/5">Problems</Link></li>
            <li><Link to="/contests" className="hover:text-white hover:bg-white/5">Contests</Link></li>
            <li><Link to="/leaderboard" className="hover:text-white hover:bg-white/5">Leaderboard</Link></li>
          </ul>
        </div>
        <div className="navbar-end gap-3">
          <Link to="/login" className="btn btn-ghost btn-sm hidden sm:flex">Log In</Link>
          <Link to="/signup" className="btn btn-primary btn-sm px-6 rounded-full shadow-lg shadow-primary/20">Sign Up</Link>
        </div>
      </div>

      {/* --- Hero Section --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
        {/* Background Glow Effects */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10"></div>
        
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="badge badge-outline badge-primary p-4 mb-6 gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Live: Weekly Contest #42
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Master the Code.<br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Flow with Logic.</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Join thousands of developers on CodeFlux. Solve algorithmic challenges, 
              compete in real-time, and land your dream job.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/problems" className="btn btn-primary btn-lg rounded-xl w-full sm:w-auto gap-2 shadow-xl shadow-primary/30 hover:scale-105 transition-transform">
                Start Solving <ArrowRight size={20} />
              </Link>
              <Link to="/contests" className="btn btn-outline btn-lg text-white hover:bg-white/10 hover:text-white rounded-xl w-full sm:w-auto">
                View Contests
              </Link>
            </motion.div>

            {/* Code Window Visual */}
            <motion.div variants={itemVariants} className="mt-16 mx-auto max-w-3xl mockup-code bg-[#020617] border border-white/10 text-left shadow-2xl shadow-black/50">
              <pre data-prefix="1" className="text-slate-500"><code>import <span className="text-secondary">CodeFlux</span> from 'platform';</code></pre> 
              <pre data-prefix="2"><code></code></pre> 
              <pre data-prefix="3"><code><span className="text-primary">function</span> <span className="text-yellow-400">levelUp</span>(user) &#123;</code></pre> 
              <pre data-prefix="4"><code>  <span className="text-primary">while</span> (user.coding) &#123;</code></pre> 
              <pre data-prefix="5"><code>    user.skills++;</code></pre> 
              <pre data-prefix="6"><code>    <span className="text-green-400">return</span> "Dream Job";</code></pre> 
              <pre data-prefix="7"><code>  &#125;</code></pre> 
              <pre data-prefix="8"><code>&#125;</code></pre>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- Features Grid --- */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <Link to="/problems" className="card bg-white/5 backdrop-blur-sm border border-white/5 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2">
              <div className="card-body items-center text-center">
                <div className="p-4 rounded-full bg-primary/10 mb-4">
                  <Terminal className="w-8 h-8 text-primary" />
                </div>
                <h2 className="card-title text-2xl">300+ Problems</h2>
                <p className="text-slate-400">Curated lists from Easy to Hard. Master Data Structures & Algorithms.</p>
              </div>
            </Link>

            {/* Card 2 */}
            <Link to="/contests" className="card bg-white/5 backdrop-blur-sm border border-white/5 hover:border-secondary/50 transition-all duration-300 hover:-translate-y-2">
              <div className="card-body items-center text-center">
                <div className="p-4 rounded-full bg-secondary/10 mb-4">
                  <Trophy className="w-8 h-8 text-secondary" />
                </div>
                <h2 className="card-title text-2xl">Weekly Contests</h2>
                <p className="text-slate-400">Compete globally. Boost your rating and earn badges for your profile.</p>
              </div>
            </Link>

            {/* Card 3 */}
            <Link to="/leaderboard" className="card bg-white/5 backdrop-blur-sm border border-white/5 hover:border-accent/50 transition-all duration-300 hover:-translate-y-2">
              <div className="card-body items-center text-center">
                <div className="p-4 rounded-full bg-accent/10 mb-4">
                  <BarChart3 className="w-8 h-8 text-accent" />
                </div>
                <h2 className="card-title text-2xl">Global Leaderboard</h2>
                <p className="text-slate-400">See where you stand among the best developers in the world.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* --- Stats Section --- */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="stats stats-vertical lg:stats-horizontal shadow bg-base-100 border border-white/10 w-full">
            <div className="stat place-items-center">
              <div className="stat-figure text-primary">
                <Users className="w-8 h-8" />
              </div>
              <div className="stat-title">Total Users</div>
              <div className="stat-value text-primary">10K+</div>
              <div className="stat-desc">From 100+ Countries</div>
            </div>
            
            <div className="stat place-items-center">
              <div className="stat-figure text-secondary">
                <Cpu className="w-8 h-8" />
              </div>
              <div className="stat-title">Submissions</div>
              <div className="stat-value text-secondary">2.5M</div>
              <div className="stat-desc">Processed this month</div>
            </div>
            
            <div className="stat place-items-center">
              <div className="stat-figure text-accent">
                <Trophy className="w-8 h-8" />
              </div>
              <div className="stat-title">Contests Held</div>
              <div className="stat-value text-accent">150+</div>
              <div className="stat-desc">Weekly challenges</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="footer p-10 bg-[#020617] border-t border-white/5 text-base-content">
        <aside>
          <Code2 className="w-12 h-12 text-primary" />
          <p className="font-bold text-xl">CodeFlux Inc.<br/><span className="font-normal text-sm text-slate-500">Flowing with logic since 2025</span></p>
        </aside> 
        <nav>
          <h6 className="footer-title text-white">Platform</h6> 
          <Link to="/problems" className="link link-hover text-slate-400">All Problems</Link>
          <Link to="/contests" className="link link-hover text-slate-400">Contests</Link>
          <Link to="/leaderboard" className="link link-hover text-slate-400">Leaderboard</Link>
        </nav> 
        <nav>
          <h6 className="footer-title text-white">Company</h6> 
          <a className="link link-hover text-slate-400">About us</a>
          <a className="link link-hover text-slate-400">Contact</a>
          <a className="link link-hover text-slate-400">Jobs</a>
        </nav> 
        <nav>
          <h6 className="footer-title text-white">Legal</h6> 
          <a className="link link-hover text-slate-400">Terms of use</a>
          <a className="link link-hover text-slate-400">Privacy policy</a>
        </nav>
      </footer>
    </div>
  );
};

export default LandingPage;