import React from 'react'
import { notFound } from 'next/navigation'
import { categoriesData } from '../../../lib/categories'
import { supabase } from '../../../lib/supabase'
import ProductCard from '../../components/ProductCard'
import { ArrowLeft, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const category = categoriesData[slug as keyof typeof categoriesData]

  if (!category) {
    notFound()
  }

  // Fetch products by type OR tag that matches the category
  const { data: products, error } = await supabase
    .from('shopify_products')
    .select('*')
    .or(`product_type.ilike.%${category.name}%,tags.cs.{${category.name}}`)
    .eq('status', 'active')
    .order('updated_at', { ascending: false })

  return (
    <div className="bg-white min-h-screen">
      {/* Category Hero */}
      <section className={`relative py-32 overflow-hidden ${category.color.split(' ')[0]} bg-opacity-30 border-b border-border/20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-foreground/40 hover:text-primary font-bold mb-12 transition-all group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" /> Back to Store
          </Link>
          
          <div className="max-w-3xl">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${category.color} text-sm font-bold mb-8 uppercase tracking-widest`}>
              <category.icon className="w-4 h-4" />
              <span>{category.name}</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-black text-foreground tracking-tight mb-8 leading-[1.1] italic uppercase">
              {category.headline}
            </h1>
            
            <p className="text-xl text-foreground/70 leading-relaxed font-medium italic pr-12">
              {category.description}
            </p>
          </div>
        </div>
        
        {/* Abstract decoration */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-white opacity-20 rounded-full blur-[120px] pointer-events-none" />
        <category.icon className="absolute bottom-0 right-8 w-64 h-64 opacity-5 text-foreground -mb-12" />
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-center justify-between mb-16 pb-8 border-b border-border/40">
          <h2 className="text-3xl font-black text-foreground flex items-center gap-4">
            Our {category.name} Collection
            <span className="text-foreground/20 italic font-medium text-lg">({products?.length || 0} items)</span>
          </h2>
          <div className="flex items-center gap-3 text-xs font-black text-foreground/40 uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-primary" /> Premium Picks
          </div>
        </div>

        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-40 bg-muted/20 rounded-[3rem] border-2 border-dashed border-border/40">
            <category.icon className="w-16 h-16 text-foreground/10 mx-auto mb-6" />
            <p className="text-xl font-bold text-foreground/40 italic">Coming soon: More {category.name} magic!</p>
            <p className="text-sm text-foreground/30 mt-2">Our team is hand-picking items right now.</p>
          </div>
        )}
      </section>
    </div>
  )
}
