import { Link } from "react-router-dom";
import AppLayout from "../../components/layout/AppLayout";
import { useShop } from "../../context/ShopContext";

export default function CartPage() {
  const { cart, updateCartItem, removeCartItem } = useShop();

  return (
    <AppLayout>
      <div className="mb-6">
        <p className="section-kicker">Bag Summary</p>
        <h1 className="section-title mt-2">Your cart</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {cart.items.length ? cart.items.map((item) => (
            <div key={item.id} className="glass-panel flex flex-col gap-4 rounded-[2rem] p-5 sm:flex-row">
              <img src={item.thumbnail} alt={item.productName} className="h-32 w-32 rounded-[1.4rem] object-cover" />
              <div className="flex-1">
                <h3 className="text-lg font-bold">{item.productName}</h3>
                <p className="mt-2 text-sm text-slate-500">Unit price: Rs. {item.price}</p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(event) => updateCartItem(item.id, Number(event.target.value))}
                    className="w-24 rounded-xl border border-slate-200 px-3 py-2 outline-none"
                  />
                  <button onClick={() => removeCartItem(item.id)} className="rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">
                    Remove
                  </button>
                </div>
              </div>
              <div className="text-xl font-black">Rs. {item.total}</div>
            </div>
          )) : (
            <div className="glass-panel rounded-[2rem] p-10 text-center">
              <p className="text-xl font-bold">Your cart is empty</p>
              <Link to="/" className="mt-4 inline-block rounded-2xl bg-brand-blue px-5 py-3 font-semibold text-white">Start shopping</Link>
            </div>
          )}
        </div>

        <div className="glass-panel rounded-[2rem] p-6">
          <h2 className="text-xl font-bold">Price Details</h2>
          <div className="mt-6 space-y-3 text-sm text-slate-600">
            <div className="flex justify-between"><span>Subtotal</span><span>Rs. {cart.subtotal}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>Rs. {cart.shipping}</span></div>
            <div className="flex justify-between border-t border-slate-100 pt-3 text-lg font-bold text-slate-900"><span>Total</span><span>Rs. {cart.grandTotal}</span></div>
          </div>
          <Link to="/checkout" className="mt-6 block rounded-2xl bg-brand-yellow px-4 py-3 text-center font-semibold text-brand-ink">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
