'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PawPrint, Heart, Zap, Shield, ChevronRight, RefreshCcw, ShoppingBag, Save } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '../../lib/supabase'

const QUESTIONS = [
  {
    id: 'type',
    question: "Is your best friend a...",
    options: [
      { value: 'dog', label: 'Dog', icon: '🐶' },
      { value: 'cat', label: 'Cat', icon: '🐱' },
      { value: 'other', label: 'Other', icon: '🐹' },
    ]
  },
  {
    id: 'energy',
    question: "What's their energy level?",
    options: [
      { value: 'low', label: 'Couch Potato', icon: '💤' },
      { value: 'medium', label: 'Playful', icon: '🎾' },
      { value: 'high', label: 'Zoomies Master', icon: '⚡' },
    ]
  },
  {
    id: 'style',
    question: "How do they play?",
    options: [
      { value: 'soft', label: 'Gentle Cuddler', icon: '🧸' },
      { value: 'thinker', label: 'The Thinker', icon: '🧩' },
      { value: 'destructor', label: 'The Destroyer', icon: '🦷' },
    ]
  }
]


export default function PetQuiz() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isFinished, setIsFinished] = useState(false)
  const [saving, setSaving] = useState(false)

  const saveProfile = async () => {
    setSaving(true)
    const { error } = await supabase
      .from('pet_profiles')
      .insert([{
        shopify_customer_id: 'guest_user', // Placeholder until Auth is ready
        pet_type: answers.type,
        energy_level: answers.energy,
        play_style: answers.style,
        preferences: answers
      }])
    setSaving(false)
    if (!error) alert('🐾 Profile saved to your Haven!')
  }

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [QUESTIONS[step].id]: value }
    setAnswers(newAnswers)
    
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1)
    } else {
      setIsFinished(true)
    }
  }


  const resetQuiz = () => {
    setStep(0)
    setAnswers({})
    setIsFinished(false)
  }

  return (
    <div className="min-h-screen bg-theme py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-[3rem] p-8 sm:p-16 shadow-2xl border border-border/40 text-center"
            >
              <div className="flex justify-center mb-8">
                <div className="flex gap-2">
                  {QUESTIONS.map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-2 rounded-full transition-all duration-500 ${i === step ? 'w-12 bg-primary' : 'w-4 bg-muted'}`} 
                    />
                  ))}
                </div>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-12 italic tracking-tighter">
                {QUESTIONS[step].question}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {QUESTIONS[step].options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className="group bg-muted/30 hover:bg-white hover:shadow-xl hover:shadow-primary/10 border border-border rounded-3xl p-8 transition-all duration-300 transform hover:-translate-y-2 active:scale-95"
                  >
                    <span className="text-5xl mb-4 block group-hover:scale-110 transition-transform">{option.icon}</span>
                    <span className="font-black uppercase tracking-widest text-xs text-foreground/60">{option.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[3rem] p-8 sm:p-16 shadow-2xl border border-border/40 text-center"
            >
              <div className="p-6 bg-primary/10 rounded-full w-24 h-24 mx-auto mb-8 flex items-center justify-center">
                <Heart className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-foreground mb-4 italic tracking-tighter">Personality Match!</h1>
              <p className="text-foreground/50 font-medium mb-12 italic">
                Based on your pet&apos;s zoomies and chewing style, we&apos;ve curated a special collection just for them.
              </p>

              <div className="grid grid-cols-1 gap-4 mb-12">
                 <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10 flex items-center justify-between group cursor-pointer hover:bg-primary/10 transition-colors">
                    <div className="flex items-center gap-4 text-left">
                       <Zap className="w-8 h-8 text-primary" />
                       <div>
                          <h4 className="font-black text-foreground uppercase tracking-tight">Interactive Zoomie Toys</h4>
                          <p className="text-xs text-foreground/40 font-bold">Matching your &quot;Zoomies Master&quot; style</p>
                       </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-primary group-hover:translate-x-2 transition-transform" />
                 </div>
              </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                   <Link href="/" className="px-12 py-5 bg-primary text-white font-black rounded-full shadow-xl shadow-primary/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all">
                     Shop Matches <ShoppingBag className="w-5 h-5" />
                   </Link>
                   <button 
                     onClick={saveProfile} 
                     disabled={saving}
                     className="px-12 py-5 bg-white border-2 border-primary/20 text-primary font-black rounded-full flex items-center justify-center gap-2 hover:bg-primary/5 transition-all disabled:opacity-50"
                   >
                     {saving ? 'Saving...' : 'Save to Profile'} <Save className="w-5 h-5" />
                   </button>
                   <button onClick={resetQuiz} className="px-12 py-5 bg-muted text-foreground/40 font-black rounded-full flex items-center justify-center gap-2 hover:bg-muted/80 transition-all text-xs">
                     Retry Quiz <RefreshCcw className="w-4 h-4" />
                   </button>
                </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
