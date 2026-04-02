import React from 'react'
import Link from 'next/link'
import { ArrowLeft, ShieldCheck } from 'lucide-react'

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold mb-8 hover:-translate-x-1 transition-transform">
        <ArrowLeft className="w-5 h-5" /> Back to Shop
      </Link>
      
      <div className="flex flex-col items-center text-center mb-16">
        <div className="p-4 bg-primary/10 rounded-full mb-4">
          <ShieldCheck className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-foreground mb-4 italic">Terms of Service</h1>
        <p className="text-foreground/40 font-medium tracking-widest uppercase text-xs">Last Updated: April 1, 2026</p>
      </div>

      <div className="prose prose-slate max-w-none space-y-12 text-foreground/80 leading-relaxed">
        <section>
          <h2 className="text-2xl font-black text-foreground mb-6 uppercase tracking-tighter">OVERVIEW</h2>
          <p>
            Welcome to My Pet Haven! The terms &quot;we&quot;, &quot;us&quot; and &quot;our&quot; refer to My Pet Haven. My Pet Haven operates this store and website, including all related information, content, features, tools, products and services in order to provide you, the customer, with a curated shopping experience (the &quot;Services&quot;). My Pet Haven is powered by Shopify, which enables us to provide the Services to you.
          </p>
          <p>
            The below terms and conditions, together with any policies referenced herein (these &quot;Terms of Service&quot; or &quot;Terms&quot;) describe your rights and responsibilities when you use the Services.
          </p>
          <p>
            Please read these Terms of Service carefully, as they include important information about your legal rights and cover areas such as warranty disclaimers and limitations of liability.
          </p>
          <p>
            By visiting, interacting with or using our Services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these Terms of Service or Privacy Policy, you should not use or access our Services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">SECTION 1 - ACCESS AND ACCOUNT</h2>
          <p>
            By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, and you have given us your consent to allow any of your minor dependents to use the Services on devices you own, purchase or manage.
          </p>
          <p>
            To use the Services, including accessing or browsing our online stores or purchasing any of the products or services we offer, you may be asked to provide certain information, such as your email address, billing, payment, and shipping information. You represent and warrant that all the information you provide in our stores is correct, current and complete and that you have all rights necessary to provide this information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">SECTION 2 - OUR PRODUCTS</h2>
          <p>
            We have made every effort to provide an accurate representation of our products and services in our online stores. However, please note that colors or product appearance may differ from how they may appear on your screen due to the type of device you use to access the store and your device settings and configuration.
          </p>
          <p>
            We do not warrant that the appearance or quality of any products or services purchased by you will meet your expectations or be the same as depicted or rendered in our online stores.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">SECTION 3 - ORDERS</h2>
          <p>
            When you place an order, you are making an offer to purchase. My Pet Haven reserves the right to accept or decline your order for any reason at its discretion. Your order is not accepted until My Pet Haven confirms acceptance. We must receive and process your payment before your order is accepted.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">SECTION 4 - PRICES AND BILLING</h2>
          <p>
            Prices, discounts and promotions are subject to change without notice. The price charged for a product or service will be the price in effect at the time the order is placed and will be set out in your order confirmation email.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">SECTION 5 - SHIPPING AND DELIVERY</h2>
          <p>
            We are not liable for shipping and delivery delays. All delivery times are estimates only and are not guaranteed. We are not responsible for delays caused by shipping carriers, customs processing, or events outside our control. Once we transfer products to the carrier, title and risk of loss passes to you.
          </p>
        </section>

        <section className="bg-primary/5 p-8 rounded-3xl border border-primary/10 mt-20">
          <h2 className="text-xl font-bold text-foreground mb-4 tracking-tighter uppercase italic">SECTION 25 - CONTACT INFORMATION</h2>
          <p className="font-medium text-foreground italic mb-4 text-lg">Questions about the Terms of Service should be sent to us at:</p>
          <div className="flex flex-col gap-2 text-primary font-bold">
            <p>The Pet Haven</p>

            <p>Address: Gauteng, South Africa</p>
            <p>Phone: Available upon request</p>
          </div>
        </section>
      </div>
    </div>
  )
}
