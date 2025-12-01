import React, { useState, useEffect } from "react";
import { User, Code, LogOut, Menu, X, Sparkles, Award, Code2, Trophy } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const { authUser } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`sticky top-0 z-50 w-full py-4 px-4 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-2xl' : ''
      }`}>
        <div className={`flex w-full justify-between items-center mx-auto max-w-7xl bg-slate-900/80 shadow-2xl backdrop-blur-xl border px-6 py-4 rounded-2xl relative overflow-hidden transition-all duration-300 ${
          isScrolled 
            ? 'border-emerald-500/30 shadow-emerald-500/10' 
            : 'border-slate-800/50 shadow-emerald-500/5'
        }`}>
          {/* Animated Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-green-500/5 to-emerald-500/5 opacity-50 animate-pulse"></div>
          
          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-green-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer group relative z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/40 blur-xl rounded-full group-hover:bg-emerald-500/60 transition-all duration-300 animate-pulse"></div>
              <div className="relative h-12 w-12 bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/30 p-2 rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Code2 className="w-7 h-7 text-emerald-400 animate-pulse" />
              </div>
            </div>
            <div className="hidden md:block">
              <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-white via-emerald-400 to-green-400 bg-clip-text text-transparent">
                CodeFlux
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <Sparkles className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span className="text-xs text-gray-400 font-medium">Master Coding</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 relative z-10">
            {/* Stats Badge */}
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 group">
              <Trophy className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold text-emerald-300">Level {authUser?.level || 1}</span>
            </div>

            {/* Admin Button */}
            {authUser?.role === "ADMIN" && (
              <Link
                to="/add-problem"
                className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-xl hover:bg-green-500/20 hover:border-green-500/50 hover:scale-105 transition-all duration-300 group"
              >
                <Code className="w-4 h-4 text-green-400 group-hover:rotate-12 transition-transform" />
                <span className="text-sm font-semibold text-green-300 hidden lg:block">Add Problem</span>
              </Link>
            )}

            {/* Profile Button */}
            <Link
              to="/profile"
              className="flex items-center gap-2 px-4 py-2 bg-lime-500/10 border border-lime-500/30 rounded-xl hover:bg-lime-500/20 hover:border-lime-500/50 hover:scale-105 transition-all duration-300 group"
            >
              <User className="w-4 h-4 text-lime-400 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold text-lime-300 hidden lg:block">Profile</span>
            </Link>

            {/* User Avatar with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="relative group"
              >
                <div className="absolute inset-0 bg-emerald-500/50 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                <img
                  src={authUser?.image || "https://avatar.iran.liara.run/public/boy"}
                  alt="User Avatar"
                  className="relative w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/30 group-hover:ring-emerald-500/60 group-hover:scale-110 transition-all duration-300"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full animate-pulse"></div>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsDropdownOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-3 w-64 bg-slate-900/95 backdrop-blur-xl border border-emerald-500/30 rounded-2xl shadow-2xl shadow-emerald-500/20 overflow-hidden z-50 animate-dropdown">
                    {/* User Info Header */}
                    <div className="p-4 bg-gradient-to-br from-emerald-500/10 to-green-500/10 border-b border-emerald-500/20">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="absolute inset-0 bg-emerald-500/30 blur-md rounded-full animate-pulse"></div>
                          <img
                            src={authUser?.image || "https://avatar.iran.liara.run/public/boy"}
                            alt="User Avatar"
                            className="relative w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500/50"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-white truncate">{authUser?.name}</p>
                          <p className="text-xs text-gray-400 truncate">{authUser?.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition-all duration-200 group"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-200">
                          <User className="w-4 h-4 text-emerald-400" />
                        </div>
                        <span className="font-semibold text-gray-300 group-hover:text-white">My Profile</span>
                      </Link>

                      {authUser?.role === "ADMIN" && (
                        <Link
                          to="/add-problem"
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition-all duration-200 group"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-200">
                            <Code className="w-4 h-4 text-green-400" />
                          </div>
                          <span className="font-semibold text-gray-300 group-hover:text-white">Add Problem</span>
                        </Link>
                      )}

                      <div className="my-2 h-px bg-emerald-500/20"></div>

                      <LogoutButton className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 transition-all duration-200 group w-full">
                        <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center group-hover:bg-red-500/20 group-hover:scale-110 transition-all duration-200">
                          <LogOut className="w-4 h-4 text-red-400" />
                        </div>
                        <span className="font-semibold text-gray-300 group-hover:text-red-400">Logout</span>
                      </LogoutButton>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Sign Out Button */}
            <LogoutButton className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-xl hover:bg-red-500/20 hover:border-red-500/50 hover:scale-105 transition-all duration-300 group">
              <LogOut className="w-4 h-4 text-red-400 group-hover:rotate-12 transition-transform" />
              <span className="text-sm font-semibold text-red-300 hidden lg:block">Sign Out</span>
            </LogoutButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-10 p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:scale-110 transition-all duration-300"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-emerald-300" />
            ) : (
              <Menu className="w-6 h-6 text-emerald-300" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 mx-4 bg-slate-900/95 backdrop-blur-xl border border-emerald-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-emerald-500/20 animate-dropdown">
            {/* User Info */}
            <div className="p-4 bg-gradient-to-br from-emerald-500/10 to-green-500/10 border-b border-emerald-500/20">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500/30 blur-md rounded-full animate-pulse"></div>
                  <img
                    src={authUser?.image || "https://avatar.iran.liara.run/public/boy"}
                    alt="User Avatar"
                    className="relative w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500/50"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white truncate">{authUser?.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Trophy className="w-3 h-3 text-emerald-400" />
                    <span className="text-xs text-gray-400">Level {authUser?.level || 1}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Menu Items */}
            <div className="p-2">
              <Link
                to="/profile"
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition-all duration-200 group"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/20 transition-all">
                  <User className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="font-semibold text-gray-300 group-hover:text-white">My Profile</span>
              </Link>

              {authUser?.role === "ADMIN" && (
                <Link
                  to="/add-problem"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition-all duration-200 group"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 transition-all">
                    <Code className="w-5 h-5 text-green-400" />
                  </div>
                  <span className="font-semibold text-gray-300 group-hover:text-white">Add Problem</span>
                </Link>
              )}

              <div className="my-2 h-px bg-emerald-500/20"></div>

              <LogoutButton className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 transition-all duration-200 group w-full">
                <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center group-hover:bg-red-500/20 transition-all">
                  <LogOut className="w-5 h-5 text-red-400" />
                </div>
                <span className="font-semibold text-gray-300 group-hover:text-red-400">Logout</span>
              </LogoutButton>
            </div>
          </div>
        )}
      </nav>

      <style>{`
        @keyframes dropdown {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-dropdown {
          animation: dropdown 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </>
  );
};

export default Navbar;