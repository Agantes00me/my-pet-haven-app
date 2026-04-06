import { supabase } from '../lib/supabase'
import ProductCard from './components/ProductCard'
import CategorySlider from './components/CategorySlider'
import { Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'

// Set revalidation time (e.g., 60 seconds)
export const revalidate = 60

async function getProducts() {
  const { data, error } = await supabase
    .from('shopify_products')
    .select('*')
    .eq('status', 'active')
    .order('updated_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data || []
}

export default async function Home() {
  const products = await getProducts()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28 bg-primary/5 border-b border-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-7xl font-black text-foreground tracking-tighter mb-8 leading-[1] uppercase italic">
              Pawsome products for your <br /> <span className="text-primary italic">best friend</span>
            </h1>
            <p className="text-xl text-foreground/60 mb-12 leading-relaxed font-medium italic max-w-2xl">
              Discover a curated collection of premium accessories, organic treats, and durable toys designed exclusively for your pets' happiness.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <button className="px-10 py-5 bg-primary text-white font-black rounded-3xl shadow-xl shadow-primary/25 hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-3 text-lg uppercase tracking-tighter">
                Shop Collection <ArrowRight className="w-6 h-6" />
              </button>
              <Link href="/who-we-are" className="px-10 py-5 bg-white text-foreground font-black rounded-3xl border border-border hover:bg-muted transition-all text-lg uppercase tracking-tighter italic">
                Our Story
              </Link>
            </div>
          </div>
        </div>
        
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
      </section>

      {/* Category Slider */}
      <CategorySlider />

      {/* Product Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-40">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black text-foreground mb-2">New Arrivals</h2>
            <p className="text-foreground/50 font-medium italic">Hand-picked essentials for the season</p>
          </div>
          <button className="text-primary font-bold flex items-center gap-1 hover:underline underline-offset-4">
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 bg-muted/30 rounded-3xl border-2 border-dashed border-border/50">
            <div className="p-4 bg-white rounded-full shadow-sm mb-4">
              <Sparkles className="w-10 h-10 text-primary opacity-20" />
            </div>
            <p className="text-lg font-bold text-foreground/40">Our shelves are being restocked...</p>
            <p className="text-sm text-foreground/30 mt-1 italic">Check back soon for paw-some deals!</p>
          </div>
        )}
      </section>
    </div>
  )
}
