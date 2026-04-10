import { Heart, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useShop } from "../../context/ShopContext";

export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist } = useShop();
  const { isAuthenticated } = useAuth();
  const wished = wishlist.some((item) => item.id === product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group glass-panel overflow-hidden rounded-[2rem] p-4 transition duration-300 hover:-translate-y-2 hover:shadow-glow">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-[1.7rem] bg-mesh-warm">
          {discount > 0 && (
            <span className="absolute left-4 top-4 z-10 rounded-full bg-brand-ink px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-white">
              {discount}% off
            </span>
          )}
          <img src={product.thumbnail} alt={product.name} className="h-60 w-full object-cover transition duration-500 group-hover:scale-105" />
        </div>
        <div className="mt-5">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-blue/70">{product.brand || product.categoryName}</p>
          <h3 className="mt-2 line-clamp-2 min-h-[3.4rem] text-lg font-black text-slate-900">{product.name}</h3>
          <div className="mt-4 flex items-end gap-3">
            <span className="text-2xl font-black text-slate-900">Rs. {product.price}</span>
            <span className="pb-1 text-sm text-slate-400 line-through">Rs. {product.originalPrice}</span>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700">
              <Star size={14} fill="currentColor" /> {product.averageRating || 0}
            </span>
            <span>{product.totalRatings || 0} ratings</span>
          </div>
        </div>
      </Link>
      <div className="mt-5 flex gap-3">
        <button
          onClick={() => isAuthenticated && addToCart(product.id, 1)}
          className="flex-1 rounded-2xl bg-brand-blue px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-ink"
        >
          <span className="inline-flex items-center gap-2"><ShoppingCart size={16} /> Add to Cart</span>
        </button>
        <button
          onClick={() => isAuthenticated && toggleWishlist(product.id)}
          className={`rounded-2xl border px-4 py-3 transition ${wished ? "border-rose-200 bg-rose-50 text-rose-600" : "border-slate-200 bg-white/70 text-slate-500 hover:border-brand-blue/30 hover:text-brand-blue"}`}
        >
          <Heart size={18} fill={wished ? "currentColor" : "none"} />
        </button>
      </div>
    </div>
  );
}
