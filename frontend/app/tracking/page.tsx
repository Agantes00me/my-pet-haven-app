'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Package, Search, Truck, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react'

export default function TrackingPage() {
  const [orderNumber, setOrderNumber] = useState('')
  const [tracking, setTracking] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Placeholder logic for tracking
    setTimeout(() => {
      setTracking({
        id: orderNumber,
        status: 'shipped',
        lastUpdate: 'Package in transit - Local Distribution Center',
        steps: [
          { status: 'Confirmed', date: 'Oct 12', done: true },
          { status: 'Processed', date: 'Oct 13', done: true },
          { status: 'Shipped', date: 'Oct 14', current: true },
          { status: 'Delivered', date: 'Est Oct 17', pending: true }
        ]
      })
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="flex flex-col items-center text-center mb-16 gap-4">
        <div className="p-4 bg-primary/10 rounded-full mb-2">
          <Package className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-foreground mb-4 italic tracking-tighter uppercase">Track Your Order</h1>
        <p className="text-foreground/50 font-medium max-w-xl italic">Enter your order ID to see exactly where your pet gear is.</p>
      </div>

      <div className="bg-white rounded-[3rem] p-8 sm:p-12 shadow-2xl border border-border/40 mb-12">
        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
           <div className="relative flex-1">
              <Search className="absolute left-4 top-4.5 w-5 h-5 text-foreground/20" />
              <input 
                type="text" 
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="e.g. MPH-123456" 
                className="w-full bg-muted/30 border border-border rounded-full py-5 pl-12 pr-6 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-bold placeholder:italic" 
              />
           </div>
           <button 
             disabled={loading}
             className="px-12 py-5 bg-primary text-white font-black rounded-full shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 text-lg disabled:opacity-50"
           >
             {loading ? 'Locating...' : 'Track Now'} <ArrowRight className="w-5 h-5" />
           </button>
        </form>
      </div>

      {tracking && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] p-8 sm:p-12 shadow-2xl border border-border/40"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
             <div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-foreground/30 italic mb-1">Tracking ID: {tracking.id}</h3>
                <p className="text-2xl font-black text-foreground italic">{tracking.lastUpdate}</p>
             </div>
             <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full text-xs font-black uppercase tracking-widest border border-green-100">
                <Truck className="w-4 h-4" /> In Transit
             </div>
          </div>

          <div className="relative flex flex-col sm:flex-row justify-between items-start gap-8 sm:gap-4 px-4 overflow-hidden">
             {/* Progress Line */}
             <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -translate-y-1/2 hidden sm:block" />
             
             {tracking.steps.map((step: any, idx: number) => (
               <div key={idx} className="relative z-10 flex flex-row sm:flex-col items-center gap-4 sm:gap-2 w-full sm:w-auto">
                  <div className={`p-3 rounded-full border-4 border-white shadow-lg ${step.done ? 'bg-green-500 text-white' : step.current ? 'bg-primary text-white animate-pulse' : 'bg-muted text-foreground/20'}`}>
                     {step.done ? <CheckCircle2 className="w-5 h-5" /> : step.current ? <Package className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                  </div>
                  <div className="text-left sm:text-center">
                     <p className={`text-[10px] font-black uppercase tracking-widest ${step.done || step.current ? 'text-foreground' : 'text-foreground/20'}`}>{step.status}</p>
                     <p className="text-[8px] font-bold text-foreground/30 italic">{step.date}</p>
                  </div>
               </div>
             ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
