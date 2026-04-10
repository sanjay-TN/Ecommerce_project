import { ArrowRight, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] bg-hero-gradient px-6 py-10 text-white shadow-glow lg:px-10 lg:py-12">
      <div className="absolute -left-10 top-10 h-32 w-32 animate-pulseSoft rounded-full bg-brand-yellow/30 blur-3xl" />
      <div className="absolute right-0 top-0 h-52 w-52 animate-float rounded-full bg-brand-sky/30 blur-3xl" />
      <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="section-kicker text-white/70">Next-gen storefront</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-black leading-tight lg:text-6xl">
            Shop bold launches, standout deals and cleaner product discovery.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/80 lg:text-base">
            A brighter Flipkart-inspired shopping experience with smarter browsing, smoother checkout, and a dashboard-ready commerce foundation.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/" className="rounded-2xl bg-brand-yellow px-6 py-3 font-semibold text-brand-ink shadow-lg">
              Explore products
            </Link>
            <Link to="/admin" className="rounded-2xl border border-white/25 px-6 py-3 font-semibold text-white">
              Open admin
            </Link>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { icon: Truck, label: "Fast delivery" },
              { icon: ShieldCheck, label: "Secure checkout" },
              { icon: Sparkles, label: "Fresh daily deals" }
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4 backdrop-blur">
                <Icon size={18} className="text-brand-yellow" />
                <p className="mt-3 text-sm font-semibold">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="glass-panel animate-float rounded-[2rem] p-5 text-brand-ink">
            <p className="text-sm font-bold uppercase tracking-[0.32em] text-brand-blue/60">Today&apos;s picks</p>
            <div className="mt-4 space-y-3">
              {[
                { label: "Mobiles", detail: "From Rs. 9,999" },
                { label: "Headphones", detail: "Weekend launch prices" },
                { label: "Fashion", detail: "Up to 70% off" }
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <div>
                    <p className="font-semibold">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.detail}</p>
                  </div>
                  <ArrowRight size={18} className="text-brand-blue" />
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.28em] text-white/65">This week</p>
            <p className="mt-3 text-3xl font-black">1,200+ curated products</p>
            <p className="mt-2 text-sm text-white/75">Ready for search, sort, reviews, cart, wishlist and checkout.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
