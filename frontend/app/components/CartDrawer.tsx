'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, Minus, Plus, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import { useCart, CartItem } from '../../lib/store'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, getTotal } = useCart()
  const total = getTotal()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[99]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[100] flex flex-col"
          >
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
                <ShoppingBag className="w-5 h-5 text-primary" /> Your Cart
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-muted rounded-full">
                <X className="w-6 h-6 border-2 border-primary rounded-full p-1" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="bg-primary/10 p-6 rounded-full mb-4">
                    <ShoppingBag className="w-12 h-12 text-primary opacity-40" />
                  </div>
                  <p className="text-lg font-bold text-foreground opacity-50 italic">Your cart is empty!</p>
                  <button onClick={onClose} className="mt-4 text-primary font-bold underline">Start Shopping</button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item: CartItem) => (
                    <div key={item.id} className="flex gap-4 items-start group">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-muted flex-shrink-0 border border-border/10">
                        <Image src={item.image_url} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold leading-tight line-clamp-1 mb-1">{item.title}</h3>
                        <p className="text-primary font-black mb-2">${Number(item.price).toFixed(2)}</p>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-border rounded-lg bg-muted/30">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-primary">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-primary">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-foreground/20 hover:text-red-500 transition-colors p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-border bg-muted/5">
              <div className="mb-6 space-y-3">
                 <label className="text-[10px] font-black uppercase tracking-widest text-foreground/30 ml-2 italic">Have a promo code?</label>
                 <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="e.g. PUPPYLOVE" 
                      className="flex-1 bg-white border border-border/60 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-bold placeholder:font-normal placeholder:opacity-30" 
                    />
                    <button className="bg-muted px-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">Apply</button>
                 </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-foreground/50 font-medium italic">Estimated Total</span>
                <span className="text-2xl font-black text-primary">${total.toFixed(2)}</span>
              </div>

              <div className="flex flex-col gap-3">
                <button className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
                  Pay with PayFast
                </button>
                <button className="w-full py-4 bg-[#0070ba] text-white font-bold rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
                   PayPal Checkout
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
