import React from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react'

export default function Contact() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="flex flex-col items-center text-center mb-20 gap-4">
        <div className="p-4 bg-primary/10 rounded-full mb-2">
          <MessageCircle className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-foreground mb-4 italic tracking-tighter">Get in Touch</h1>
        <p className="text-foreground/50 font-medium max-w-xl italic">Have a question about a product or order? Our pet-loving team is here to help you and your furry friends!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-primary/5 hover:shadow-primary/10 transition-all border border-border/40 group">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-2xl text-primary group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-black uppercase tracking-widest text-xs text-foreground/40">Email Us</h3>
            </div>
            <p className="text-lg font-bold text-foreground">chris.cmulder@gmail.com</p>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-primary/5 hover:shadow-primary/10 transition-all border border-border/40 group">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-2xl text-primary group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-black uppercase tracking-widest text-xs text-foreground/40">Our Haven</h3>
            </div>
            <p className="text-lg font-bold text-foreground leading-snug">Potchefstroom, North West,<br/>South Africa, 2531</p>
          </div>

        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white rounded-[3rem] p-8 sm:p-12 shadow-2xl border border-border hover:border-primary/20 transition-all">
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-foreground/40 ml-4">Full Name</label>
                <input type="text" placeholder="Your name" className="w-full bg-muted/30 border border-border rounded-full py-4 px-6 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-foreground/40 ml-4">Email Address</label>
                <input type="email" placeholder="hello@petowner.com" className="w-full bg-muted/30 border border-border rounded-full py-4 px-6 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-foreground/40 ml-4">How can we help?</label>
              <textarea rows={5} placeholder="Tell us about your pet's needs..." className="w-full bg-muted/30 border border-border rounded-3xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"></textarea>
            </div>
            <button type="submit" className="w-full sm:w-auto px-12 py-5 bg-primary text-white font-black rounded-full shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
              Send Message <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
