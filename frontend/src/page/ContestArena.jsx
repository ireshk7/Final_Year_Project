import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // Required for your store's toasts
import { 
  Play, 
  Send, 
  Clock, 
  ChevronLeft, 
  Code2, 
  Terminal, 
  Cpu, 
  AlertCircle, 
  CheckCircle 
} from 'lucide-react';

// --- IMPORT YOUR EXISTING STORES ---
import { useProblemStore } from '../store/useProblemStore';
import { useExecutionStore } from '../store/useExecutionStore';

const ContestArena = () => {
  const { id } = useParams();
  
  // --- Local State ---
  const [activeTab, setActiveTab] = useState('description');
  const [userCode, setUserCode] = useState('// Write your solution here\nconsole.log("Hello CodeFlux");');
  const [languageId, setLanguageId] = useState(63); // Default: JavaScript (63)
  const [timeLeft, setTimeLeft] = useState(3600); // 1 Hour Timer

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

    // We take the first example from the problem as the test case
    // Adjust 'exampleIn' and 'exampleOut' based on your actual DB field names
    const stdin = problem.examples?.[0]?.input || "";
    const expectedOutput = problem.examples?.[0]?.output || "";

    await executeCode(
      userCode,
      languageId,
      stdin,
      expectedOutput,
      id // problemId
    );
  };

  return (
    <div className="h-screen flex flex-col bg-[#020617] text-white overflow-hidden font-sans selection:bg-blue-500 selection:text-white">
      {/* Toast Container for your store messages */}
      <Toaster position="top-center" toastOptions={{ duration: 3000, style: { background: '#1e293b', color: '#fff' } }} />

      {/* --- Navbar --- */}
      <header className="h-16 border-b border-white/5 bg-[#0f172a] flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <Link to="/problems" className="btn btn-ghost btn-circle btn-sm text-slate-400 hover:bg-white/5">
            <ChevronLeft size={20} />
          </Link>
          <div className="flex items-center gap-2">
            <Code2 className="text-blue-500 w-6 h-6" />
            <span className="font-bold text-lg tracking-tight">Code<span className="text-blue-500">Flux</span> Arena</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Timer */}
          <div className="flex items-center gap-2 bg-slate-900/50 px-4 py-1.5 rounded-lg border border-white/5">
            <Clock size={16} className={timeLeft < 300 ? "text-red-500 animate-pulse" : "text-blue-500"} />
            <span className={`font-mono font-bold ${timeLeft < 300 ? "text-red-500" : "text-white"}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          
          <button className="btn btn-primary btn-sm px-6 rounded-lg shadow-lg shadow-blue-500/20 text-white">
            Submit Contest
          </button>
        </div>
      </header>

      {/* --- Main Content (Split View) --- */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT PANEL: Problem Details */}
        <div className="w-1/2 flex flex-col border-r border-white/5 bg-[#0f172a]/50 backdrop-blur-sm">
          {/* Tabs */}
          <div className="flex border-b border-white/5">
            <button 
              onClick={() => setActiveTab('description')}
              className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'description' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-white'}`}
            >
              Description
            </button>
            <button 
              onClick={() => setActiveTab('submissions')}
              className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'submissions' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-white'}`}
            >
              Submissions
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            {isProblemLoading ? (
              <div className="flex h-full items-center justify-center">
                <span className="loading loading-ring loading-lg text-blue-500"></span>
              </div>
            ) : problem ? (
              <div className="prose prose-invert max-w-none">
                <h1 className="text-3xl font-bold text-white mb-2">{problem.title}</h1>
                
                <div className="flex gap-2 mb-6">
                  <span className={`badge badge-outline ${problem.difficulty === 'Hard' ? 'badge-error' : problem.difficulty === 'Medium' ? 'badge-warning' : 'badge-success'}`}>
                    {problem.difficulty}
                  </span>
                </div>

                {/* Problem Description (HTML rendered safely) */}
                <div dangerouslySetInnerHTML={{ __html: problem.description }} className="text-slate-300 leading-relaxed" />

                {/* Examples */}
                {problem.examples && problem.examples.length > 0 && (
                  <div className="mt-8 space-y-4">
                    {problem.examples.map((ex, idx) => (
                      <div key={idx} className="mockup-code bg-[#020617] border border-white/10 text-sm before:hidden">
                        <div className="px-5 py-4">
                          <p className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-2">Example {idx + 1}</p>
                          <div className="mb-2">
                            <span className="text-blue-400 font-mono">Input:</span> <span className="text-slate-300 font-mono">{ex.input}</span>
                          </div>
                          <div>
                            <span className="text-green-400 font-mono">Output:</span> <span className="text-slate-300 font-mono">{ex.output}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-500">
                <AlertCircle size={48} className="mb-4 opacity-20" />
                <p>Problem not found</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: Code Editor */}
        <div className="w-1/2 flex flex-col bg-[#0f172a] relative">
          
          {/* Editor Toolbar */}
          <div className="h-14 border-b border-white/5 flex items-center justify-between px-4 bg-[#1e293b]">
            <div className="flex items-center gap-3">
              <select 
                value={languageId}
                onChange={(e) => setLanguageId(Number(e.target.value))}
                className="select select-bordered select-sm bg-slate-800 border-slate-700 text-white focus:outline-none focus:border-blue-500"
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
                className={`btn btn-sm gap-2 transition-all ${isExecuting ? 'btn-disabled bg-slate-800 text-slate-500' : 'bg-green-600 hover:bg-green-500 text-white border-none'}`}
              >
                {isExecuting ? <span className="loading loading-spinner loading-xs"></span> : <Play size={16} fill="currentColor" />}
                Run Code
              </button>
            </div>
          </div>

          {/* Text Area (Monaco Placeholder) */}
          <div className="flex-1 relative bg-[#0f172a]">
             <textarea
                className="w-full h-full bg-[#0f172a] text-slate-300 font-mono p-4 resize-none focus:outline-none leading-relaxed text-sm"
                spellCheck="false"
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
              />
          </div>

          {/* Output Console */}
          <div className="h-1/3 min-h-[150px] border-t border-white/10 bg-[#020617] flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-10">
            <div className="h-10 px-4 flex items-center gap-2 bg-[#1e293b] text-xs font-bold text-slate-400 border-b border-white/5 select-none uppercase tracking-wider">
              <Terminal size={14} className="text-blue-500" /> Console Output
            </div>
            
            <div className="flex-1 p-4 font-mono text-sm overflow-y-auto custom-scrollbar">
              {isExecuting && (
                <div className="flex items-center gap-2 text-blue-400 animate-pulse">
                  <Cpu size={16} /> Executing code on server...
                </div>
              )}

              {!isExecuting && !submission && (
                <div className="text-slate-600 italic">Run your code to see the output here.</div>
              )}

              {/* Display Submission Result from Store */}
              {!isExecuting && submission && (
                <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-slate-400">Status:</span>
                    {/* Assuming submission has a status or we infer it from stdout/stderr */}
                    {submission.stderr ? (
                        <span className="text-red-400 font-bold flex items-center gap-1"><AlertCircle size={14}/> Execution Error</span>
                    ) : (
                        <span className="text-green-400 font-bold flex items-center gap-1"><CheckCircle size={14}/> Success</span>
                    )}
                  </div>

                  {submission.stdout && (
                    <div>
                        <div className="text-xs text-slate-500 mb-1">STDOUT:</div>
                        <pre className="text-slate-300 whitespace-pre-wrap">{submission.stdout}</pre>
                    </div>
                  )}

                  {submission.stderr && (
                    <div className="bg-red-500/10 p-2 rounded border border-red-500/20">
                        <div className="text-xs text-red-400 mb-1">STDERR:</div>
                        <pre className="text-red-300 whitespace-pre-wrap">{submission.stderr}</pre>
                    </div>
                  )}
                  
                  {/* If your backend returns a 'message' or 'verdict' */}
                  {submission.message && (
                     <div className="text-blue-400 mt-2 text-xs">Server Message: {submission.message}</div>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContestArena;