import React from 'react'
import Link from 'next/link'
import { ArrowLeft, RefreshCw } from 'lucide-react'

export default function RefundPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold mb-8 hover:-translate-x-1 transition-transform">
        <ArrowLeft className="w-5 h-5" /> Back to Shop
      </Link>
      
      <div className="flex flex-col items-center text-center mb-16">
        <div className="p-4 bg-primary/10 rounded-full mb-4">
          <RefreshCw className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-foreground mb-4 italic leading-tight">Return and Refund Policy</h1>
        <p className="text-foreground/40 font-medium tracking-widest uppercase text-xs">Last Updated: April 1, 2026</p>
      </div>

      <div className="prose prose-slate max-w-none space-y-12 text-foreground/80 leading-relaxed">
        <section>
          <h2 className="text-2xl font-black text-foreground mb-6 uppercase tracking-tighter">Refund Rules Summary</h2>
          <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10 mt-8 space-y-4">
            <ul className="list-disc pl-6 space-y-3 font-medium">
              <li><strong>Returns:</strong> Accepted for 30 days.</li>
              <li><strong>Shipping Cost:</strong> Customer provides return shipping.</li>
              <li><strong>Restocking Fee:</strong> No restocking fee.</li>
              <li><strong>Final Sale Items:</strong> No final sale items.</li>
            </ul>
          </div>
        </section>

        <section>
          <p>
            We have a 30-day return policy, which means you have 30 days after receiving your item to request a return.
          </p>
          <p>
            Since we value you as a client and care for your pet, we will consider a refund based on the following conditions and reasons. The shipping cost to return a product often outweighs the value of the product, and the time it takes to get a replacement is usually not worth it either.
          </p>
          <p>
            As your Pet Shop of Choice, we would therefore rather refund you based on the following: Please provide pictures and a detailed description of why the product does not meet your expectations. Based on this information, we can then make a well-informed decision on the refund amount.
          </p>
          <p>
            With such a strategy in place, we trust that you will feel protected and cared for should such an unfortunate event arise. This approach not only resolves the matter in a timely manner, but also allows us to guide you toward products that might be more suited to your preferences.
          </p>
        </section>

        <section className="bg-muted p-8 rounded-3xl border border-border mt-20 text-center">
          <p className="text-foreground font-black uppercase text-lg mb-2">Need a refund?</p>
          <p className="font-medium text-foreground/60 mb-4 italic text-sm">Please send your pictures and description to our support team.</p>
          <Link href="/contact" className="text-primary font-bold underline">Contact Support</Link>
        </section>
      </div>
    </div>
  )
}
