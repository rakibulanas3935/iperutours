"use client";

import { useEffect, useState } from "react";
import {
  ShoppingCart,
  Search,
  User,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { PT, GB } from "country-flag-icons/react/3x2";
import en from "@/messages/en.json";
import pt from "@/messages/pt.json";
import { FaWhatsapp } from "react-icons/fa";
import { useNewPlaceContext } from "@/context/newPlaceContext";
import { useActiveMenuContext } from "@/context/activeMenuContext";
import { data } from "autoprefixer";
import { useUserContext } from "@/context/userContext";

export default function Header({ locale = "en" }) {
  const [showTop, setShowTop] = useState(true);
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, users } = useUserContext()
  const { newPlace } = useNewPlaceContext()
  const { activeMenu, activeMenuLoading, setactiveMenu, getAllactiveMenu } = useActiveMenuContext()
  const pathname = usePathname();
  const messages = locale === "pt" ? pt : en;


  console.log("users", user)

  return (
    <header className="w-full  z-50 shadow-sm bg-white">
      {/* Announcement Bar - hides on scroll */}
      <AnimatePresence>
        {showTop && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-brand-primary text-white text-xs sm:text-sm py-3 flex justify-center items-center gap-2"
          >
            <span>📢</span>
            <span className="text-center">
              Flexibility for rescheduling and cancellation in our tours and packages.
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/image.png"
            alt="Turismo Logo"
            width={150}
            height={50}
            priority
          />
        </Link>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-6">
          {/* Login */}
          {
            user ? (<Link
              href="/dashboard"
              className={`flex items-center gap-1 font-semibold ${pathname === "/login" ? "text-brand-secondary" : "text-text-title"
                }`}
            >
              {user?.firstName||user?.name}
            </Link>) : (<Link
              href="/login"
              className={`flex items-center gap-1 font-semibold ${pathname === "/login" ? "text-brand-secondary" : "text-text-title"
                }`}
            >
              <span className="hidden sm:inline">Log in</span>
              <User size={20} />
            </Link>
            )
          }

          {/* WhatsApp */}
          <Link
            href="https://wa.me/123456789"
            target="_blank"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 transition"
          >
            <FaWhatsapp className="text-white w-6 h-6" />
          </Link>

          {/* Language Dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-1"
              onClick={() => setLangOpen(!langOpen)}
            >
              <div className="w-7 h-5 overflow-hidden rounded-sm shadow">
                {locale === "pt" ? <PT title="Portuguese" /> : <GB title="English" />}
              </div>
              <ChevronDown size={16} />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-0 mt-2 bg-white shadow-lg rounded-md text-sm overflow-hidden"
                >
                  <button
                    onClick={() => {
                      setLangOpen(false);
                      window.location.href = "/?locale=en";
                    }}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full"
                  >
                    <GB title="English" className="w-7 h-7" />
                    English
                  </button>
                  <button
                    onClick={() => {
                      setLangOpen(false);
                      window.location.href = "/?locale=de";
                    }}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full"
                  >
                    <PT title="Portuguese" className="w-7 h-7" />
                    Portuguese
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cart */}
          <Link href="/cart" className="relative">
            <ShoppingCart
              size={22}
              className={
                pathname === "/cart" ? "text-brand-secondary" : "text-text-title"
              }
            />
            <span className="absolute -top-2 -right-2 bg-accent-yellow text-xs text-black font-semibold rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </Link>

          {/* Search */}
          <Link href="/search">
            <Search
              size={22}
              className={
                pathname === "/search"
                  ? "text-brand-secondary"
                  : "text-brand-secondary/70"
              }
            />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex justify-center gap-6 py-3 bg-gray-50 font-semibold">
        {newPlace?.data?.map((place) => (
          <button
            key={place?.placeName}
            onClick={() => {
              getAllactiveMenu(`http://localhost:3000/api/v1/places/${place?._id}`, (data) => {
                setactiveMenu(data?.data)
              })
            }}
            className={`transition-colors cursor-pointer ${activeMenu?._id === place?._id
              ? "text-brand-secondary"
              : "text-text-title hover:text-brand-secondary"
              }`}
          >
            {place?.placeName}
          </button>
        ))}
      </nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg px-4 py-4 flex flex-col gap-3 font-semibold"
          >
            {newPlace?.data?.map((place) => (
              <Link
                key={place?.placeName}
                href={place?.link}
                className={`transition-colors ${pathname === place?.link
                  ? "text-brand-secondary"
                  : "text-text-title hover:text-brand-secondary"
                  }`}
                onClick={() => setMenuOpen(false)}
              >
                {place?.placeName}
              </Link>
            ))}

            <div className="border-t pt-3 mt-3 flex flex-col gap-3">
              {/* {
                users?.data?.users[0]?.name 
              } */}
              {
                users ? (<Link
                  href="/login"
                  className={`flex items-center gap-2 ${pathname === "/login"
                    ? "text-brand-secondary"
                    : "text-text-title hover:text-brand-secondary"
                    }`}
                >
                  {users?.data?.users[0]?.name}
                </Link>) : (<Link
                  href="/login"
                  className={`flex items-center gap-2 ${pathname === "/login"
                    ? "text-brand-secondary"
                    : "text-text-title hover:text-brand-secondary"
                    }`}
                >
                  <User size={18} /> Log in
                </Link>)
              }

              <Link
                href="/cart"
                className={`flex items-center gap-2 relative ${pathname === "/cart"
                  ? "text-brand-secondary"
                  : "text-text-title hover:text-brand-secondary"
                  }`}
              >
                <ShoppingCart size={18} />
                <span className="absolute -top-2 -right-2 bg-accent-yellow text-xs text-black font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
                Cart
              </Link>
              <Link
                href="/search"
                className={`flex items-center gap-2 ${pathname === "/search"
                  ? "text-brand-secondary"
                  : "text-text-title hover:text-brand-secondary"
                  }`}
              >
                <Search size={18} /> Search
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
