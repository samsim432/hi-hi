import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-cyan-50 px-4">
        <div className="rounded-3xl border border-white/60 bg-white/50 px-6 py-5 text-center shadow-xl backdrop-blur-2xl">
          <p className="text-sm font-semibold text-slate-700">
            Checking your session...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;