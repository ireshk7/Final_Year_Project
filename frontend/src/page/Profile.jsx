import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, User, Shield, Image, Award, Code, Trophy, Target, Edit, Lock, Sparkles } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import ProfileSubmission from "../components/ProfileSubmission";
import ProblemSolvedByUser from "../components/ProblemSolvedByUser";
import PlaylistProfile from "../components/PlaylistProfile";

const Profile = () => {
  const { authUser } = useAuthStore();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden" style={{ fontFamily: "'Rajdhani', 'Roboto Mono', monospace" }}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-lime-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none z-0"></div>

      {/* Floating Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(10)].map((_, i) => (
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

      <div className="relative z-10 py-10 px-4 md:px-8 w-full max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className={`flex flex-row justify-between items-center w-full mb-8 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <div className="flex items-center gap-3">
            <Link 
              to={"/"} 
              className="group p-3 bg-slate-900/50 backdrop-blur-xl border border-emerald-500/20 rounded-xl hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all duration-300 hover:scale-110"
            >
              <ArrowLeft className="w-5 h-5 text-emerald-400 group-hover:-translate-x-1 transition-transform" />
            </Link>
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-white via-emerald-400 to-green-400 bg-clip-text text-transparent tracking-wider uppercase" style={{ fontFamily: "'Orbitron', monospace" }}>
                Profile
              </h1>
              <p className="text-gray-400 text-sm mt-1 tracking-wide">Manage your account settings</p>
            </div>
          </div>
        </div>
        
        {/* Profile Card */}
        <div className={`mb-8 transition-all duration-1000 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-slate-900/50 backdrop-blur-xl border border-emerald-500/20 rounded-3xl shadow-2xl shadow-emerald-500/10 overflow-hidden hover:border-emerald-500/30 transition-all duration-300">
            {/* Profile Header with Gradient Background */}
            <div className="relative h-32 bg-gradient-to-r from-emerald-500/20 via-green-500/20 to-lime-500/20 overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.1)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="p-8">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 -mt-20 mb-6">
                {/* Avatar with glow effect */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-emerald-500/40 blur-2xl rounded-full group-hover:bg-emerald-500/60 transition-all duration-300 animate-pulse"></div>
                  <div className="relative w-32 h-32 rounded-2xl bg-slate-800 ring-4 ring-emerald-500/30 overflow-hidden group-hover:ring-emerald-500/50 group-hover:scale-105 transition-all duration-300 shadow-xl shadow-emerald-500/20">
                    {authUser.image ? (
                      <img src={authUser?.image || "https://avatar.iran.liara.run/public/boy"} alt={authUser.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-500/20 to-green-500/20">
                        <span className="text-5xl font-bold text-emerald-400" style={{ fontFamily: "'Orbitron', monospace" }}>{authUser.name ? authUser.name.charAt(0) : "U"}</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 px-3 py-1 bg-emerald-500 rounded-lg text-xs font-bold text-white shadow-lg tracking-wider" style={{ fontFamily: "'Orbitron', monospace" }}>
                    LV {authUser.level || 1}
                  </div>
                </div>
                
                {/* Name and Role */}
                <div className="text-center md:text-left flex-1 md:mt-6">
                  <h2 className="text-3xl font-black text-white mb-2 tracking-wide" style={{ fontFamily: "'Orbitron', monospace" }}>{authUser.name}</h2>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-300 text-sm font-semibold tracking-wider uppercase">
                      <Shield className="w-4 h-4" />
                      {authUser.role}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-lime-500/20 border border-lime-500/30 rounded-lg text-lime-300 text-sm font-semibold tracking-wider uppercase">
                      <Trophy className="w-4 h-4" />
                      Level {authUser.level || 1}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 md:mt-6">
                  <button className="group px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2">
                    <Edit className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
                    <span className="text-sm font-semibold text-emerald-300 tracking-wider uppercase">Edit</span>
                  </button>
                  <button className="group px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-xl hover:bg-green-500/20 hover:border-green-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-green-400 group-hover:rotate-12 transition-transform" />
                    <span className="text-sm font-semibold text-green-300 tracking-wider uppercase">Password</span>
                  </button>
                </div>
              </div>
              
              <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent my-6"></div>
              
              {/* User Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Email */}
                <div className="group p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:border-emerald-500/30 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all">
                      <Mail className="w-5 h-5 text-emerald-400" />
                    </div>
                    <span className="text-xs text-gray-400 font-semibold tracking-wider uppercase">Email</span>
                  </div>
                  <p className="text-sm text-white font-semibold break-all tracking-wide">{authUser.email}</p>
                </div>
                
                {/* User ID */}
                <div className="group p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:border-green-500/30 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all">
                      <User className="w-5 h-5 text-green-400" />
                    </div>
                    <span className="text-xs text-gray-400 font-semibold tracking-wider uppercase">User ID</span>
                  </div>
                  <p className="text-xs text-white font-mono break-all">{authUser.id.substring(0, 16)}...</p>
                </div>
                
                {/* Role Status */}
                <div className="group p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:border-lime-500/30 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-lime-500/10 rounded-lg flex items-center justify-center group-hover:bg-lime-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all">
                      <Shield className="w-5 h-5 text-lime-400" />
                    </div>
                    <span className="text-xs text-gray-400 font-semibold tracking-wider uppercase">Role</span>
                  </div>
                  <p className="text-sm text-white font-semibold tracking-wide">{authUser.role}</p>
                  <p className="text-xs text-gray-500 mt-1 tracking-wide">
                    {authUser.role === "ADMIN" ? "Full system access" : "Limited access"}
                  </p>
                </div>
                
                {/* Profile Image Status */}
                <div className="group p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:border-teal-500/30 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-teal-500/10 rounded-lg flex items-center justify-center group-hover:bg-teal-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all">
                      <Image className="w-5 h-5 text-teal-400" />
                    </div>
                    <span className="text-xs text-gray-400 font-semibold tracking-wider uppercase">Profile Image</span>
                  </div>
                  <p className="text-sm text-white font-semibold tracking-wide">
                    {authUser.image ? "Uploaded" : "Not Set"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 tracking-wide">
                    {authUser.image ? "Image available" : "Upload a picture"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`mb-8 transition-all duration-1000 delay-400 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="group p-6 bg-slate-900/50 backdrop-blur-xl border border-emerald-500/20 rounded-2xl hover:border-emerald-500/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all">
                  <Code className="w-6 h-6 text-emerald-400" />
                </div>
                <Target className="w-5 h-5 text-emerald-400/50" />
              </div>
              <p className="text-3xl font-black text-emerald-400 mb-1" style={{ fontFamily: "'Orbitron', monospace" }}>0</p>
              <p className="text-sm text-gray-400 font-semibold tracking-wider uppercase">Problems Solved</p>
            </div>

            <div className="group p-6 bg-slate-900/50 backdrop-blur-xl border border-green-500/20 rounded-2xl hover:border-green-500/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/20">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center group-hover:bg-green-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all">
                  <Trophy className="w-6 h-6 text-green-400" />
                </div>
                <Award className="w-5 h-5 text-green-400/50" />
              </div>
              <p className="text-3xl font-black text-green-400 mb-1" style={{ fontFamily: "'Orbitron', monospace" }}>0</p>
              <p className="text-sm text-gray-400 font-semibold tracking-wider uppercase">Contests Won</p>
            </div>

            <div className="group p-6 bg-slate-900/50 backdrop-blur-xl border border-lime-500/20 rounded-2xl hover:border-lime-500/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-lime-500/20">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-lime-500/10 rounded-xl flex items-center justify-center group-hover:bg-lime-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all">
                  <Award className="w-6 h-6 text-lime-400" />
                </div>
                <Sparkles className="w-5 h-5 text-lime-400/50" />
              </div>
              <p className="text-3xl font-black text-lime-400 mb-1" style={{ fontFamily: "'Orbitron', monospace" }}>{authUser.level || 1}</p>
              <p className="text-sm text-gray-400 font-semibold tracking-wider uppercase">Current Level</p>
            </div>
          </div>
        </div>

        {/* Additional Components */}
        <div className={`space-y-8 transition-all duration-1000 delay-600 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <ProfileSubmission/>
          <ProblemSolvedByUser/>
          <PlaylistProfile/>
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

export default Profile;