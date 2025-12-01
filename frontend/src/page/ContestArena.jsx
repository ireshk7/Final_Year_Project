import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { 
  Play, 
  Send, 
  Clock, 
  ChevronLeft, 
  Code2, 
  Terminal, 
  Cpu, 
  AlertCircle, 
  CheckCircle,
  Zap,
  Award,
  FileCode
} from 'lucide-react';

// --- IMPORT YOUR EXISTING STORES ---
import { useProblemStore } from '../store/useProblemStore';
import { useExecutionStore } from '../store/useExecutionStore';

const ContestArena = () => {
  const { id } = useParams();
  
  // --- Local State ---
  const [activeTab, setActiveTab] = useState('description');
  const [userCode, setUserCode] = useState('// Write your solution here\nconsole.log("Hello CodeFlux");');
  const [languageId, setLanguageId] = useState(63);
  const [timeLeft, setTimeLeft] = useState(3600);
  const [isVisible, setIsVisible] = useState(false);

  // --- Store Hooks ---
  const { 
    problem, 
    isProblemLoading, 
    getProblemById 
  } = useProblemStore();

  const { 
    executeCode, 
    isExecuting, 
    submission 
  } = useExecutionStore();

  // --- Fetch Problem on Mount ---
  useEffect(() => {
    if (id) {
      getProblemById(id);
    }
    setTimeout(() => setIsVisible(true), 100);
  }, [id, getProblemById]);

  // --- Timer Logic ---
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // --- Execution Logic ---
  const handleRun = async () => {
    if (!problem) return;
    const stdin = problem.examples?.[0]?.input || "";
    const expectedOutput = problem.examples?.[0]?.output || "";
    await executeCode(userCode, languageId, stdin, expectedOutput, id);
  };

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'Hard': return 'px-3 py-1 text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg font-semibold';
      case 'Medium': return 'px-3 py-1 text-yellow-300 bg-yellow-500/10 border border-yellow-500/30 rounded-lg font-semibold';
      case 'Easy': return 'px-3 py-1 text-green-300 bg-green-500/10 border border-green-500/30 rounded-lg font-semibold';
      default: return 'px-3 py-1 text-gray-300 bg-gray-500/10 border border-gray-500/30 rounded-lg';
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden relative" style={{ fontFamily: "'Rajdhani', 'Roboto Mono', monospace" }}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none z-0"></div>

      <Toaster position="top-center" toastOptions={{ duration: 3000, style: { background: '#1e293b', color: '#fff' } }} />

      {/* --- Navbar --- */}
      <header className={`h-16 border-b backdrop-blur-xl border-emerald-500/20 bg-slate-900/80 flex items-center justify-between px-6 shrink-0 z-20 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
        <div className="flex items-center gap-4">
          <Link to="/problems" className="group p-2 bg-slate-800/50 rounded-xl border border-emerald-500/20 hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all hover:scale-110">
            <ChevronLeft size={20} className="text-emerald-400 group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/40 blur-lg rounded-full animate-pulse"></div>
              <Code2 className="relative text-emerald-400 w-6 h-6" />
            </div>
            <span className="font-bold text-lg tracking-wider" style={{ fontFamily: "'Orbitron', monospace" }}>CODE<span className="text-emerald-400">FLUX</span> ARENA</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Timer */}
          <div className="flex items-center gap-2 bg-slate-900/50 backdrop-blur-xl px-4 py-2 rounded-xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all">
            <Clock size={16} className={timeLeft < 300 ? "text-red-500 animate-pulse" : "text-emerald-400"} />
            <span className={`font-mono font-bold tracking-wider ${timeLeft < 300 ? "text-red-400" : "text-white"}`} style={{ fontFamily: "'Orbitron', monospace" }}>
              {formatTime(timeLeft)}
            </span>
          </div>
          
          <button className="group px-6 py-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl font-bold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 transition-all flex items-center gap-2 tracking-wider uppercase">
            <Award className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            Submit Contest
          </button>
        </div>
      </header>

      {/* --- Main Content (Split View) --- */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        
        {/* LEFT PANEL: Problem Details */}
        <div className={`w-1/2 flex flex-col border-r border-emerald-500/10 bg-slate-900/50 backdrop-blur-xl transition-all duration-1000 delay-200 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
          {/* Tabs */}
          <div className="flex border-b border-emerald-500/10 bg-slate-900/30">
            <button 
              onClick={() => setActiveTab('description')}
              className={`px-6 py-3 text-sm font-semibold tracking-wider uppercase transition-all border-b-2 ${activeTab === 'description' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-gray-400 hover:text-white hover:bg-slate-800/50'}`}
            >
              Description
            </button>
            <button 
              onClick={() => setActiveTab('submissions')}
              className={`px-6 py-3 text-sm font-semibold tracking-wider uppercase transition-all border-b-2 ${activeTab === 'submissions' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-gray-400 hover:text-white hover:bg-slate-800/50'}`}
            >
              Submissions
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            {isProblemLoading ? (
              <div className="flex h-full items-center justify-center">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-green-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
                </div>
              </div>
            ) : problem ? (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h1 className="text-4xl font-black text-white mb-4 tracking-wide" style={{ fontFamily: "'Orbitron', monospace" }}>{problem.title}</h1>
                  
                  <div className="flex gap-3 mb-6">
                    <span className={`text-sm tracking-wider uppercase ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </span>
                  </div>
                </div>

                {/* Problem Description */}
                <div 
                  dangerouslySetInnerHTML={{ __html: problem.description }} 
                  className="text-gray-300 leading-relaxed prose prose-invert max-w-none tracking-wide" 
                />

                {/* Examples */}
                {problem.examples && problem.examples.length > 0 && (
                  <div className="mt-8 space-y-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4 tracking-wide uppercase" style={{ fontFamily: "'Orbitron', monospace" }}>
                      <Zap className="w-5 h-5 text-emerald-400" />
                      Examples
                    </h3>
                    {problem.examples.map((ex, idx) => (
                      <div key={idx} className="bg-slate-900/50 backdrop-blur-xl border border-emerald-500/20 rounded-xl overflow-hidden hover:border-emerald-500/40 transition-all">
                        <div className="px-5 py-4">
                          <p className="text-emerald-400 text-xs uppercase font-bold tracking-widest mb-3 flex items-center gap-2">
                            <FileCode className="w-3 h-3" />
                            Example {idx + 1}
                          </p>
                          <div className="space-y-2">
                            <div className="flex items-start gap-2">
                              <span className="text-emerald-400 font-mono font-semibold min-w-[60px] tracking-wide">Input:</span>
                              <span className="text-gray-300 font-mono bg-slate-800/50 px-2 py-1 rounded">{ex.input}</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-green-400 font-mono font-semibold min-w-[60px] tracking-wide">Output:</span>
                              <span className="text-gray-300 font-mono bg-slate-800/50 px-2 py-1 rounded">{ex.output}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-4">
                  <AlertCircle size={40} className="text-emerald-400/50" />
                </div>
                <p className="text-lg font-semibold tracking-wide uppercase" style={{ fontFamily: "'Orbitron', monospace" }}>Problem not found</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: Code Editor */}
        <div className={`w-1/2 flex flex-col bg-slate-900/50 backdrop-blur-xl relative transition-all duration-1000 delay-400 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
          
          {/* Editor Toolbar */}
          <div className="h-14 border-b border-emerald-500/10 flex items-center justify-between px-4 bg-slate-900/80 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <select 
                value={languageId}
                onChange={(e) => setLanguageId(Number(e.target.value))}
                className="px-4 py-2 bg-slate-800/50 border border-emerald-500/20 rounded-xl text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all font-semibold tracking-wide"
              >
                <option value={63}>JavaScript (Node.js)</option>
                <option value={71}>Python (3.8)</option>
                <option value={54}>C++ (GCC)</option>
                <option value={62}>Java (OpenJDK)</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={handleRun}
                disabled={isExecuting}
                className={`group px-4 py-2 rounded-xl font-semibold tracking-wider uppercase transition-all flex items-center gap-2 ${
                  isExecuting 
                    ? 'bg-slate-800/50 text-gray-500 cursor-not-allowed' 
                    : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500 hover:text-white hover:scale-105'
                }`}
              >
                {isExecuting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                    Running
                  </>
                ) : (
                  <>
                    <Play size={16} fill="currentColor" className="group-hover:scale-110 transition-transform" />
                    Run Code
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Text Area */}
          <div className="flex-1 relative bg-slate-900/30">
            <textarea
              className="w-full h-full bg-transparent text-gray-300 font-mono p-6 resize-none focus:outline-none leading-relaxed text-sm"
              spellCheck="false"
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              style={{ tabSize: 2 }}
            />
          </div>

          {/* Output Console */}
          <div className="h-1/3 min-h-[180px] border-t border-emerald-500/20 bg-slate-900/80 backdrop-blur-xl flex flex-col shadow-2xl">
            <div className="h-12 px-4 flex items-center gap-2 bg-slate-900/90 text-xs font-bold text-emerald-400 border-b border-emerald-500/10 select-none uppercase tracking-widest">
              <Terminal size={16} className="text-emerald-400" /> 
              Console Output
            </div>
            
            <div className="flex-1 p-4 font-mono text-sm overflow-y-auto custom-scrollbar">
              {isExecuting && (
                <div className="flex items-center gap-3 text-emerald-400 animate-pulse tracking-wide">
                  <Cpu size={18} className="animate-spin" /> 
                  <span>Executing code on server...</span>
                </div>
              )}

              {!isExecuting && !submission && (
                <div className="text-gray-500 italic flex items-center gap-2 tracking-wide">
                  <Zap size={16} className="text-gray-600" />
                  Run your code to see the output here.
                </div>
              )}

              {!isExecuting && submission && (
                <div className="space-y-3 animate-fade-in">
                  <div className="flex items-center gap-2 pb-2 border-b border-emerald-500/10">
                    <span className="text-gray-400 font-semibold tracking-wide">Status:</span>
                    {submission.stderr ? (
                      <span className="text-red-400 font-bold flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-lg tracking-wider uppercase">
                        <AlertCircle size={16}/>
                        Execution Error
                      </span>
                    ) : (
                      <span className="text-green-400 font-bold flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-lg tracking-wider uppercase">
                        <CheckCircle size={16}/>
                        Success
                      </span>
                    )}
                  </div>

                  {submission.stdout && (
                    <div>
                      <div className="text-xs text-emerald-400 mb-2 font-bold uppercase tracking-widest">STDOUT:</div>
                      <pre className="text-gray-300 whitespace-pre-wrap bg-slate-800/50 p-3 rounded-lg border border-emerald-500/20">{submission.stdout}</pre>
                    </div>
                  )}

                  {submission.stderr && (
                    <div>
                      <div className="text-xs text-red-400 mb-2 font-bold uppercase tracking-widest">STDERR:</div>
                      <pre className="text-red-300 whitespace-pre-wrap bg-red-500/10 p-3 rounded-lg border border-red-500/30">{submission.stderr}</pre>
                    </div>
                  )}
                  
                  {submission.message && (
                    <div className="text-emerald-400 text-sm px-3 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg tracking-wide">
                      <span className="font-semibold">Server Message:</span> {submission.message}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.3);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.5);
        }
      `}</style>
    </div>
  );
};

export default ContestArena;