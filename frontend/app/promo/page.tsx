'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Zap, Shield, Heart, Star, Sparkles, ChevronRight, ShoppingBag, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import ProductCard from '../components/ProductCard'

export default function PromoLanding() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTopPicks() {
      const { data, error } = await supabase
        .from('shopify_products')
        .select('*')
        .eq('status', 'active')
        .limit(4)
      
      if (!error && data) setProducts(data)
      setLoading(false)
    }
    fetchTopPicks()
  }, [])

  return (
    <div className="bg-white selection:bg-primary/30">
      {/* Super Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#FFF9F5]">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
           <div className="absolute top-20 left-10 w-64 h-64 bg-primary blur-[100px] rounded-full animate-pulse" />
           <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent blur-[100px] rounded-full animate-pulse delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-black uppercase tracking-widest text-[10px] mb-8 animate-bounce">
                <Sparkles className="w-4 h-4" /> Global Pet Quality
              </div>
              <h1 className="text-6xl sm:text-8xl font-black text-foreground mb-8 tracking-tighter italic leading-[0.9]">
                 The Quality Sleep <br/> Your Pet <br/> <span className="text-primary italic">Deserves.</span>
              </h1>
              <p className="text-lg sm:text-xl text-foreground/50 font-medium mb-12 max-w-xl leading-relaxed italic pr-4">
                Designed in South Africa, loved worldwide. Join 50,000+ happy pet parents who chose My Pet Haven for comfort and precision.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="#featured" className="px-12 py-5 bg-primary text-white font-black rounded-full shadow-2xl shadow-primary/30 hover:scale-[1.05] active:scale-95 transition-all text-lg flex items-center justify-center gap-3">
                   Shop Best Sellers <ShoppingBag className="w-6 h-6" />
                </Link>
                <Link href="/quiz" className="px-12 py-5 bg-white border-2 border-border text-foreground font-black rounded-full hover:bg-muted transition-all text-lg flex items-center justify-center gap-3">
                   Start Pet Quiz <ArrowRight className="w-6 h-6" />
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative aspect-square lg:aspect-auto h-[400px] lg:h-[600px]"
            >
               <div className="absolute inset-0 bg-primary/10 rounded-[4rem] rotate-6 scale-95" />
               <div className="absolute inset-0 bg-white rounded-[4rem] shadow-2xl overflow-hidden border-8 border-white p-2">
                  <Image 
                    src="https://images.unsplash.com/photo-1541781751897-40089851675a?q=80&w=1200&auto=format&fit=crop" 
                    alt="Happy Pet" 
                    fill 
                    className="object-cover"
                  />
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-y border-border bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
           {[
             { icon: Zap, text: 'Ultra-Fast Shipping' },
             { icon: Shield, text: '30-Day Guarantee' },
             { icon: Heart, text: 'Pet-Safe Materials' },
             { icon: Star, text: 'Top Rated in SA' }
           ].map((badge) => (
             <div key={badge.text} className="flex items-center justify-center gap-3 text-foreground/40 font-black uppercase tracking-widest text-[10px]">
                <badge.icon className="w-5 h-5 text-primary" /> {badge.text}
             </div>
           ))}
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-32 bg-[#FAFBFF]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-16">
            <div>
               <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-4 italic tracking-tighter uppercase leading-none">Best Sellers</h2>
               <p className="text-foreground/40 font-bold italic tracking-tighter uppercase text-xs">Curated by our pet experts</p>
            </div>
            <Link href="/" className="text-primary font-black flex items-center gap-2 group">
              View All <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {products.length === 0 && !loading && (
               <p className="col-span-4 text-center text-foreground/30 font-bold italic py-20">Syncing your products... check back in a minute!</p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
