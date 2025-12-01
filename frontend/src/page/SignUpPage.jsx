import React, { useState, useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from 'react-router-dom';
import {
  Code,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  User,
  Shield,
  Zap
} from "lucide-react";
import { z } from "zod";
import AuthImagePattern from '../components/AuthImagePattern';
import { useAuthStore } from '../store/useAuthStore.js';

const SignUpSchema = z.object({
  email: z.string().email("Enter Valid Email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(3, "Name must be at least 3 characters")
});

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
        
        // Brighter green for the leading character
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

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isSigninUp } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema)
  });

  const onSubmit = async (data) => {
    try {
      await signup(data);
      console.log("signup data", data);
    } catch (error) {
      console.error("SignUp failed:", error);
    }
  };

  return (
    <div className='min-h-screen grid lg:grid-cols-2 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden'>
      {/* Matrix Rain Background - Full Page */}
      <div className="fixed inset-0 z-0">
        <MatrixRain />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-lime-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none z-[1]"></div>

      {/* Left Side - SignUp Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 relative z-10">
        <div className="w-full max-w-md space-y-8">
          {/* Logo & Header */}
          <div className="text-center space-y-6">
            <div className="flex flex-col items-center gap-3 group">
              {/* Logo */}
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500/40 blur-2xl rounded-full group-hover:bg-emerald-500/60 transition-all duration-300 animate-pulse"></div>
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-emerald-500/20">
                  <Code className="w-8 h-8 text-emerald-400 animate-pulse" />
                </div>
              </div>

              {/* Title */}
              <div className="animate-fade-in">
                <h1 className="text-4xl font-black bg-gradient-to-r from-white via-emerald-400 to-green-400 bg-clip-text text-transparent mb-2 animate-pulse">
                  Join CodeFlux
                </h1>
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <p className="text-gray-400">Start your coding journey today</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Container */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 hover:border-emerald-500/30 rounded-2xl p-8 shadow-2xl transition-all duration-500 hover:shadow-emerald-500/10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name Field */}
              <div className="space-y-2 transform transition-all duration-300 hover:translate-x-1">
                <label className="text-sm font-semibold text-gray-300">
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className={`h-5 w-5 transition-all duration-200 ${
                      errors.name ? "text-red-400" : "text-gray-500 group-focus-within:text-emerald-400 group-focus-within:scale-110"
                    }`} />
                  </div>
                  <input
                    type="text"
                    {...register("name")}
                    className={`w-full pl-12 pr-4 py-3 bg-slate-800/50 border rounded-xl text-white placeholder-gray-500 outline-none transition-all duration-200 ${
                      errors.name 
                        ? "border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20" 
                        : "border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-slate-800/70"
                    }`}
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-400 text-sm flex items-center gap-1 mt-1 animate-shake">
                    <span className="w-1 h-1 bg-red-400 rounded-full animate-pulse"></span>
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2 transform transition-all duration-300 hover:translate-x-1">
                <label className="text-sm font-semibold text-gray-300">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className={`h-5 w-5 transition-all duration-200 ${
                      errors.email ? "text-red-400" : "text-gray-500 group-focus-within:text-emerald-400 group-focus-within:scale-110"
                    }`} />
                  </div>
                  <input
                    type="email"
                    {...register("email")}
                    className={`w-full pl-12 pr-4 py-3 bg-slate-800/50 border rounded-xl text-white placeholder-gray-500 outline-none transition-all duration-200 ${
                      errors.email 
                        ? "border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20" 
                        : "border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-slate-800/70"
                    }`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-sm flex items-center gap-1 mt-1 animate-shake">
                    <span className="w-1 h-1 bg-red-400 rounded-full animate-pulse"></span>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2 transform transition-all duration-300 hover:translate-x-1">
                <label className="text-sm font-semibold text-gray-300">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className={`h-5 w-5 transition-all duration-200 ${
                      errors.password ? "text-red-400" : "text-gray-500 group-focus-within:text-emerald-400 group-focus-within:scale-110"
                    }`} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className={`w-full pl-12 pr-12 py-3 bg-slate-800/50 border rounded-xl text-white placeholder-gray-500 outline-none transition-all duration-200 ${
                      errors.password 
                        ? "border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20" 
                        : "border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-slate-800/70"
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-emerald-400 transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-emerald-400 transition-colors" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm flex items-center gap-1 mt-1 animate-shake">
                    <span className="w-1 h-1 bg-red-400 rounded-full animate-pulse"></span>
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Terms & Conditions */}
              <div className="pt-2">
                <p className="text-xs text-gray-400">
                  By signing up, you agree to our{" "}
                  <Link to="/terms" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                    Privacy Policy
                  </Link>
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSigninUp}
                className="relative w-full py-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl font-bold text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center gap-2">
                  {isSigninUp ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-slate-900 text-gray-400">or</span>
              </div>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link 
                  to="/login" 
                  className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors duration-200 inline-flex items-center gap-1 group"
                >
                  Sign In
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="flex flex-col items-center gap-2 text-center transform transition-all duration-300 hover:scale-110 hover:-translate-y-1">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center hover:bg-emerald-500/20 transition-all duration-300 shadow-lg shadow-emerald-500/10">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
              <p className="text-xs text-gray-400">Secure</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center transform transition-all duration-300 hover:scale-110 hover:-translate-y-1">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center hover:bg-green-500/20 transition-all duration-300 shadow-lg shadow-green-500/10">
                <Zap className="w-5 h-5 text-green-400" />
              </div>
              <p className="text-xs text-gray-400">Fast Setup</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center transform transition-all duration-300 hover:scale-110 hover:-translate-y-1">
              <div className="w-10 h-10 bg-lime-500/10 rounded-lg flex items-center justify-center hover:bg-lime-500/20 transition-all duration-300 shadow-lg shadow-lime-500/10">
                <CheckCircle2 className="w-5 h-5 text-lime-400" />
              </div>
              <p className="text-xs text-gray-400">Free Forever</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <div className="relative z-10">
        <AuthImagePattern
          title={"Welcome to our platform!"}
          subtitle={
            "Sign up to access our platform and start using our services."
          }
        />
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SignUpPage;