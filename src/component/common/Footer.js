"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaInstagram, FaYoutube, FaLinkedin, FaGithub } from "react-icons/fa";

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative overflow-hidden bg-black/90 text-gray-300 px-6 pt-20 pb-10 border-t border-white/10"
    >
      {/* Radial animated background */}
      <motion.div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 10% 20%, #4F46E5, transparent)',
            'radial-gradient(circle at 90% 80%, #9333EA, transparent)',
            'radial-gradient(circle at 10% 20%, #4F46E5, transparent)',
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-sm">
        {/* Column 1: Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-white mb-3 bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
            Deep Sky Society
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Exploring space. Empowering minds. We are the next generation of cosmic thinkers.
          </p>
        </motion.div>

        {/* Column 2: Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-white hover:underline transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Column 3: Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <p className="text-gray-400 mb-2">Email: hello@Deep Sky Society.space</p>
          <p className="text-gray-400">Phone: +880-1234-567890</p>
        </motion.div>

        {/* Column 4: Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h3 className="text-white font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="https://instagram.com" target="_blank" className="hover:text-pink-500 transition"><FaInstagram /></a>
            <a href="https://youtube.com" target="_blank" className="hover:text-red-500 transition"><FaYoutube /></a>
            <a href="https://linkedin.com" target="_blank" className="hover:text-blue-400 transition"><FaLinkedin /></a>
            <a href="https://github.com" target="_blank" className="hover:text-gray-100 transition"><FaGithub /></a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="relative z-10 mt-12 text-center text-gray-500 text-xs"
      >
        © {new Date().getFullYear()} Deep Sky Society. All rights reserved.
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
