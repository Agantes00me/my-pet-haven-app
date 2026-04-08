'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { categoriesData } from '../../lib/categories'

export default function CategoryGrid() {
  return (
    <section className="bg-white py-24 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-foreground italic tracking-tighter mb-4 uppercase">Explore Our World</h2>
          <p className="text-foreground/50 font-medium max-w-xl mx-auto italic">Browse our hand-curated collections designed for every pet personality.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {Object.entries(categoriesData).map(([slug, cat]) => (
            <Link 
              key={slug} 
              href={`/category/${slug}`}
              className="group relative bg-muted/30 rounded-[2.5rem] p-8 hover:bg-white hover:shadow-2xl hover:shadow-primary/10 border border-transparent hover:border-border/60 transition-all duration-500 overflow-hidden"
            >
              <div className="flex flex-col gap-6 relative z-10">
                <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                  <cat.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-foreground/40 mb-2 uppercase tracking-widest flex items-center gap-2">
                    {cat.name}
                  </h3>
                  <p className="text-2xl font-black text-foreground mb-4 leading-tight italic tracking-tighter uppercase group-hover:text-primary transition-colors">
                    {cat.headline}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-black text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    Discover Collection <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
              
              {/* Abstract hover background decoration */}
              <div className={`absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none ${cat.color}`} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
