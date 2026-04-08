'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Star, Heart, CheckCircle, Info, Truck, RefreshCw, Layers, Shield } from 'lucide-react'
import { supabase } from '../../../lib/supabase'
import { useCart } from '../../../lib/store'


export default function ProductDetail() {
  const { handle } = useParams()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const { addItem } = useCart()

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from('shopify_products')
        .select('*')
        .eq('handle', handle)
        .single()
      
      if (!error && data) setProduct(data)
      setLoading(false)
    }
    fetchProduct()
  }, [handle])

  if (loading) return <div className="min-h-screen flex items-center justify-center text-primary font-bold italic animate-pulse">Fetching your pet haven...</div>
  if (!product) return <div className="min-h-screen flex items-center justify-center text-foreground font-black italic">Oops! Product not found. <Link href="/" className="ml-2 text-primary underline">Go Home</Link></div>

  const images = product.all_images || [{ src: product.image_url }]
  const metafields = product.metafields || { material: 'Pet-safe Premium Material', durability: 'High', washable: 'Yes' }
  const productDescription = product.description_html || '<p>Premium pet haven item. Designed for maximum comfort and joy for your furry friends.</p>'

  const handleAddToCart = () => {
     addItem({
        id: product.id,
        shopify_id: product.shopify_id,
        title: product.title,
        price: product.price,
        image_url: product.image_url
     })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* LEFT: Image Gallery */}
        <div className="space-y-6">
           <div className="relative aspect-square rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl bg-muted/20 group">
              <Image 
                src={images[selectedImage]?.src || product.image_url} 
                alt={product.title} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
              />
           </div>
           
           <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {images.map((img: any, idx: number) => (
                <button 
                  key={idx} 
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-24 h-24 rounded-2xl overflow-hidden border-4 transition-all flex-shrink-0 ${selectedImage === idx ? 'border-primary shadow-lg scale-105' : 'border-white hover:border-primary/20'}`}
                >
                  <Image src={img.src} alt={`${product.title} view ${idx}`} fill className="object-cover" />
                </button>
              ))}
           </div>
        </div>

        {/* RIGHT: Product Details */}
        <div className="space-y-10">
           <div className="space-y-4">
              <div className="flex items-center gap-2">
                 <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                 </div>
                 <span className="text-sm font-bold text-foreground opacity-30 italic">(156 Happy Pets)</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-black text-foreground italic leading-[0.9] tracking-tighter uppercase">{product.title}</h1>
              <p className="text-3xl font-black text-primary">${Number(product.price).toFixed(2)}</p>
           </div>

           {/* Metafields / Attributes Display */}
           <div className="grid grid-cols-3 gap-3">
              <div className="bg-primary/5 p-4 rounded-3xl border border-primary/10 text-center">
                 <Layers className="w-6 h-6 text-primary mx-auto mb-2" />
                 <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40">{metafields.material || 'Material'}</p>
              </div>
              <div className="bg-primary/5 p-4 rounded-3xl border border-primary/10 text-center">
                 <CheckCircle className="w-6 h-6 text-primary mx-auto mb-2" />
                 <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40">{metafields.washable === 'Yes' ? 'Easy Clean' : 'Durable'}</p>
              </div>
              <div className="bg-primary/5 p-4 rounded-3xl border border-primary/10 text-center">
                 <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
                 <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40">Safe To Play</p>
              </div>
           </div>

           {/* Description HTML */}
           <div className="prose prose-slate prose-lg max-w-none text-foreground/70 font-medium italic leading-relaxed" 
                dangerouslySetInnerHTML={{ __html: productDescription }} />

           {/* Subscribe & Save Option */}
           {product.subscription_info && (
              <div className="space-y-4 p-6 bg-primary/5 rounded-[2rem] border-2 border-primary/20">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <RefreshCw className="w-5 h-5 text-primary animate-spin-slow" />
                       <span className="font-black uppercase tracking-tight text-foreground">Subscribe & Save</span>
                    </div>
                    <span className="bg-primary text-white text-[10px] font-black px-2 py-1 rounded-full uppercase">Save 15%</span>
                 </div>
                 <div className="flex gap-4">
                    <button className="flex-1 py-3 bg-white border border-primary/20 rounded-xl text-xs font-bold text-foreground/60 hover:border-primary transition-all">Every month</button>
                    <button className="flex-1 py-3 bg-white border border-primary/20 rounded-xl text-xs font-bold text-foreground/60 hover:border-primary transition-all">Every 2 months</button>
                 </div>
              </div>
           )}

           {/* Actions */}
           <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">

              <button 
                onClick={handleAddToCart}
                className="flex-1 px-12 py-5 bg-primary text-white font-black rounded-full shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all text-xl flex items-center justify-center gap-3"
              >
                 Add to Haven <ShoppingCart className="w-6 h-6" />
              </button>
              <button className="p-5 bg-white border-2 border-border text-foreground/20 hover:text-red-500 hover:border-red-500 rounded-full transition-all">
                <Heart className="w-8 h-8" />
              </button>
           </div>

           {/* Precision Info Badges */}
           <div className="space-y-4 pt-8">
              <div className="flex items-center gap-4 group cursor-help">
                 <div className="p-2 bg-muted rounded-full text-foreground/40 group-hover:text-primary transition-colors"><Truck className="w-4 h-4" /></div>
                 <p className="text-sm font-bold text-foreground/40 uppercase tracking-widest">Global Shipping: <span className="text-foreground">5-7 Days</span></p>
              </div>
              <div className="flex items-center gap-4 group cursor-help">
                 <div className="p-2 bg-muted rounded-full text-foreground/40 group-hover:text-primary transition-colors"><RefreshCw className="w-4 h-4" /></div>
                 <p className="text-sm font-bold text-foreground/40 uppercase tracking-widest">Returns: <span className="text-foreground">30-Day Happiness Guarantee</span></p>
              </div>
           </div>
        </div>
      </div>

      {/* REVIEWS SECTION - Placeholder for Judge.me */}
      <section className="mt-40 pt-20 border-t border-border">
          <div className="flex items-center justify-between mb-16">
             <h2 className="text-5xl font-black text-foreground italic uppercase tracking-tighter">Pet Parents Love It</h2>
             <button className="text-primary font-black underline">Write a Review</button>
          </div>
          <div className="bg-muted/30 p-20 rounded-[3rem] border border-border/60 text-center">
             <Star className="w-16 h-16 text-primary mx-auto mb-6 opacity-20" />
             <p className="text-2xl font-black text-foreground opacity-30 italic uppercase tracking-widest leading-snug">
               Integrating your <br/> Judge.me Reviews...
             </p>
          </div>
      </section>
    </div>
  )
}
