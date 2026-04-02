import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Lock } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold mb-8 hover:-translate-x-1 transition-transform">
        <ArrowLeft className="w-5 h-5" /> Back to Shop
      </Link>
      
      <div className="flex flex-col items-center text-center mb-16">
        <div className="p-4 bg-primary/10 rounded-full mb-4">
          <Lock className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-foreground mb-4 italic">Privacy Policy</h1>
        <p className="text-foreground/40 font-medium tracking-widest uppercase text-xs">Last Updated: April 1, 2026</p>
      </div>

      <div className="prose prose-slate max-w-none space-y-12 text-foreground/80 leading-relaxed">
        <section>
          <p>
            My Pet Haven operates this store and website, including all related information, content, features, tools, products and services, in order to provide you, the customer, with a curated shopping experience (the &quot;Services&quot;). My Pet Haven is powered by Shopify, which enables us to provide the Services to you.
          </p>
          <p>
            This Privacy Policy describes how we collect, use, and disclose your personal information when you visit, use, or make a purchase or other transaction using the Services or otherwise communicate with us.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-foreground mb-6 uppercase tracking-tighter">Personal Information We Collect</h2>
          <p>We may collect or process the following categories of personal information, depending on how you interact with the Services:</p>
          <ul className="list-disc pl-6 space-y-2 font-medium">
            <li>Contact details: Name, address, phone number, and email.</li>
            <li>Financial information: Credit card, debit card, and payment confirmation.</li>
            <li>Account information: Username, password, security questions, and settings.</li>
            <li>Transaction information: Products you view, add to cart, or purchase.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-black text-foreground mb-6 uppercase tracking-tighter">How We Use Your Information</h2>
          <p>We use your personal information to provide you with the Services, including to perform our contract with you, to process your payments, to fulfill your orders, and to remember your preferences.</p>
        </section>

        <section className="bg-primary/5 p-8 rounded-3xl border border-primary/10 mt-20">
          <h2 className="text-xl font-bold text-foreground mb-4 tracking-tighter uppercase italic text-center">Contact Information</h2>
          <div className="flex flex-col gap-2 items-center text-primary font-bold">

            <p>Gauteng, ZA</p>
          </div>
        </section>
      </div>
    </div>
  )
}
