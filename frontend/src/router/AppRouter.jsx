import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import CartPage from "../pages/customer/CartPage";
import CheckoutPage from "../pages/customer/CheckoutPage";
import HomePage from "../pages/customer/HomePage";
import LoginPage from "../pages/customer/LoginPage";
import OrdersPage from "../pages/customer/OrdersPage";
import ProductDetailsPage from "../pages/customer/ProductDetailsPage";
import WishlistPage from "../pages/customer/WishlistPage";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/products/:id" element={<ProductDetailsPage />} />
      <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
      <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
      <Route path="/wishlist" element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboardPage /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
