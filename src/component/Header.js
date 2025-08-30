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

import en from "@/messages/en.json";
import de from "@/messages/de.json";

export default function Header({ locale = "en" }) {
  const [showTop, setShowTop] = useState(true);
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const messages = locale === "de" ? de : en;
  const places = messages.menu;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowTop(false);
      } else {
        setShowTop(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full sticky top-0 z-50 shadow-sm bg-white">
      {/* Announcement Bar - hides on scroll */}
      {showTop && (
        <div className="bg-brand-primary text-white text-xs sm:text-sm py-2 flex justify-center items-center gap-2 transition-all duration-300">
          <span>📢</span>
          <span className="text-center">
            Flexibility for rescheduling and cancellation in our tours and packages.
          </span>
        </div>
      )}

      {/* Main Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Turismo Logo"
            width={150}
            height={50}
            priority
          />
        </Link>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-6">
          {/* Login */}
          <Link
            href="/login"
            className="flex items-center gap-1 text-text-title font-semibold"
          >
            <span className="hidden sm:inline">Log in</span>
            <User size={20} className="text-text-title" />
          </Link>

          {/* WhatsApp */}
          <Link href="https://wa.me/123456789" target="_blank">
            <Image src="/whatsapp.svg" alt="WhatsApp" width={28} height={28} />
          </Link>

          {/* Language Dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-1"
              onClick={() => setLangOpen(!langOpen)}
            >
              <Image
                src={locale === "de" ? "/de-flag.svg" : "/uk-flag.svg"}
                alt="Language"
                width={28}
                height={18}
              />
              <ChevronDown size={16} />
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md text-sm">
                <button
                  onClick={() => {
                    setLangOpen(false);
                    window.location.href = "/?locale=en";
                  }}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                >
                  <Image src="/uk-flag.svg" alt="EN" width={20} height={14} />
                  English
                </button>
                <button
                  onClick={() => {
                    setLangOpen(false);
                    window.location.href = "/?locale=de";
                  }}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                >
                  <Image src="/de-flag.svg" alt="DE" width={20} height={14} />
                  Deutsch
                </button>
              </div>
            )}
          </div>

          {/* Cart */}
          <Link href="/cart" className="relative">
            <ShoppingCart size={22} className="text-text-title" />
            <span className="absolute -top-2 -right-2 bg-accent-yellow text-xs text-black font-semibold rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </Link>

          {/* Search */}
          <Link href="/search">
            <Search size={22} className="text-brand-secondary" />
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
      <nav className="hidden md:flex justify-center gap-6 py-3 bg-gray-50 text-text-title font-semibold">
        {places.map((place) => (
          <Link
            key={place.placeName}
            href={place.link}
            className="hover:text-brand-secondary transition-colors"
          >
            {place.placeName}
          </Link>
        ))}
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 py-4 flex flex-col gap-3 text-text-title font-semibold">
          {/* Mobile Nav Links */}
          {places.map((place) => (
            <Link
              key={place.placeName}
              href={place.link}
              className="hover:text-brand-secondary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {place.placeName}
            </Link>
          ))}

          <div className="border-t pt-3 mt-3 flex flex-col gap-3">
            <Link href="/login" className="flex items-center gap-2">
              <User size={18} /> Log in
            </Link>
            <Link href="/cart" className="flex items-center gap-2 relative">
              <ShoppingCart size={18} />
              <span className="absolute -top-2 -right-2 bg-accent-yellow text-xs text-black font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
              Cart
            </Link>
            <Link href="/search" className="flex items-center gap-2">
              <Search size={18} className="text-brand-secondary" /> Search
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
