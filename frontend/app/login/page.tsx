'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Shield, ArrowRight, UserPlus } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '../../lib/supabase'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'apple') => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      if (error) throw error
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-theme flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full animate-in fade-in zoom-in-95 duration-700">
        <div className="bg-white rounded-[3rem] p-8 sm:p-12 shadow-2xl border border-border/40 text-center">
            
            <div className="p-4 bg-primary/10 rounded-full w-20 h-20 mx-auto mb-8 flex items-center justify-center font-black text-primary">
               MPG
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-black text-foreground mb-4 italic tracking-tighter uppercase"
            >
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </motion.h1>
            <p className="text-foreground/40 font-medium mb-12 italic">Join the Haven for personalized pet experiences.</p>

            <form className="space-y-6 text-left" onSubmit={(e) => e.preventDefault()}>
               {!isLogin && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-4">Full Name</label>
                    <div className="relative">
                       <User className="absolute left-4 top-4 w-4 h-4 text-foreground/20" />
                       <input type="text" placeholder="John Doe" className="w-full bg-muted/30 border border-border rounded-full py-4 pl-12 pr-6 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-bold" />
                    </div>
                  </div>
               )}
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-4">Email Address</label>
                 <div className="relative">
                    <Mail className="absolute left-4 top-4 w-4 h-4 text-foreground/20" />
                    <input type="email" placeholder="hello@petparent.com" className="w-full bg-muted/30 border border-border rounded-full py-4 pl-12 pr-6 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-bold" />
                 </div>
               </div>

               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-4">Password</label>
                 <div className="relative">
                    <Shield className="absolute left-4 top-4 w-4 h-4 text-foreground/20" />
                    <input type="password" placeholder="••••••••" className="w-full bg-muted/30 border border-border rounded-full py-4 pl-12 pr-6 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-bold" />
                 </div>
               </div>


               <button type="submit" className="w-full py-5 bg-primary text-white font-black rounded-full shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 text-lg mt-8 uppercase tracking-tighter disabled:opacity-50" disabled={loading}>
                  {isLogin ? 'Enter The Haven' : 'Create My Profile'} <ArrowRight className="w-5 h-5" />
               </button>
            </form>

            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-foreground/20 font-black tracking-widest">Or Continue With</span></div>
            </div>

            <div className="flex flex-col gap-4">
              <button 
                onClick={() => handleSocialLogin('google')} 
                disabled={loading}
                className="flex items-center gap-4 py-4 px-8 bg-white border border-border rounded-full hover:bg-muted transition-all group disabled:opacity-50 shadow-sm"
              >
                <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
                <span className="font-bold text-sm text-foreground/60 transition-colors group-hover:text-primary">Continue with Google</span>
              </button>

              <button 
                onClick={() => handleSocialLogin('facebook')} 
                disabled={loading}
                className="flex items-center gap-4 py-4 px-8 bg-white border border-border rounded-full hover:bg-muted transition-all group disabled:opacity-50 shadow-sm"
              >
                <div className="w-4 h-4 bg-[#1877F2] rounded-sm flex items-center justify-center font-black text-white text-[10px]">f</div>
                <span className="font-bold text-sm text-foreground/60 transition-colors group-hover:text-primary">Continue with Facebook</span>
              </button>

              <button 
                onClick={() => handleSocialLogin('apple')} 
                disabled={loading}
                className="flex items-center gap-4 py-4 px-8 bg-white border border-border rounded-full hover:bg-muted transition-all group disabled:opacity-50 shadow-sm"
              >
                <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center">
                   <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="font-bold text-sm text-foreground/60 transition-colors group-hover:text-primary">Continue with Apple</span>
              </button>
            </div>

            <div className="mt-12 pt-8 border-t border-border flex flex-col gap-4">
               <button 
                 onClick={() => setIsLogin(!isLogin)}
                 className="text-primary font-black flex items-center justify-center gap-2 group hover:gap-3 transition-all"
               >
                 {isLogin ? "Need a profile?" : "Already have a profile?"} {isLogin ? <UserPlus className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
               </button>

               <Link href="/faq" className="text-foreground/40 font-bold text-xs hover:text-primary transition-colors">Need help logging in?</Link>
            </div>
        </div>
      </div>
    </div>
  )
}
