import React from 'react'
import Link from 'next/link'
import { PawPrint, Mail, Heart, Smile } from 'lucide-react'
import { categoriesData } from '../../lib/categories'

export default function Footer() {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1 space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                <PawPrint className="w-8 h-8 text-primary" />
              </div>
              <span className="text-2xl font-bold text-foreground tracking-tight">
                MyPet<span className="text-primary tracking-tighter">Haven</span>
              </span>
            </Link>
            <p className="text-foreground/40 font-medium leading-relaxed italic pr-4">
              Providing premium comfort and playtime for your furry best friends. Located in the heart of South Africa, shipping global love.
            </p>
            <div className="flex items-center gap-4">
              <div className="p-2 bg-muted rounded-full hover:bg-primary/10 hover:text-primary transition-all cursor-pointer">
                <Heart className="w-5 h-5 transition-transform hover:scale-110" />
              </div>
              <div className="p-2 bg-muted rounded-full hover:bg-primary/10 hover:text-primary transition-all cursor-pointer">
                <Smile className="w-5 h-5 transition-transform hover:scale-110" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="font-black uppercase tracking-widest text-xs text-foreground/30 mb-8">Shop Categories</h3>
            <ul className="space-y-4">
              {Object.entries(categoriesData).slice(0, 3).map(([slug, cat]) => (
                <li key={slug}><Link href={`/category/${slug}`} className="text-foreground/70 hover:text-primary font-bold transition-colors">{cat.name}</Link></li>
              ))}
              <li><Link href="/quiz" className="text-foreground/70 hover:text-primary font-bold transition-colors italic">Pet Personality Quiz</Link></li>
            </ul>
          </div>

          {/* Legal Pages */}
          <div className="col-span-1">
            <h3 className="font-black uppercase tracking-widest text-xs text-foreground/30 mb-8">Information</h3>
            <ul className="space-y-4">
              <li><Link href="/who-we-are" className="text-foreground/70 hover:text-primary font-bold transition-colors underline decoration-primary/30 underline-offset-4 decoration-2">Who We Are</Link></li>
              <li><Link href="/policies/privacy-policy" className="text-foreground/70 hover:text-primary font-bold transition-colors">Privacy Policy</Link></li>
              <li><Link href="/policies/terms-of-service" className="text-foreground/70 hover:text-primary font-bold transition-colors">Terms of Service</Link></li>
              <li><Link href="/tracking" className="text-foreground/70 hover:text-primary font-bold transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Contact Support */}
          <div className="col-span-1">
             <h3 className="font-black uppercase tracking-widest text-xs text-foreground/30 mb-8">Need Assistance?</h3>
             <div className="space-y-6">

                <Link href="/contact" className="inline-block mt-4 text-primary font-black underline hover:text-primary/80 transition-colors">
                  Contact Support Team
                </Link>
             </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-foreground/30 text-xs font-medium">
            &copy; 2026 My Pet Haven. All rights reserved. Powered by Antigravity.
          </p>
          <div className="flex items-center gap-8">
            <p className="text-foreground/30 text-xs font-bold uppercase tracking-widest italic tracking-tighter">Designed for happy pets</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
