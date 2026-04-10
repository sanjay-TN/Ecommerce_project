import { Heart, LogOut, Search, ShoppingCart, Sparkles, User } from "lucide-react";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useShop } from "../../context/ShopContext";

export default function Navbar() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get("search") || "");
  const { user, logout } = useAuth();
  const { cart, wishlist } = useShop();

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(query ? `/?search=${encodeURIComponent(query)}` : "/");
  };

  const navClass = ({ isActive }) =>
    `rounded-full px-4 py-2 transition ${isActive ? "bg-white text-brand-ink" : "text-white/75 hover:bg-white/10 hover:text-white"}`;

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-brand-ink/90 text-white shadow-lg backdrop-blur-xl">
      <div className="container-shell py-4">
        <div className="mb-4 hidden items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70 lg:flex">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-brand-yellow" />
            <span>Curated deals, fast discovery, and a more premium storefront</span>
          </div>
          <span>React frontend with a Spring Boot commerce backend</span>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-3 text-xl font-extrabold">
              <span className="rounded-2xl bg-brand-yellow px-3 py-2 font-display text-brand-ink shadow-lg">Flipkart</span>
              <span className="hidden font-display text-white/90 sm:inline">Clone Store</span>
            </Link>
            <nav className="hidden gap-2 rounded-full border border-white/10 bg-white/5 p-1 text-sm font-medium lg:flex">
              <NavLink to="/" className={navClass}>Home</NavLink>
              <NavLink to="/orders" className={navClass}>Orders</NavLink>
              {user?.role === "ROLE_ADMIN" && <NavLink to="/admin" className={navClass}>Admin</NavLink>}
            </nav>
          </div>

          <form onSubmit={handleSearch} className="glass-panel flex flex-1 items-center rounded-[1.6rem] px-4 py-3 text-brand-ink">
            <Search size={18} className="text-brand-blue" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full border-0 bg-transparent px-3 text-sm outline-none placeholder:text-slate-400"
              placeholder="Search for products, brands and more"
            />
            <button className="rounded-full bg-brand-blue px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-white">
              Search
            </button>
          </form>

          <div className="flex items-center gap-3 text-sm font-medium">
            <Link to="/wishlist" className="glass-panel relative flex items-center gap-2 rounded-full px-4 py-3 text-brand-ink">
              <Heart size={18} />
              <span className="hidden sm:inline">Wishlist</span>
              {wishlist.length > 0 && <span className="rounded-full bg-brand-yellow px-2 py-0.5 text-xs font-bold text-brand-ink">{wishlist.length}</span>}
            </Link>
            <Link to="/cart" className="glass-panel relative flex items-center gap-2 rounded-full px-4 py-3 text-brand-ink">
              <ShoppingCart size={18} />
              <span className="hidden sm:inline">Cart</span>
              {cart.items.length > 0 && <span className="rounded-full bg-brand-yellow px-2 py-0.5 text-xs font-bold text-brand-ink">{cart.items.length}</span>}
            </Link>
            {user ? (
              <button onClick={logout} className="rounded-full border border-white/15 bg-white/5 px-4 py-3 text-white transition hover:bg-white/10">
                <span className="inline-flex items-center gap-2"><LogOut size={16} /> {user.fullName.split(" ")[0]}</span>
              </button>
            ) : (
              <Link to="/login" className="rounded-full bg-brand-yellow px-4 py-3 text-brand-ink shadow-lg">
                <span className="inline-flex items-center gap-2 font-semibold"><User size={16} /> Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
