import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const AuthModal = ({ onClose }) => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const isRegister = mode === "register";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (isRegister) {
        await register(form);
        toast.success("Account created successfully");
      } else {
        await login(form.email, form.password);
        toast.success("Welcome back");
      }

      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full px-3 py-1 text-xl text-gray-500 hover:bg-gray-100"
          aria-label="Close authentication dialog"
        >
          ×
        </button>

        <div className="mb-7">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
            QuickStay
          </p>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            {isRegister ? "Create your account" : "Welcome back"}
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            {isRegister
              ? "Create a QuickStay account to manage bookings and list your hotel."
              : "Sign in to manage your bookings and hotel activity."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-gray-700">Name</span>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                autoComplete="name"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                placeholder="Your name"
              />
            </label>
          )}

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-gray-700">Email</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              placeholder="you@example.com"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-gray-700">Password</span>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              autoComplete={isRegister ? "new-password" : "current-password"}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              placeholder="At least 6 characters"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 px-4 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Please wait..." : isRegister ? "Create account" : "Sign in"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          {isRegister ? "Already have an account?" : "New to QuickStay?"}{" "}
          <button
            type="button"
            onClick={() => setMode(isRegister ? "login" : "register")}
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            {isRegister ? "Sign in" : "Create account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
