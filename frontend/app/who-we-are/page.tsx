import React from 'react'
import { PawPrint, Heart, Sparkles } from 'lucide-react'

export default function OurStory() {
  return (
    <div className="bg-white">
      <section className="relative py-24 sm:py-32 overflow-hidden bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
             <div className="p-4 bg-primary/10 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                <PawPrint className="w-10 h-10 text-primary" />
             </div>
             
             <h1 className="text-4xl sm:text-6xl font-black text-foreground tracking-tighter italic uppercase leading-[1.1]">
                Our Love Story <br/> <span className="text-primary italic">With Your Pets</span>
             </h1>

             <div className="space-y-6 text-xl text-foreground/70 font-medium leading-relaxed italic">
                <p>At My Pet Haven, we understand that your pets are family.</p>
                
                <p>
                  That's why we're dedicated to providing carefully selected products that prioritize their health, happiness, and well-being. From nutrition to comfort, every item in our store is chosen with love and expertise.
                </p>
                
                <p>
                  We're here to support you in giving your furry friends the care they deserve—because when they thrive, so do we.
                </p>
             </div>

             <div className="pt-12 flex items-center justify-center gap-12 text-foreground/30">
                <div className="flex flex-col items-center gap-2">
                   <Heart className="w-6 h-6" />
                   <span className="text-[10px] font-black uppercase tracking-widest">Chosen with Love</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                   <Sparkles className="w-6 h-6" />
                   <span className="text-[10px] font-black uppercase tracking-widest">Expert Care</span>
                </div>
             </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />
      </section>
    </div>
  )
}
