"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FaWhatsapp,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
} from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { FaTripadvisor } from "react-icons/fa";
import { useSettingContext } from "@/context/settingContext";

export default function Footer() {
    const {settings}=useSettingContext()
  return (
    <footer className="bg-neutral-background">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Column 1: Logo & Address */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="font-bold text-lg mb-4">{settings?.data?.siteName}</h3>
          <div className="flex items-center gap-2 mb-3">
            <Image
              src={settings?.data?.logoUrl || "/image.png"} // replace with your logo
              alt="Turismo iPeru"
              width={50}
              height={80}
            />
            <p className="text-sm font-semibold">Explore Peru With Us</p>
          </div>
          {settings?.data?.addresses?.map((addr, i) => (
            <p key={i} className="flex items-start gap-2 text-sm mb-2">
              🏠 {addr.city?.toUpperCase() || "Location"}: {addr.line1}, {addr.line2 || ""} {addr.postalCode || ""}
            </p>
          ))}
        </motion.div>

      {/* Column 2: Contact */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  <h3 className="font-bold text-lg mb-4">Contact</h3>

  {/* Contract info */}
  {settings?.data?.contract && (
    <p className="text-sm font-semibold mb-2">
      Trade name: {settings.data.contract.tname || "N/A"} <br />
      {/* You can add RUC if available in settings */}
    </p>
  )}

  {/* Phones */}
  {settings?.data?.contract?.phones?.map((phone, i) => (
    <p key={i} className="flex items-center gap-2 text-sm mb-2">
      <FaWhatsapp className="text-green-500" /> {phone}
    </p>
  ))}

  {settings?.data?.phones?.map((phone, i) => (
    <p key={`global-${i}`} className="flex items-center gap-2 text-sm mb-2">
      <FaWhatsapp className="text-green-500" /> {phone}
    </p>
  ))}

  {/* Emails */}
  {settings?.data?.contract?.emails?.map((email, i) => (
    <p key={i} className="flex items-center gap-2 text-sm mb-2">
      <FaEnvelope /> {email}
    </p>
  ))}

  {settings?.data?.emails?.map((email, i) => (
    <p key={`global-email-${i}`} className="flex items-center gap-2 text-sm mb-2">
      <FaEnvelope /> {email}
    </p>
  ))}
</motion.div>

        {/* Column 3: Support */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="font-bold text-lg mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about-us">About us</Link>
            </li>
            <li>
              <Link href="/terms-conditions">Terms and Conditions</Link>
            </li>
            <li>
              <Link href="/privacy-policy">Privacy policy</Link>
            </li>
            <li>
              <Link href="/refund-policy">Refund policy</Link>
            </li>
          </ul>
          <h3 className="font-bold text-lg mt-6 mb-3">Accepted payments</h3>
          <div className="flex gap-3">
            <Image src="/visa-1.svg" alt="Visa" width={50} height={30} />
            <Image src="/mc.svg" alt="MasterCard" width={50} height={30} />
            <Image src="/diners.svg" alt="Diners Club" width={50} height={30} />
            <Image src="/amex.svg" alt="AmEx" width={50} height={30} />
          </div>
        </motion.div>

        {/* Column 4: Cities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="font-bold text-lg mb-4">Cities</h3>
          <ul className="space-y-2 text-sm">
            <li>➕ Cusco, Peru</li>
            <li>➕ Huaraz, Peru</li>
            <li>➕ Arequipa, Peru</li>
            <li>➕ Puno, Peru</li>
            <li>➕ Lima, Peru</li>
            <li>
              <Link href="#">➕ See More</Link>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Social Media */}
      <div className="flex justify-center gap-4 mb-6">
        <a href="#" className="p-2 bg-white rounded-full shadow">
          <FaFacebookF />
        </a>
        <a href="#" className="p-2 bg-white rounded-full shadow">
          <FaInstagram />
        </a>
        <a href="#" className="p-2 bg-white rounded-full shadow">
          <FaTiktok />
        </a>
        <a href="#" className="p-2 bg-white rounded-full shadow">
          <FaTripadvisor />
        </a>
        <a href="#" className="p-2 bg-white rounded-full shadow">
          <FaPinterestP />
        </a>
      </div>

      {/* Bottom Bar */}
      <div className="bg-brand-primary text-white text-sm py-3 px-6 flex flex-col md:flex-row justify-between items-center">
        <p>All rights reserved© – 2025 · Turismo iPeru</p>
        <p>
          Designed and developed with <span className="text-brand-secondary">❤</span> by{" "}
          <span className="text-brand-secondary">RHG</span>
        </p>
      </div>
    </footer>
  );
}
