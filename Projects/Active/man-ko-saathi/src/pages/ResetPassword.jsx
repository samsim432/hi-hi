import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { supabase } from "../lib/supabase";

function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleResetPassword(e) {
    e.preventDefault();
    setMessage("");

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Password updated successfully. Redirecting to login...");

    setTimeout(async () => {
      await supabase.auth.signOut();
      navigate("/login");
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-cyan-50 px-4 py-10">
      <div className="mx-auto max-w-md">
        <div className="rounded-3xl border border-white/60 bg-white/45 p-6 shadow-xl backdrop-blur-2xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-lg">
            <FaLock />
          </div>

          <h1 className="mt-5 text-center text-3xl font-bold text-slate-900">
            Reset Password
          </h1>

          <p className="mt-2 text-center text-sm text-slate-600">
            Enter a new password for your account.
          </p>

          {message && (
            <div className="mt-5 rounded-2xl border border-sky-200 bg-sky-50 p-3 text-sm text-sky-800">
              {message}
            </div>
          )}

          <form onSubmit={handleResetPassword} className="mt-6 space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="New password"
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
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm new password"
              className="w-full rounded-2xl border border-white/70 bg-white/70 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-300"
            />

            <button
              disabled={loading}
              className="w-full rounded-2xl bg-sky-600 px-5 py-3 font-bold text-white shadow-lg transition hover:bg-sky-700 disabled:opacity-60"
            >
              {loading ? "Updating password..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;