import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppLayout from "../../components/layout/AppLayout";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    try {
      if (mode === "login") {
        await login({ email: form.email, password: form.password });
      } else {
        await register(form);
      }
      navigate(location.state?.from || "/");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to authenticate");
    }
  };

  return (
    <AppLayout>
      <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2.5rem] bg-hero-gradient p-8 text-white shadow-glow">
          <p className="section-kicker text-white/70">Access your account</p>
          <h1 className="mt-3 text-4xl font-black">{mode === "login" ? "Welcome back" : "Create your account"}</h1>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/80">
            Sign in to sync cart, wishlist, order history and checkout details across the storefront.
          </p>
          <div className="mt-8 space-y-3">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4">Instant cart sync after login</div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4">Admin and customer role support</div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4">Mock payments and order tracking flows</div>
          </div>
        </div>

        <div className="glass-panel mx-auto w-full max-w-md rounded-[2.2rem] p-8">
          <h2 className="text-3xl font-black">{mode === "login" ? "Sign in" : "Register"}</h2>
          <p className="mt-2 text-sm text-slate-500">Use the demo accounts or create a new customer profile.</p>
          <div className="mt-6 grid grid-cols-2 gap-3 rounded-2xl bg-slate-100 p-2">
            {["login", "register"].map((item) => (
              <button
                key={item}
                onClick={() => setMode(item)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold ${mode === item ? "bg-white text-brand-blue shadow" : "text-slate-500"}`}
              >
                {item === "login" ? "Login" : "Register"}
              </button>
            ))}
          </div>
          <form onSubmit={submit} className="mt-6 space-y-4">
            {mode === "register" && (
              <input
                value={form.fullName}
                onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none"
                placeholder="Full name"
              />
            )}
            <input
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none"
              placeholder="Email address"
            />
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none"
              placeholder="Password"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button className="w-full rounded-2xl bg-brand-blue px-4 py-3 font-semibold text-white shadow-lg">
              {mode === "login" ? "Login" : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
