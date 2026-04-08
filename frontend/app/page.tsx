import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ShoppingBag, Sparkles } from 'lucide-react'
import CategorySlider from './components/CategorySlider'
import CategoryGrid from './components/CategoryGrid'
import ProductCard from './components/ProductCard'
import { supabase } from '../lib/supabase'

export default async function Page() {
  const { data: products } = await supabase
    .from('shopify_products')
    .select('*')
    .eq('status', 'active')
    .limit(4)

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-[#FFF9F5] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary blur-[100px] rounded-full animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent blur-[100px] rounded-full animate-pulse delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-black uppercase tracking-widest text-[10px] mb-8">
                <Sparkles className="w-4 h-4" /> Premium Pet Haven
              </div>
              <h1 className="text-5xl sm:text-7xl font-black text-foreground mb-8 tracking-tighter italic leading-[0.9] uppercase">
                Creating <span className="text-primary italic">Joy</span> <br /> For Your <br /> Furry Friends.
              </h1>
              <p className="text-lg text-foreground/50 font-medium mb-10 max-w-xl leading-relaxed italic mx-auto lg:mx-0 pr-4">
                Discover curated collections designed for comfort, adventure, and happiness. Loved by pet parents worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/category/adventure" className="px-10 py-4 bg-primary text-white font-black rounded-full shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all text-lg flex items-center justify-center gap-3">
                  Shop Adventure <ShoppingBag className="w-5 h-5" />
                </Link>
                <Link href="/who-we-are" className="px-10 py-4 bg-white border-2 border-border text-foreground font-black rounded-full hover:bg-muted transition-all text-lg flex items-center justify-center gap-3">
                  Our Story <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* FIXED IMAGE CONTAINER */}
            <div className="relative w-full h-[400px] lg:h-[600px]">
              <div className="absolute inset-0 bg-primary/10 rounded-[3rem] rotate-6 scale-95" />
              <div className="absolute inset-0 bg-white rounded-[3rem] shadow-2xl overflow-hidden border-8 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1541781751897-40089851675a?q=80&w=1200&auto=format&fit=crop"
                  alt="Happy Pet"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Slider */}
      <CategorySlider />

      {/* Featured Products */}
      <section className="py-24 bg-[#FAFBFF]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-3 italic tracking-tighter uppercase">Our Top Picks</h2>
              <p className="text-foreground/40 font-bold italic tracking-tighter uppercase text-[10px]">Verified Quality & Comfort</p>
            </div>
            <Link href="/category/all" className="text-primary font-black flex items-center gap-2 group text-sm uppercase italic tracking-widest">
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {(!products || products.length === 0) && (
              <p className="col-span-4 text-center text-foreground/30 font-bold italic py-20">Syncing your products... check back soon!</p>
            )}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <CategoryGrid />
    </div>
  )
}