import { Facebook, Instagram, Linkedin, ShieldCheck, Truck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/50 bg-brand-ink py-14 text-slate-300">
      <div className="container-shell grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.9fr]">
        <div>
          <p className="section-kicker text-white/55">Storefront</p>
          <h3 className="mt-3 text-2xl font-black text-white">Flipkart Clone Store</h3>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
            A production-style commerce experience designed for product discovery, secure checkout, and dependable order management.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80">
              <span className="inline-flex items-center gap-2"><ShieldCheck size={14} /> Secure payments</span>
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80">
              <span className="inline-flex items-center gap-2"><Truck size={14} /> Fast delivery updates</span>
            </span>
          </div>
        </div>

        <div>
          <p className="section-kicker text-white/55">Company</p>
          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <p>About Us</p>
            <p>Careers</p>
            <p>Press Room</p>
            <p>Corporate Information</p>
          </div>
        </div>

        <div>
          <p className="section-kicker text-white/55">Help</p>
          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <p>Payments</p>
            <p>Shipping</p>
            <p>Cancellation & Returns</p>
            <p>Customer Support</p>
          </div>
        </div>

        <div>
          <p className="section-kicker text-white/55">Connect</p>
          <div className="mt-4 flex gap-3">
            {[Facebook, Instagram, Linkedin].map((Icon, index) => (
              <span key={index} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white/80">
                <Icon size={18} />
              </span>
            ))}
          </div>
          <p className="mt-5 text-sm leading-6 text-slate-400">
            Built with React, Tailwind CSS, Spring Boot, JWT, and MySQL for a realistic full-stack commerce workflow.
          </p>
        </div>
      </div>

      <div className="container-shell mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>© 2026 Flipkart Clone Store. All rights reserved.</p>
        <p>Terms of Use • Privacy Policy • Security</p>
      </div>
    </footer>
  );
}
