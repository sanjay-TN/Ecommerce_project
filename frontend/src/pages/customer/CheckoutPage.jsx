import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { orderApi } from "../../api/services";
import AppLayout from "../../components/layout/AppLayout";
import { useShop } from "../../context/ShopContext";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, refreshCart } = useShop();
  const [form, setForm] = useState({
    label: "Home",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    phoneNumber: "",
    paymentMethod: "UPI"
  });
  const [message, setMessage] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    const payload = {
      shippingAddress: {
        label: form.label,
        line1: form.line1,
        line2: form.line2,
        city: form.city,
        state: form.state,
        postalCode: form.postalCode,
        country: form.country,
        phoneNumber: form.phoneNumber
      },
      paymentMethod: form.paymentMethod
    };
    const response = await orderApi.checkout(payload);
    await refreshCart();
    setMessage(`Order placed successfully. Order #${response.data.data.orderNumber}`);
    setTimeout(() => navigate("/orders"), 1200);
  };

  return (
    <AppLayout>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <form onSubmit={submit} className="rounded-[2rem] bg-white p-8 shadow-soft">
          <h1 className="text-3xl font-black">Checkout</h1>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["label", "Label"],
              ["line1", "Address line 1"],
              ["line2", "Address line 2"],
              ["city", "City"],
              ["state", "State"],
              ["postalCode", "Postal code"],
              ["country", "Country"],
              ["phoneNumber", "Phone number"]
            ].map(([key, label]) => (
              <input
                key={key}
                value={form[key]}
                onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
                className="rounded-xl border border-slate-200 px-4 py-3 outline-none"
                placeholder={label}
                required={key !== "line2"}
              />
            ))}
          </div>
          <select
            value={form.paymentMethod}
            onChange={(event) => setForm((current) => ({ ...current, paymentMethod: event.target.value }))}
            className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
          >
            <option value="UPI">UPI</option>
            <option value="CARD">Card</option>
            <option value="COD">Cash on Delivery</option>
          </select>
          {message && <p className="mt-4 text-sm font-semibold text-emerald-600">{message}</p>}
          <button className="mt-6 rounded-2xl bg-brand-blue px-5 py-3 font-semibold text-white">Place Order</button>
        </form>

        <div className="rounded-[2rem] bg-white p-6 shadow-soft">
          <h2 className="text-xl font-bold">Order Summary</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            {cart.items.map((item) => (
              <div key={item.id} className="flex justify-between gap-3">
                <span>{item.productName} x {item.quantity}</span>
                <span>Rs. {item.total}</span>
              </div>
            ))}
            <div className="flex justify-between border-t border-slate-100 pt-3 font-bold text-slate-900">
              <span>Total Payable</span>
              <span>Rs. {cart.grandTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
