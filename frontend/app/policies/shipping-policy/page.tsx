import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Truck } from 'lucide-react'

export default function ShippingPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold mb-8 hover:-translate-x-1 transition-transform">
        <ArrowLeft className="w-5 h-5" /> Back to Shop
      </Link>
      
      <div className="flex flex-col items-center text-center mb-16">
        <div className="p-4 bg-primary/10 rounded-full mb-4">
          <Truck className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-foreground mb-4 italic">Shipping Policy</h1>
        <p className="text-foreground/40 font-medium tracking-widest uppercase text-xs">Last Updated: April 1, 2026</p>
      </div>

      <div className="prose prose-slate max-w-none space-y-12 text-foreground/80 leading-relaxed">
        <section>
          <p>
            We strive to ensure a smooth and efficient shipping experience for all our customers. Below are the general conditions of our shipping policy:
          </p>
          <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10 mt-8 space-y-4">
            <h2 className="text-xl font-bold text-foreground uppercase tracking-tight italic">General Shipping Conditions</h2>
            <ul className="list-disc pl-6 space-y-3 font-medium">
              <li><strong>Processing Time:</strong> Orders are typically processed within 1-3 business days. You will receive a confirmation email once your order has shipped.</li>
              <li><strong>Shipping Methods:</strong> We offer several shipping options, including standard and expedited shipping. The available methods will be displayed at checkout.</li>
              <li><strong>Shipping Rates:</strong> Shipping costs are calculated based on the weight and dimensions of your order, as well as your location.</li>
              <li><strong>Delivery Times:</strong> Standard shipping usually takes 5-7 business days. Expedited options are available for quicker delivery.</li>
              <li><strong>Tracking Information:</strong> Once your order has shipped, you will receive an email with tracking information.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black text-foreground mb-6 uppercase tracking-tighter">Product-Specific Shipping Conditions</h2>
          <p>Please note that some products may have unique shipping conditions due to their size, weight, or supplier requirements.</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li><strong>Supplier Variability:</strong> Products sourced from different suppliers may have varying processing and shipping times.</li>
            <li><strong>Combined Shipping:</strong> If your order contains products from multiple suppliers, you may receive separate shipments.</li>
            <li><strong>Oversized Items:</strong> Certain large or heavy items may incur additional shipping fees.</li>
            <li><strong>International Shipping:</strong> We currently offer shipping to select international locations. Additional charges, duties, and taxes may apply.</li>
          </ul>
        </section>

        <section className="bg-muted p-8 rounded-3xl border border-border mt-20 text-center">
          <p className="text-foreground font-black uppercase text-lg mb-2">Need help with your order?</p>
          <p className="font-medium text-foreground/60 mb-4 italic text-sm">For any inquiries regarding shipping, please contact our support team.</p>
          <Link href="/contact" className="text-primary font-bold underline">Contact Support</Link>
        </section>
      </div>
    </div>
  )
}
