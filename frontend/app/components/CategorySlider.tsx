'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { categoriesData } from '../../lib/categories'
import Image from 'next/image'

export default function CategorySlider() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -400, behavior: 'smooth' })
    }
  }
  
  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 400, behavior: 'smooth' })
    }
  }

  return (
    <section className="bg-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl font-black text-foreground italic uppercase tracking-tighter mb-4">Explore Our World</h2>
            <p className="text-foreground/50 font-medium italic">Shop by collections designed for every pet personality</p>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <button 
              onClick={scrollLeft}
              className="p-4 bg-muted hover:bg-primary/10 hover:text-primary rounded-full transition-all border border-border"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={scrollRight}
              className="p-4 bg-muted hover:bg-primary/10 hover:text-primary rounded-full transition-all border border-border"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Slider Container */}
      <div 
        ref={containerRef}
        className="flex gap-8 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-[max(1rem,calc((100vw-80rem)/2))] pb-12 snap-x"
      >
        {Object.entries(categoriesData).map(([slug, cat]) => (
          <motion.div 
            key={slug} 
            className="flex-shrink-0 w-[85vw] sm:w-[450px] snap-center group"
          >
            <Link href={`/category/${slug}`} className="block relative h-[600px] rounded-[3rem] overflow-hidden bg-muted shadow-xl shadow-primary/5 group-hover:shadow-2xl group-hover:shadow-primary/10 transition-all duration-500">
              <Image 
                src={cat.image} 
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-[0.85] group-hover:brightness-100"
              />
              
              {/* Content Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent text-white flex flex-col justify-end h-1/2">
                <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <cat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-3">{cat.name}</h3>
                <h4 className="text-3xl font-black italic uppercase tracking-tighter mb-4 leading-tight">
                  {cat.headline}
                </h4>
                <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  Shop Collection <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
