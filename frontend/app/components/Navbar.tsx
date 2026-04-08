'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ShoppingCart, User, Menu, Search, Truck, PawPrint, X } from 'lucide-react'
import { categoriesData } from '../../lib/categories'
import { useCart } from '../../lib/store'
import CartDrawer from './CartDrawer'

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [market, setMarket] = useState('ZA')
  const [itemsCount, setItemsCount] = useState(0)
  const { items } = useCart()
  const router = useRouter()

  const markets = [
    { code: 'ZA', label: 'South Africa', icon: '🇿🇦' },
    { code: 'USA', label: 'United States', icon: '🇺🇸' },
    { code: 'CAN', label: 'Canada', icon: '🇨🇦' },
    { code: 'UK', label: 'United Kingdom', icon: '🇬🇧' },
    { code: 'AUS', label: 'Australia', icon: '🇦🇺' },
    { code: 'NZ', label: 'New Zealand', icon: '🇳🇿' }
  ]

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    setItemsCount(items.reduce((acc, i) => acc + i.quantity, 0))
  }, [items])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-border transition-all duration-300">
        {/* Main Nav */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <PawPrint className="w-8 h-8 text-primary" />
                </div>
                <span className="text-2xl font-bold text-foreground tracking-tight">
                  MyPet<span className="text-primary tracking-tighter">Haven</span>
                </span>
              </Link>
            </div>

            {/* Sub-Nav Categories (Desktop) */}
            <div className="hidden lg:flex items-center gap-12 font-black uppercase tracking-widest text-[10px] px-8 border-x border-border/40 mx-4">
              <Link href="/who-we-are" className="text-primary hover:text-primary/70 transition-colors italic whitespace-nowrap decoration-2 underline underline-offset-4 decoration-primary/20">
                Who We Are
              </Link>
              {Object.entries(categoriesData).slice(0, 4).map(([slug, cat]) => (
                <Link key={slug} href={`/category/${slug}`} className="text-foreground/40 hover:text-primary transition-colors italic whitespace-nowrap">
                  {cat.name}
                </Link>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center gap-2 sm:gap-3 text-foreground/70">
              {/* Search Toggle */}
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <Search className="w-6 h-6" />
              </button>

              <Link href="/tracking" className="hidden sm:flex items-center gap-2 group hover:text-primary transition-colors px-3 py-1.5 bg-gray-100 rounded-full border border-gray-200">
                <Truck className="w-4 h-4 text-gray-500" />
                <span className="text-[10px] font-black uppercase tracking-widest italic text-gray-500 group-hover:text-primary">Track</span>
              </Link>

              {/* Market Selector */}
              <div className="hidden lg:flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full border border-border/40 hover:bg-muted transition-all cursor-pointer group relative">
                <span className="text-xs font-black uppercase tracking-tight flex items-center gap-2 italic">
                   {markets.find(m => m.code === market)?.icon} {market}
                </span>
                
                {/* Simple Dropdown Overlay (Visual Placeholder) */}
                <div className="absolute top-10 right-0 w-48 bg-white border border-border rounded-2xl shadow-xl p-2 hidden group-hover:block animate-in fade-in slide-in-from-top-2 duration-300">
                   {markets.map(m => (
                      <button key={m.code} onClick={() => setMarket(m.code)} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-primary/5 rounded-xl text-[10px] font-black uppercase tracking-tight text-foreground/60 hover:text-primary transition-all">
                         {m.icon} {m.label}
                      </button>
                   ))}
                </div>
              </div>

              <button 
                onClick={() => setIsCartOpen(true)}
                className="p-2 hover:bg-muted rounded-full transition-colors relative"
              >
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white tabular-nums">
                  {itemsCount}
                </span>
              </button>
              <Link href="/login" className="p-2 hover:bg-muted rounded-full transition-colors">
                <User className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>

        {/* Categories (Mobile Sub-Nav) */}
        <div className="lg:hidden border-t border-border bg-white px-4 py-3 flex gap-6 overflow-x-auto scrollbar-hide whitespace-nowrap">
           {['Adventure', 'Anxiety', 'Eco-Friendly', 'Grooming', 'Smart Tech', 'Toys'].map((cat) => (
             <Link key={cat} href="/" className="text-[10px] font-black uppercase tracking-widest text-foreground/40 hover:text-primary transition-all">
               {cat}
             </Link>
           ))}
        </div>
      </nav>

      {/* Global Search Overlay */}
      <div className={`fixed inset-x-0 top-0 z-[60] bg-white/95 backdrop-blur-xl border-b border-border transition-all duration-500 ${isSearchOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-4 h-24 flex items-center gap-4">
          <Search className="w-6 h-6 text-primary" />
          <form onSubmit={handleSearch} className="flex-1">
            <input 
              autoFocus={isSearchOpen}
              type="text" 
              placeholder="Search for toys, treats, or gear..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none focus:ring-0 text-xl font-black italic uppercase tracking-tighter placeholder:text-foreground/10"
            />
          </form>
          <button onClick={() => setIsSearchOpen(false)} className="p-2 hover:bg-muted rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}

