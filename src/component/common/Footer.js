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

export default function Footer() {
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
          <h3 className="font-bold text-lg mb-4">Turismo iPeru</h3>
          <div className="flex items-center gap-2 mb-3">
            <Image
              src="/image.png" // replace with your logo
              alt="Turismo iPeru"
              width={50}
              height={80}
            />
            <p className="text-sm font-semibold">Explore Peru With Us</p>
          </div>
          <p className="flex items-start gap-2 text-sm mb-2">
            🏠 CUSCO: C. Comercial Ruiseñores, 2nd floor, Of. s/n (Main Square)
          </p>
          <p className="flex items-start gap-2 text-sm mb-2">
            🏠 LIMA: Gonzales Vigil St. #116, Los Olivos
          </p>
          <p className="flex items-start gap-2 text-sm">
            🏠 AREQUIPA: Santa Marta St. #101
          </p>
        </motion.div>

        {/* Column 2: Contact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-bold text-lg mb-4">Contact</h3>
          <p className="text-sm font-semibold mb-2">
            Trade name: Turismo iPeru E.I.R.L. <br />
            RUC: <span className="font-bold">20609503638</span>
          </p>
          <p className="flex items-center gap-2 text-sm mb-2">
            <FaWhatsapp className="text-green-500" /> (+51) 972 386 856
          </p>
          <p className="flex items-center gap-2 text-sm mb-2">
            <FaWhatsapp className="text-green-500" /> (+51) 966 389 141
          </p>
          <p className="flex items-center gap-2 text-sm mb-2">
            <FaEnvelope /> info@iperutours.com
          </p>
          <p className="flex items-center gap-2 text-sm mb-2">
            <FaEnvelope /> reserva@iperutours.com
          </p>
          <p className="flex items-center gap-2 text-sm">
            <FaEnvelope /> booking@iperutours.com
          </p>
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
              <Link href="#">About us</Link>
            </li>
            <li>
              <Link href="#">Terms and Conditions</Link>
            </li>
            <li>
              <Link href="#">Privacy policy</Link>
            </li>
            <li>
              <Link href="#">Refund policy</Link>
            </li>
          </ul>
          <h3 className="font-bold text-lg mt-6 mb-3">Accepted payments</h3>
          <div className="flex gap-3">
            <Image src="/visa.png" alt="Visa" width={50} height={30} />
            <Image src="/mastercard.png" alt="MasterCard" width={50} height={30} />
            <Image src="/diners.png" alt="Diners Club" width={50} height={30} />
            <Image src="/amex.png" alt="AmEx" width={50} height={30} />
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
