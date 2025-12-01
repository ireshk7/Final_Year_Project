import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Code2, 
  ChevronRight, 
  Trophy, 
  BrainCircuit, 
  Zap, 
  CheckCircle2, 
  Circle,
  Target,
  TrendingUp,
  Sparkles
} from 'lucide-react';

// --- IMPORT YOUR STORE ---
import { useProblemStore } from '../store/useProblemStore';

const AllProblems = () => {
  // --- Store Data ---
  const { 
    getAllProblems, 
    problems, 
    isProblemsLoading 
  } = useProblemStore();

  // --- Local State for UI ---
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [isVisible, setIsVisible] = useState(false);

  // --- Fetch Data on Mount ---
  useEffect(() => {
    getAllProblems();
    setTimeout(() => setIsVisible(true), 100);
  }, [getAllProblems]);

  // --- Filtering Logic ---
  const filteredProblems = (problems || []).filter((prob) => {
    const matchesSearch = prob.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'All' || prob.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  // --- Helper for Badge Colors ---
  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'Hard': return 'px-3 py-1 text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg font-semibold';
      case 'Medium': return 'px-3 py-1 text-yellow-300 bg-yellow-500/10 border border-yellow-500/30 rounded-lg font-semibold';
      case 'Easy': return 'px-3 py-1 text-green-300 bg-green-500/10 border border-green-500/30 rounded-lg font-semibold';
      default: return 'px-3 py-1 text-gray-300 bg-gray-500/10 border border-gray-500/30 rounded-lg';
    }
  };

  const getEasyCount = () => problems.filter(p => p.difficulty === 'Easy').length;
  const getMediumCount = () => problems.filter(p => p.difficulty === 'Medium').length;
  const getHardCount = () => problems.filter(p => p.difficulty === 'Hard').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden" style={{ fontFamily: "'Rajdhani', 'Roboto Mono', monospace" }}>
      
      {/* --- Animated Background Elements --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-lime-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none z-0"></div>

      {/* Floating Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(12)].map((_, i) => (
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12">
        
        {/* --- Header Section --- */}
        <div className={`mb-10 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500/40 blur-xl rounded-full animate-pulse"></div>
                  <div className="relative w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-500/30">
                    <Code2 className="text-emerald-400 w-7 h-7" />
                  </div>
                </div>
                <h1 className="text-5xl font-black bg-gradient-to-r from-white via-emerald-400 to-green-400 bg-clip-text text-transparent tracking-wider uppercase" style={{ fontFamily: "'Orbitron', monospace" }}>
                  Problem Set
                </h1>
              </div>
              <p className="text-gray-400 text-lg ml-16 tracking-wide">
                Sharpen your skills with our curated list of algorithmic challenges.
              </p>
            </div>
            
            {/* Quick Stats Cards */}
            <div className="flex flex-wrap gap-3">
              <div className="group p-4 bg-slate-900/50 backdrop-blur-xl border border-emerald-500/20 rounded-xl hover:border-emerald-500/40 transition-all hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all">
                    <BrainCircuit className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-emerald-400" style={{ fontFamily: "'Orbitron', monospace" }}>{problems?.length || 0}</div>
                    <div className="text-xs text-gray-400 font-semibold tracking-wider uppercase">Total</div>
                  </div>
                </div>
              </div>

              <div className="group p-4 bg-slate-900/50 backdrop-blur-xl border border-green-500/20 rounded-xl hover:border-green-500/40 transition-all hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all">
                    <Target className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-green-400" style={{ fontFamily: "'Orbitron', monospace" }}>{getEasyCount()}</div>
                    <div className="text-xs text-gray-400 font-semibold tracking-wider uppercase">Easy</div>
                  </div>
                </div>
              </div>

              <div className="group p-4 bg-slate-900/50 backdrop-blur-xl border border-lime-500/20 rounded-xl hover:border-lime-500/40 transition-all hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-lime-500/10 rounded-lg flex items-center justify-center group-hover:bg-lime-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all">
                    <TrendingUp className="w-5 h-5 text-lime-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-lime-400" style={{ fontFamily: "'Orbitron', monospace" }}>{getMediumCount() + getHardCount()}</div>
                    <div className="text-xs text-gray-400 font-semibold tracking-wider uppercase">Advanced</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- Search & Filter Bar --- */}
          <div className="bg-slate-900/50 backdrop-blur-xl p-5 rounded-2xl border border-emerald-500/20 shadow-xl flex flex-col md:flex-row gap-4 items-center justify-between hover:border-emerald-500/30 transition-all">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96 group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-500 group-focus-within:text-emerald-400 group-focus-within:scale-110 transition-all" />
              </div>
              <input
                type="text"
                placeholder="Search problems..."
                className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 text-white rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-gray-500 tracking-wide"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Difficulty Tabs */}
            <div className="flex bg-slate-800/50 p-1.5 rounded-xl border border-slate-700/50 gap-1">
              {['All', 'Easy', 'Medium', 'Hard'].map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficultyFilter(level)}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold tracking-wider uppercase transition-all ${
                    difficultyFilter === level 
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-105' 
                      : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* --- Problem List --- */}
        <div className={`space-y-3 transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          {/* Header Row */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-widest">
            <div className="col-span-1">Status</div>
            <div className="col-span-6">Title</div>
            <div className="col-span-2">Difficulty</div>
            <div className="col-span-2">Acceptance</div>
            <div className="col-span-1 text-right">Action</div>
          </div>

          {/* Loading State */}
          {isProblemsLoading && (
            [...Array(6)].map((_, i) => (
              <div key={i} className="h-20 w-full bg-slate-900/50 backdrop-blur-xl rounded-xl animate-pulse flex items-center px-6 border border-slate-800/50">
                <div className="h-5 w-5 bg-slate-700 rounded-full mr-6"></div>
                <div className="h-4 w-1/3 bg-slate-700 rounded mr-auto"></div>
                <div className="h-6 w-20 bg-slate-700 rounded-lg"></div>
              </div>
            ))
          )}

          {/* Empty State */}
          {!isProblemsLoading && filteredProblems.length === 0 && (
            <div className="text-center py-20 bg-slate-900/50 backdrop-blur-xl rounded-2xl border-2 border-dashed border-emerald-500/20">
              <div className="inline-flex p-5 bg-emerald-500/10 rounded-2xl mb-4">
                <Filter className="w-10 h-10 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 tracking-wide uppercase" style={{ fontFamily: "'Orbitron', monospace" }}>No problems found</h3>
              <p className="text-gray-400 tracking-wide">Try adjusting your search or filters.</p>
            </div>
          )}

          {/* List Items */}
          {!isProblemsLoading && filteredProblems.map((prob, index) => (
            <div 
              key={prob._id || prob.id}
              className="group relative bg-slate-900/50 backdrop-blur-xl hover:bg-slate-900/70 border border-slate-800/50 hover:border-emerald-500/50 rounded-xl transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-emerald-500/10 overflow-hidden hover:scale-[1.02]"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Left Color Bar on Hover */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-green-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom"></div>

              <div className="p-5 md:grid md:grid-cols-12 md:gap-4 md:items-center flex flex-col gap-3">
                
                {/* Status Icon */}
                <div className="col-span-1 hidden md:flex pl-2 justify-center">
                  <Circle className="w-5 h-5 text-slate-600 group-hover:text-emerald-400 transition-all group-hover:scale-110" /> 
                </div>

                {/* Title & Tags */}
                <div className="col-span-6">
                  <h3 className="text-lg font-bold text-slate-200 group-hover:text-white transition-colors flex items-center gap-2 mb-2 tracking-wide">
                    {prob.title}
                    {prob.isNew && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/30 rounded text-emerald-300 text-xs font-semibold tracking-wider uppercase">
                        <Sparkles className="w-3 h-3" />
                        New
                      </span>
                    )}
                  </h3>
                  <div className="flex gap-2">
                    <span className="text-xs text-gray-400 bg-slate-800/50 px-2.5 py-1 rounded-lg border border-slate-700/50 tracking-wide">Algorithms</span>
                    <span className="text-xs text-gray-400 bg-slate-800/50 px-2.5 py-1 rounded-lg border border-slate-700/50 tracking-wide">Data Structure</span>
                  </div>
                </div>

                {/* Difficulty */}
                <div className="col-span-2">
                  <span className={`text-sm tracking-wider uppercase ${getDifficultyColor(prob.difficulty)}`}>
                    {prob.difficulty}
                  </span>
                </div>

                {/* Acceptance */}
                <div className="col-span-2 text-gray-400 text-sm">
                  <span className="flex items-center gap-2">
                    <Zap size={16} className="text-yellow-400" />
                    <span className="font-semibold" style={{ fontFamily: "'Orbitron', monospace" }}>{prob.acceptance || 'N/A'}%</span>
                  </span>
                </div>

                {/* Action Button */}
                <div className="col-span-1 flex justify-end">
                  <Link 
                    to={`/problem/${prob._id || prob.id}`}
                    className="group/btn px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg hover:bg-emerald-500 hover:border-emerald-500 transition-all font-semibold text-emerald-300 hover:text-white flex items-center gap-2 hover:scale-105 tracking-wider uppercase"
                  >
                    Solve
                    <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');
        
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

        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AllProblems;