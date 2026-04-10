import { Heart, ShoppingCart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productApi } from "../../api/services";
import AppLayout from "../../components/layout/AppLayout";
import Loader from "../../components/common/Loader";
import ErrorState from "../../components/common/ErrorState";
import { useAuth } from "../../context/AuthContext";
import { useShop } from "../../context/ShopContext";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { addToCart, toggleWishlist, wishlist } = useShop();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [review, setReview] = useState({ rating: 5, comment: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    productApi
      .getById(id)
      .then((response) => setProduct(response.data.data))
      .catch((err) => setError(err.response?.data?.message || "Unable to load product"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleReview = async (event) => {
    event.preventDefault();
    const response = await productApi.review(id, { ...review, rating: Number(review.rating) });
    setProduct(response.data.data);
    setReview({ rating: 5, comment: "" });
  };

  if (loading) return <AppLayout><Loader label="Loading product..." /></AppLayout>;
  if (error || !product) return <AppLayout><ErrorState message={error || "Product not found"} /></AppLayout>;

  const wished = wishlist.some((item) => item.id === product.id);

  return (
    <AppLayout>
      <div className="mb-6">
        <p className="section-kicker">Product Spotlight</p>
        <h1 className="section-title mt-2">Product details</h1>
      </div>
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-4">
          <div className="glass-panel overflow-hidden rounded-[2rem] p-4">
            <img src={product.thumbnail} alt={product.name} className="h-[420px] w-full rounded-[1.6rem] object-cover shadow-soft" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images?.map((image) => (
              <div key={image} className="glass-panel rounded-2xl p-2">
                <img src={image} alt={product.name} className="h-28 w-full rounded-xl object-cover" />
              </div>
            ))}
          </div>
        </div>
        <div className="glass-panel rounded-[2rem] p-8">
          <p className="section-kicker">{product.categoryName}</p>
          <h1 className="mt-2 text-3xl font-black">{product.name}</h1>
          <div className="mt-4 flex items-center gap-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
              <Star size={14} fill="currentColor" /> {product.averageRating || 0}
            </span>
            <span className="text-sm text-slate-500">{product.totalRatings || 0} ratings</span>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-4xl font-black">Rs. {product.price}</span>
            <span className="text-lg text-slate-400 line-through">Rs. {product.originalPrice}</span>
          </div>
          <p className="mt-6 leading-7 text-slate-600">{product.description}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <span className="rounded-full bg-brand-blue/10 px-4 py-2 text-sm font-semibold text-brand-blue">Stock available: {product.stock}</span>
            <span className="rounded-full bg-brand-yellow/20 px-4 py-2 text-sm font-semibold text-brand-ink">Fast checkout enabled</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <button onClick={() => addToCart(product.id, 1)} className="rounded-2xl bg-brand-blue px-6 py-3 font-semibold text-white">
              <span className="inline-flex items-center gap-2"><ShoppingCart size={18} /> Add to Cart</span>
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`rounded-2xl border px-6 py-3 font-semibold ${wished ? "border-rose-200 bg-rose-50 text-rose-600" : "border-slate-200 text-slate-700"}`}
            >
              <span className="inline-flex items-center gap-2"><Heart size={18} fill={wished ? "currentColor" : "none"} /> Wishlist</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="glass-panel rounded-[2rem] p-8">
          <h2 className="text-2xl font-bold">Ratings & Reviews</h2>
          <div className="mt-6 space-y-4">
            {product.reviews?.length ? product.reviews.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{item.userName}</p>
                  <span className="text-sm text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="mt-2 text-sm font-semibold text-brand-blue">Rating: {item.rating}/5</p>
                <p className="mt-2 text-sm text-slate-600">{item.comment}</p>
              </div>
            )) : <p className="text-slate-500">No reviews yet.</p>}
          </div>
        </div>

        {isAuthenticated && (
          <form onSubmit={handleReview} className="glass-panel rounded-[2rem] p-8">
            <h3 className="text-xl font-bold">Write a Review</h3>
            <select
              value={review.rating}
              onChange={(event) => setReview((current) => ({ ...current, rating: event.target.value }))}
              className="mt-4 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none"
            >
              {[5, 4, 3, 2, 1].map((rating) => <option key={rating} value={rating}>{rating} Stars</option>)}
            </select>
            <textarea
              value={review.comment}
              onChange={(event) => setReview((current) => ({ ...current, comment: event.target.value }))}
              rows={5}
              className="mt-4 w-full rounded-2xl border border-slate-200 px-4 py-4 outline-none"
              placeholder="Share your experience"
            />
            <button className="mt-4 w-full rounded-2xl bg-brand-yellow px-4 py-3 font-semibold text-brand-ink">Submit Review</button>
          </form>
        )}
      </div>
    </AppLayout>
  );
}
