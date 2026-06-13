import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus, FaEye, FaEyeSlash } from "react-icons/fa";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [form, setForm] = useState({
    firstName: "",
    surname: "",
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!authLoading && user) {
      navigate("/dashboard");
    }
  }, [user, authLoading, navigate]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleRegister(e) {
    e.preventDefault();
    setMessage("");

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (form.password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        emailRedirectTo: window.location.origin + "/login",
        data: {
          first_name: form.firstName,
          surname: form.surname,
          display_name: form.displayName,
        },
      },
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage(
      "Account created. Please check your email and confirm your account within 10 minutes before logging in."
    );

    setForm({
      firstName: "",
      surname: "",
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-cyan-50 px-4 py-10">
      <div className="mx-auto max-w-md">
        <div className="rounded-3xl border border-white/60 bg-white/45 p-6 shadow-xl backdrop-blur-2xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-lg">
            <FaUserPlus />
          </div>

          <h1 className="mt-5 text-center text-3xl font-bold text-slate-900">
            Create Account
          </h1>

          <p className="mt-2 text-center text-sm text-slate-600">
            Join Man Ko Saathi as a private self-help user.
          </p>

          {message && (
            <div className="mt-5 rounded-2xl border border-sky-200 bg-sky-50 p-3 text-sm text-sky-800">
              {message}
            </div>
          )}

          <form onSubmit={handleRegister} className="mt-6 space-y-4">
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
              placeholder="First name"
              className="w-full rounded-2xl border border-white/70 bg-white/70 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-300"
            />

            <input
              name="surname"
              value={form.surname}
              onChange={handleChange}
              required
              placeholder="Surname"
              className="w-full rounded-2xl border border-white/70 bg-white/70 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-300"
            />

            <input
              name="displayName"
              value={form.displayName}
              onChange={handleChange}
              required
              placeholder="Display name"
              className="w-full rounded-2xl border border-white/70 bg-white/70 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-300"
            />

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Email address"
              className="w-full rounded-2xl border border-white/70 bg-white/70 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-300"
            />

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
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

            <input
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={form.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm password"
              className="w-full rounded-2xl border border-white/70 bg-white/70 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-300"
            />

            <button
              disabled={loading}
              className="w-full rounded-2xl bg-sky-600 px-5 py-3 font-bold text-white shadow-lg transition hover:bg-sky-700 disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-sky-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;