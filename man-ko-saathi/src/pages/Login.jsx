import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!authLoading && user) {
      navigate("/dashboard");
    }
  }, [user, authLoading, navigate]);

  async function handleLogin(e) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    navigate("/dashboard");
  }

  async function handleForgotPassword() {
    setMessage("");

    if (!email) {
      setMessage("Please enter your email first, then click Forgot Password.");
      return;
    }

    setResetLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/reset-password",
    });

    setResetLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Password reset email sent. Please check your inbox.");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-cyan-50 px-4 py-10">
      <div className="mx-auto max-w-md">
        <div className="rounded-3xl border border-white/60 bg-white/45 p-6 shadow-xl backdrop-blur-2xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-lg">
            <FaSignInAlt />
          </div>

          <h1 className="mt-5 text-center text-3xl font-bold text-slate-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-center text-sm text-slate-600">
            Login to continue your private wellbeing space.
          </p>

          {message && (
            <div className="mt-5 rounded-2xl border border-sky-200 bg-sky-50 p-3 text-sm text-sky-800">
              {message}
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email address"
              className="w-full rounded-2xl border border-white/70 bg-white/70 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-300"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                className="w-full rounded-2xl border border-white/70 bg-white/70 px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-sky-300"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              disabled={loading}
              className="w-full rounded-2xl bg-sky-600 px-5 py-3 font-bold text-white shadow-lg transition hover:bg-sky-700 disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <button
            type="button"
            onClick={handleForgotPassword}
            disabled={resetLoading}
            className="mt-4 w-full text-sm font-semibold text-sky-600"
          >
            {resetLoading ? "Sending reset email..." : "Forgot password?"}
          </button>

          <p className="mt-5 text-center text-sm text-slate-600">
            New to Man Ko Saathi?{" "}
            <Link to="/register" className="font-bold text-sky-600">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;