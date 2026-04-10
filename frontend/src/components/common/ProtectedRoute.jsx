import { Navigate } from "react-router-dom";
import Loader from "./Loader";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return <Loader label="Restoring your session..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user?.role !== "ROLE_ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
}
