import React, { Suspense } from 'react'
import { supabase } from '../../lib/supabase'
import ProductCard from '../components/ProductCard'
import { Search as SearchIcon, Sparkles } from 'lucide-react'

async function performSearch(query: string) {
  if (!query) return []

  const { data, error } = await supabase
    .from('shopify_products')
    .select('*')
    .textSearch('title', query.split(' ').join(' | '))
    .eq('status', 'active')

  if (error) {
    console.error('Search error:', error)
    return []
  }

  return data || []
}

export default async function SearchPage(props: {
  searchParams: Promise<{ q?: string }>
}) {
  const searchParams = await props.searchParams
  const query = searchParams.q || ''
  const results = await performSearch(query)

  return (
    <div className="bg-white min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 mb-16 pb-8 border-b border-border/40">
          <h1 className="text-4xl sm:text-5xl font-black text-foreground italic uppercase tracking-tighter">
            {query ? `Search: "${query}"` : 'Search Our Collections'}
          </h1>
          <p className="text-foreground/30 font-bold italic text-lg uppercase tracking-widest">
            {results.length} results found
          </p>
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-40 bg-muted/20 rounded-[3rem] border-2 border-dashed border-border/40">
            <SearchIcon className="w-16 h-16 text-foreground/10 mx-auto mb-6" />
            <p className="text-xl font-bold text-foreground/40 italic">
              {query ? "We couldn't find exactly that..." : "What are you looking for today?"}
            </p>
            <p className="text-sm text-foreground/30 mt-2">Try searching for "dog", "eco", or "Smart Tech".</p>
          </div>
        )}
        
        {/* Abstract decoration */}
        <div className="fixed bottom-0 right-0 p-12 pointer-events-none opacity-5">
           <Sparkles className="w-64 h-64 text-primary" />
        </div>
      </div>
    </div>
  )
}
