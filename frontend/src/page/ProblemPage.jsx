import React, { useState, useEffect } from "react";
import {
  Play,
  FileText,
  MessageSquare,
  Lightbulb,
  Bookmark,
  Share2,
  Clock,
  ChevronRight,
  Home,
  Terminal,
  Code2,
  Users,
  ThumbsUp,
  Zap,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const ProblemPage = () => {
  const [code, setCode] = useState(`function twoSum(nums, target) {
  // Your solution here
  return [];
}`);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const problem = {
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
      }
    ],
    constraints: "2 ≤ nums.length ≤ 10⁴, -10⁹ ≤ nums[i] ≤ 10⁹, -10⁹ ≤ target ≤ 10⁹",
    hints: "Use a hash map to store the complement of each number as you iterate through the array.",
    difficulty: "Medium",
    submissions: 1234,
    successRate: 95
  };

  const testcases = [
    { input: "[2,7,11,15], 9", output: "[0,1]" },
    { input: "[3,2,4], 6", output: "[1,2]" },
    { input: "[3,3], 6", output: "[0,1]" }
  ];

  const handleRunCode = () => {
    setIsExecuting(true);
    setTimeout(() => setIsExecuting(false), 2000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="prose max-w-none">
            <p className="text-gray-300 text-base leading-relaxed mb-6 tracking-wide">{problem.description}</p>

            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 tracking-wide uppercase" style={{ fontFamily: "'Orbitron', monospace" }}>
              <Zap className="w-5 h-5 text-violet-400" />
              Examples
            </h3>
            {problem.examples.map((example, idx) => (
              <div key={idx} className="bg-slate-800/50 border border-violet-500/20 p-5 rounded-xl mb-4 hover:border-violet-500/40 transition-all duration-300">
                <div className="mb-3">
                  <div className="text-violet-400 text-sm font-semibold mb-2 tracking-wider uppercase">Input:</div>
                  <code className="bg-slate-900/80 px-3 py-1.5 rounded-lg text-emerald-400 text-sm">
                    {example.input}
                  </code>
                </div>
                <div className="mb-3">
                  <div className="text-cyan-400 text-sm font-semibold mb-2 tracking-wider uppercase">Output:</div>
                  <code className="bg-slate-900/80 px-3 py-1.5 rounded-lg text-cyan-300 text-sm">
                    {example.output}
                  </code>
                </div>
                {example.explanation && (
                  <div>
                    <div className="text-pink-400 text-sm font-semibold mb-2 tracking-wider uppercase">Explanation:</div>
                    <p className="text-gray-400 text-sm tracking-wide">{example.explanation}</p>
                  </div>
                )}
              </div>
            ))}

            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 mt-6 tracking-wide uppercase" style={{ fontFamily: "'Orbitron', monospace" }}>
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Constraints
            </h3>
            <div className="bg-slate-800/50 border border-emerald-500/20 p-5 rounded-xl hover:border-emerald-500/40 transition-all duration-300">
              <code className="text-emerald-400 text-sm">{problem.constraints}</code>
            </div>
          </div>
        );
      case "submissions":
        return (
          <div className="p-4 text-center text-gray-400">
            <Code2 className="w-12 h-12 mx-auto mb-3 text-violet-400 opacity-50" />
            <p className="tracking-wide">No submissions yet</p>
          </div>
        );
      case "discussion":
        return (
          <div className="p-4 text-center text-gray-400">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 text-cyan-400 opacity-50" />
            <p className="tracking-wide">No discussions yet</p>
          </div>
        );
      case "hints":
        return (
          <div className="p-4">
            <div className="bg-slate-800/50 border border-pink-500/20 p-5 rounded-xl hover:border-pink-500/40 transition-all duration-300">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-pink-400 mt-1 flex-shrink-0" />
                <p className="text-gray-300 text-sm tracking-wide">{problem.hints}</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden" style={{ fontFamily: "'Rajdhani', 'Roboto Mono', monospace" }}>
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-0 left-1/2 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Grid Pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none"></div>

      {/* Floating Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-violet-400/60 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Navigation */}
        <nav className={`bg-slate-900/60 backdrop-blur-xl border-b border-violet-500/20 px-6 py-4 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="group p-2 bg-slate-800/50 border border-violet-500/20 rounded-xl hover:bg-violet-500/10 hover:border-violet-500/40 transition-all duration-300 hover:scale-110">
                <Home className="w-5 h-5 text-violet-400 group-hover:rotate-12 transition-transform" />
              </button>
              <ChevronRight className="w-4 h-4 text-gray-600" />
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-white via-violet-400 to-cyan-400 bg-clip-text text-transparent tracking-wide" style={{ fontFamily: "'Orbitron', monospace" }}>
                  {problem.title}
                </h1>
                <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                  <span className="flex items-center gap-1 tracking-wide">
                    <Clock className="w-3 h-3" />
                    Updated Nov 28, 2025
                  </span>
                  <span className="text-gray-600">•</span>
                  <span className="flex items-center gap-1 tracking-wide">
                    <Users className="w-3 h-3" />
                    {problem.submissions} Submissions
                  </span>
                  <span className="text-gray-600">•</span>
                  <span className="flex items-center gap-1 tracking-wide">
                    <ThumbsUp className="w-3 h-3" />
                    {problem.successRate}% Success
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                className={`p-2 rounded-xl border transition-all duration-300 hover:scale-110 ${
                  isBookmarked 
                    ? "bg-violet-500/20 border-violet-500/40 text-violet-400" 
                    : "bg-slate-800/50 border-slate-700/50 text-gray-400 hover:border-violet-500/40"
                }`}
                onClick={() => setIsBookmarked(!isBookmarked)}
              >
                <Bookmark className="w-5 h-5" fill={isBookmarked ? "currentColor" : "none"} />
              </button>
              <button className="p-2 bg-slate-800/50 border border-slate-700/50 rounded-xl text-gray-400 hover:border-cyan-500/40 hover:text-cyan-400 transition-all duration-300 hover:scale-110">
                <Share2 className="w-5 h-5" />
              </button>
              <select
                className="px-4 py-2 bg-slate-800/50 border border-violet-500/20 rounded-xl text-white text-sm font-semibold hover:border-violet-500/40 transition-all duration-300 focus:outline-none focus:border-violet-500/60 tracking-wide"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
              </select>
            </div>
          </div>
        </nav>

        <div className="container mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Panel */}
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <div className="bg-slate-900/60 backdrop-blur-xl border border-violet-500/20 rounded-2xl overflow-hidden hover:border-violet-500/30 transition-all duration-300 shadow-2xl shadow-violet-500/5">
                <div className="flex border-b border-violet-500/20 bg-slate-900/40">
                  {[
                    { id: "description", icon: FileText, label: "Description", color: "violet" },
                    { id: "submissions", icon: Code2, label: "Submissions", color: "cyan" },
                    { id: "discussion", icon: MessageSquare, label: "Discussion", color: "pink" },
                    { id: "hints", icon: Lightbulb, label: "Hints", color: "emerald" }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold tracking-wider uppercase transition-all duration-300 ${
                          isActive
                            ? `text-${tab.color}-400 border-b-2 border-${tab.color}-500 bg-${tab.color}-500/5`
                            : "text-gray-400 hover:text-white hover:bg-slate-800/50"
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
                <div className="p-6 max-h-[calc(100vh-300px)] overflow-y-auto custom-scrollbar">
                  {renderTabContent()}
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="bg-slate-900/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300 shadow-2xl shadow-cyan-500/5">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-cyan-500/20 bg-slate-900/40">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-semibold text-white tracking-wider uppercase">Code Editor</span>
                  <div className="ml-auto flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                </div>

                <div className="bg-slate-950/80">
                  <textarea
                    className="w-full h-[400px] p-4 bg-transparent text-emerald-400 font-mono text-sm resize-none focus:outline-none custom-scrollbar"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    spellCheck={false}
                  />
                </div>

                <div className="p-4 border-t border-cyan-500/20 bg-slate-900/40">
                  <div className="flex items-center justify-between">
                    <button
                      className={`group flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-xl font-bold text-white hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300 hover:scale-105 tracking-wider uppercase ${
                        isExecuting ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={handleRunCode}
                      disabled={isExecuting}
                    >
                      {isExecuting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Running...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                          Run Code
                        </>
                      )}
                    </button>
                    <button className="group flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl font-bold text-white hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 tracking-wider uppercase">
                      <CheckCircle2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Test Cases */}
          <div className={`mt-6 transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-slate-900/60 backdrop-blur-xl border border-pink-500/20 rounded-2xl overflow-hidden hover:border-pink-500/30 transition-all duration-300 shadow-2xl shadow-pink-500/5">
              <div className="px-6 py-4 border-b border-pink-500/20 bg-slate-900/40">
                <h3 className="text-lg font-bold text-white flex items-center gap-2 tracking-wide uppercase" style={{ fontFamily: "'Orbitron', monospace" }}>
                  <Zap className="w-5 h-5 text-pink-400" />
                  Test Cases
                </h3>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-pink-500/20">
                        <th className="text-left py-3 px-4 text-sm font-bold text-pink-400 tracking-wider uppercase">Input</th>
                        <th className="text-left py-3 px-4 text-sm font-bold text-cyan-400 tracking-wider uppercase">Expected Output</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testcases.map((testCase, index) => (
                        <tr key={index} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                          <td className="py-3 px-4 font-mono text-sm text-gray-300">{testCase.input}</td>
                          <td className="py-3 px-4 font-mono text-sm text-gray-300">{testCase.output}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.5);
        }
      `}</style>
    </div>
  );
};

export default ProblemPage;