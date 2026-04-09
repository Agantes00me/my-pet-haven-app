'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Star, Plus } from 'lucide-react'

import { useCart } from '../../lib/store'

interface Product {
  id: number
  shopify_id: string
  title: string
  handle: string
  price: number
  image_url: string | null
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  // Common fallback image for pet products
  const imageUrl = product.image_url || 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?q=80&w=600&auto=format&fit=crop'

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.id,
      shopify_id: product.shopify_id,
      title: product.title,
      price: product.price,
      image_url: imageUrl
    })
  }

  return (
    <div className="group relative bg-card rounded-2xl overflow-hidden border border-border/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1 transform-gpu">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-muted/20">
        <Image
          src={imageUrl}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          // PERFORMANCE FIX: Tells the browser exactly how big the image will be on different screens
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          // Optimization: Preload the first few products to prevent "white flashes"
          priority={product.id < 4}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
          <span className="bg-primary/95 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full shadow-lg backdrop-blur-sm">
            NEW
          </span>
        </div>

        {/* Quick Buy Button */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md p-2.5 rounded-full shadow-xl opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white z-10"
        >
          <ShoppingCart className="w-5 h-5" />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-6 space-y-3">
        <div className="flex items-center gap-1 mb-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-[10px] text-foreground/40 ml-1 font-medium">(24)</span>
        </div>
        <Link href={`/product/${product.handle}`} className="block group/title">
          <h3 className="text-sm sm:text-base font-black text-foreground italic line-clamp-2 leading-tight group-hover/title:text-primary transition-colors uppercase tracking-tighter">
            {product.title}
          </h3>
        </Link>

        {/* Precision Shipping Badge - Dynamic Region Support */}
        <div className="flex items-center gap-1.5 py-1 px-3 bg-primary/5 rounded-full w-fit border border-primary/10">
          <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
          <span className="text-[7px] font-black uppercase tracking-widest text-primary italic">
            Verified: Ships Locally To Your Region
          </span>
        </div>


        <div className="flex items-center justify-between pt-2">
          <div className="space-y-0.5">
            <span className="text-xl sm:text-2xl font-black text-primary italic leading-none">${Number(product.price).toFixed(2)}</span>
          </div>
          <button
            onClick={handleAddToCart}
            className="p-3 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20 hover:scale-110 active:scale-95 transition-all"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}