'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, HelpCircle } from 'lucide-react'

const FAQS = [
  {
    question: "How long does shipping take?",
    answer: "For our target markets (USA, Canada, UK, SA, AUS, NZ), shipping typically takes 5-7 business days if items are in stock locally. Global shipping may take 10-15 days."
  },
  {
    question: "Do you ship from China?",
    answer: "We prioritize local fulfillment. For example, USA orders are shipped from USA warehouses whenever possible. We only utilize global partners if a product is not available locally for your region."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is processed, you will receive an email with a tracking number. You can also visit our Order Tracking page to see live updates."
  },
  {
    question: "What is AutoDS fulfillment?",
    answer: "We use high-precision AutoDS technology to monitor price, inventory, and fulfillment. This ensures your products are always in stock and delivered with precision."
  },
  {
    question: "Do you offer subscriptions?",
    answer: "Yes! Many of our essentials offer a 'Subscribe & Save' option. You can manage your pet's recurring needs directly from your customer account."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="flex flex-col items-center text-center mb-20 gap-4">
        <div className="p-4 bg-primary/10 rounded-full mb-2">
          <HelpCircle className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-foreground mb-4 italic tracking-tighter">F.A.Q</h1>
        <p className="text-foreground/50 font-medium max-w-xl italic">Everything you need to know about your Pet Haven experience.</p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, idx) => (
          <div key={idx} className="bg-white rounded-3xl border border-border/40 overflow-hidden transition-all shadow-sm hover:shadow-md hover:border-primary/20">
            <button 
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex items-center justify-between p-6 sm:p-8 text-left"
            >
              <span className="text-lg font-black text-foreground italic">{faq.question}</span>
              <div className="p-2 bg-muted rounded-full">
                {openIndex === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </div>
            </button>
            <AnimatePresence>
              {openIndex === idx && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-6 sm:px-8 sm:pb-8 text-foreground/50 font-medium leading-relaxed italic"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}
