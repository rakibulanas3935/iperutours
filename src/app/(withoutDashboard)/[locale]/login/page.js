"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { useUserContext } from "@/context/userContext";
import useAxiosPost from "@/utils/useAxiosPost";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const { setReload } = useUserContext();
  const router = useRouter();
  const [, postUserinfo, loading, setLoading] = useAxiosPost([]);

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const identifier = form.identifier.value; // single input
    const password = form.password.value;

    // Detect if input is email or username
    const payload =
      identifier.includes("@")
        ? { email: identifier, password }
        : { userName: identifier, password };

    setLoading(true);
    postUserinfo(
      "http://localhost:3000/api/v1/users/login",
      payload,
      (res) => {
        if (res.status === "success") {
          localStorage.setItem("token", res.token);
          setReload((prev) => !prev);
          router.push("/");
        }
      },
      true
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white  px-4">
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-neutral-background rounded shadow-sm p-8"
      >
        {/* Title */}
        <div className="text-center mb-6">
          {/* Logo */}
          <Link href="/" className="flex justify-center mb-2 items-center">
            <Image
              src="/image.png"
              alt="Turismo Logo"
              width={150}
              height={50}
              priority
            />
          </Link>

          <p className="text-xl text-text-body">Sign in to continue</p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleLogin}>
          {/* Email/UserName */}
          <div>
            <label className="block text-sm font-medium text-text-body mb-1">
              Email/User Name
            </label>
            <input
              type="text"
              name="identifier"
              placeholder="you@example.com or username"
              className="w-full px-4 py-2 bg-white border border-neutral-line rounded-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-text-body mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 bg-white border border-neutral-line rounded-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-primary"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div className="flex justify-end">
            <a href="#" className="text-sm text-brand-secondary hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Submit button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-brand-primary text-white py-2.5 rounded-sm cursor-pointer font-medium shadow-md hover:bg-brand-secondary transition"
          >
            <LogIn size={18} />
            {loading ? "Signing In..." : "Sign In"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
