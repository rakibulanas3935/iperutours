"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAxiosPost from "@/app/utils/useAxiosPost";
import { useUserContext } from "@/app/context/userContext";

const Login = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { setReload } = useUserContext()
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [, postUserinfo, loading, setLoading] = useAxiosPost()
  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const userName = form.userName.value;
    const email = form.email.value;
    const password = form.password.value;

    setLoading(true);
    postUserinfo("https://nova-next-gen-server.onrender.com/api/v1/users/signup", {
      email, password, userName, name, passwordConfirm: password
    }, (res) => {
      setReload(true)
    }, true)

  };


  return (
    <div className="min-h-screen overflow-x-hidden overflow-y-auto bg-[#0A0F1C]">
      {/* Animated background blob */}
      <motion.div
        className="absolute w-32 h-32 rounded-full opacity-20"
        animate={{
          x: mousePosition.x * -0.03,
          y: mousePosition.y * -0.03,
        }}
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,1) 0%, rgba(79,70,229,0) 70%)",
          bottom: "20%",
          left: "20%",
        }}
      />

      {/* Stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i + 1}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ opacity: 0.1 }}
            animate={{
              opacity: [0.1, 1, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 98}%`,
              top: `${Math.random() * 98}%`,
            }}
          />
        ))}
      </div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-40 pt-20 pb-10 sm:pt-24 sm:pb-10"
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                background: [
                  "radial-gradient(circle at 0% 0%, #9333ea, transparent)",
                  "radial-gradient(circle at 100% 100%, #3b82f6, transparent)",
                  "radial-gradient(circle at 0% 0%, #9333ea, transparent)",
                ],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative px-6 py-8 sm:px-8 sm:py-12">
              <div className="flex flex-col justify-center space-y-6">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400"
                >
                  Add New Member
                </motion.h2>

                <form className="space-y-4" onSubmit={handleRegister}>
                  {/* Name */}
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 backdrop-blur-sm focus:outline-none"
                  />
                  <input
                    type="text"
                    name="userName"
                    placeholder="User Name"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 backdrop-blur-sm focus:outline-none"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 backdrop-blur-sm focus:outline-none"
                  />

                  {/* Password with toggle */}
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Your Password"
                      className="w-full px-4 py-3 pr-10 rounded-lg bg-white/10 text-white border border-white/20 backdrop-blur-sm focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-3 flex items-center text-white/70 hover:text-white focus:outline-none"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>



                  {/* Submit button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r w-full from-purple-600 to-blue-600 rounded-lg text-white font-semibold transition-all hover:shadow-lg hover:shadow-purple-500/25"
                    type="submit"
                  >
                    {loading ? "Creating user ..." : "Create User"}
                  </motion.button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Login;
