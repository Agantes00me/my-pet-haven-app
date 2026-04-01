'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, Brain, Recycle, Heart as HeartIcon } from 'lucide-react'

export default function WhoWeAre() {
  return (
    <div className="bg-[#FFF9F5] min-h-screen">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-24 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex justify-center mb-4">
             <div className="p-4 bg-primary/10 rounded-full">
                <HeartIcon className="w-12 h-12 text-primary fill-primary" />
             </div>
          </div>
          <h1 className="text-6xl sm:text-8xl font-black text-foreground italic leading-none tracking-tighter">
            Who <br/> We <span className="text-primary italic">Are.</span>
          </h1>
          <p className="text-2xl sm:text-3xl font-black text-foreground/80 max-w-4xl mx-auto leading-tight italic">
            &quot;Let&apos;s be honest: your pet has a better social life than you do. They deserve a gear bag that reflects that.&quot;
          </p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="max-w-4xl mx-auto px-4 pb-24 prose prose-slate prose-invert text-foreground/60 font-medium italic text-lg lg:text-xl space-y-12">
        <p>
          My Pet Haven is a curated collection for the pets of 2026. We’ve scoured the globe to find the perfect intersection of <span className="text-foreground font-black uppercase tracking-tight">Smart Pet Tech</span> and <span className="text-foreground font-black uppercase tracking-tight">Sustainable Design</span>.
        </p>
        <p>
          We know that one day you’re deep-cleaning after a muddy hike with our Grooming line, and the next you’re teaching them new tricks with our Cognitive Toys.
        </p>
        <p>
          From the highest tech to the lowest carbon footprint, we provide the essentials for every chapter of your pet&apos;s story. Welcome to the Haven.
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-16 not-prose">
           <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-border/40">
              <Brain className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-xl font-black text-foreground mb-2 italic">Smart Pet Tech</h3>
              <p className="text-sm font-medium opacity-50">Future-proof gear for the modern companion.</p>
           </div>
           <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-border/40">
              <Recycle className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-xl font-black text-foreground mb-2 italic">Sustainable Design</h3>
              <p className="text-sm font-medium opacity-50">Because the world they play in matters.</p>
           </div>
        </div>

        {/* Call to Action Trigger */}
        <div className="pt-20 text-center not-prose">
           <Link href="/quiz" className="inline-flex flex-col items-center group">
              <div className="px-12 py-6 bg-primary text-white font-black rounded-full shadow-[0_20px_50px_-20px_rgba(255,107,107,0.5)] group-hover:scale-[1.05] active:scale-95 transition-all text-xl mb-6">
                 Customize Your Haven
              </div>
              <p className="text-foreground/40 font-bold uppercase tracking-widest text-[10px] italic group-hover:text-primary transition-colors">
                 Tell us about your pet, and we&apos;ll build their profile.
              </p>
           </Link>
        </div>
      </section>
    </div>
  )
}
