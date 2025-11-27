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
  Circle 
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

  // --- Fetch Data on Mount ---
  useEffect(() => {
    getAllProblems();
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
      case 'Hard': return 'badge-error text-red-100 bg-red-500/10 border-red-500/20';
      case 'Medium': return 'badge-warning text-yellow-100 bg-yellow-500/10 border-yellow-500/20';
      case 'Easy': return 'badge-success text-green-100 bg-green-500/10 border-green-500/20';
      default: return 'badge-ghost';
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-blue-500 selection:text-white pb-20">
      
      {/* --- Background Glows --- */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- Header Section --- */}
        <div className="pt-12 pb-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <Code2 className="text-blue-500 w-10 h-10" />
                Problem Set
              </h1>
              <p className="text-slate-400 text-lg">
                Sharpen your skills with our curated list of algorithmic challenges.
              </p>
            </div>
            
            {/* Quick Stats Card */}
            <div className="flex gap-4">
              <div className="bg-[#1e293b]/50 backdrop-blur-md p-4 rounded-xl border border-white/5 flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                  <BrainCircuit size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold leading-none">{problems?.length || 0}</div>
                  <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Total</div>
                </div>
              </div>
            </div>
          </div>

          {/* --- Search & Filter Bar --- */}
          <div className="bg-[#1e293b]/80 backdrop-blur-md p-4 rounded-2xl border border-white/5 shadow-xl flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search problems..."
                className="input bg-[#0f172a] border border-slate-700 text-white w-full pl-10 focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-600 rounded-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Difficulty Tabs */}
            <div className="flex bg-[#0f172a] p-1 rounded-xl border border-slate-700">
              {['All', 'Easy', 'Medium', 'Hard'].map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficultyFilter(level)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    difficultyFilter === level 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* --- Problem List --- */}
        <div className="space-y-4">
          
          {/* Header Row */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <div className="col-span-1">Status</div>
            <div className="col-span-6">Title</div>
            <div className="col-span-2">Difficulty</div>
            <div className="col-span-2">Acceptance</div>
            <div className="col-span-1 text-right">Action</div>
          </div>

          {/* Loading State */}
          {isProblemsLoading && (
            [...Array(5)].map((_, i) => (
              <div key={i} className="h-20 w-full bg-[#1e293b] rounded-xl animate-pulse flex items-center px-6">
                <div className="h-4 w-4 bg-slate-700 rounded-full mr-6"></div>
                <div className="h-4 w-1/3 bg-slate-700 rounded mr-auto"></div>
                <div className="h-6 w-16 bg-slate-700 rounded-full"></div>
              </div>
            ))
          )}

          {/* Empty State */}
          {!isProblemsLoading && filteredProblems.length === 0 && (
            <div className="text-center py-20 bg-[#1e293b]/30 rounded-2xl border border-dashed border-slate-700">
              <div className="inline-flex p-4 bg-slate-800 rounded-full mb-4">
                <Filter className="w-8 h-8 text-slate-500" />
              </div>
              <h3 className="text-xl font-bold text-white">No problems found</h3>
              <p className="text-slate-400 mt-2">Try adjusting your search or filters.</p>
            </div>
          )}

          {/* List Items */}
          {!isProblemsLoading && filteredProblems.map((prob) => (
            <div 
              key={prob._id || prob.id}
              className="group relative bg-[#1e293b]/40 hover:bg-[#1e293b] border border-white/5 hover:border-blue-500/50 rounded-xl transition-all duration-300 shadow-sm hover:shadow-blue-500/10 overflow-hidden"
            >
              {/* Left Color Bar on Hover */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom"></div>

              <div className="p-5 md:grid md:grid-cols-12 md:gap-4 md:items-center flex flex-col gap-3">
                
                {/* Status Icon */}
                <div className="col-span-1 hidden md:block pl-2">
                   {/* Logic for solved status if you have it, else default circle */}
                  <Circle className="w-5 h-5 text-slate-600 group-hover:text-blue-400 transition-colors" /> 
                </div>

                {/* Title & Tags */}
                <div className="col-span-6">
                  <h3 className="text-lg font-semibold text-slate-200 group-hover:text-white transition-colors flex items-center gap-2">
                    {prob.title}
                    {/* Optional New Tag */}
                    {prob.isNew && <span className="badge badge-xs badge-secondary">New</span>}
                  </h3>
                  {/* Mock Tags - If your API doesn't return tags, you can remove this or mock it */}
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs text-slate-500 bg-slate-900/50 px-2 py-1 rounded">Algorithms</span>
                    <span className="text-xs text-slate-500 bg-slate-900/50 px-2 py-1 rounded">Data Structure</span>
                  </div>
                </div>

                {/* Difficulty */}
                <div className="col-span-2">
                  <span className={`badge ${getDifficultyColor(prob.difficulty)} badge-lg font-medium`}>
                    {prob.difficulty}
                  </span>
                </div>

                {/* Acceptance (Mock or Real) */}
                <div className="col-span-2 text-slate-400 font-mono text-sm">
                  <span className="flex items-center gap-1">
                    <Zap size={14} className="text-yellow-500" />
                    {prob.acceptance || 'N/A'}%
                  </span>
                </div>

                {/* Action Button */}
                <div className="col-span-1 flex justify-end">
                  <Link 
                    to={`/problem/${prob._id || prob.id}`} // Ensure this matches your route
                    className="btn btn-sm btn-ghost group-hover:bg-blue-600 group-hover:text-white transition-all rounded-lg"
                  >
                    Solve
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default AllProblems;