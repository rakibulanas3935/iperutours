'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Languages, Dumbbell } from 'lucide-react';

export default function TripInfo({data}) {
  const sections = [
    "Details",
    "Inclusion",
    "Description",
    "What to bring",
    "Cancellation",
    "Reviews",
  ];

  const [activeSection, setActiveSection] = useState("Details");

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      let current = "Details";
      sections.forEach((sec) => {
        const id = sec.replace(/\s+/g, "-").toLowerCase();
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            current = sec;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full  mx-auto">
      {/* Sticky Nav */}
      <div className="sticky top-0 z-50 bg-white border-b py-3 mb-10">
        <div className="flex flex-wrap gap-3">
          {sections?.map((section) => {
            const id = section.replace(/\s+/g, "-").toLowerCase();
            return (
              <a
                key={section}
                href={`#${id}`}
                onClick={() => {
                  e.preventDefault()
                  setActiveSection(section)
                }}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === section
                    ? "bg-brand-secondary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {section}
              </a>
            );
          })}
        </div>
      </div>

      {/* Sections */}
      <motion.section
        id="details"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-12 scroll-mt-28"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">Details</h2>
        <p className="text-gray-700 text-sm mb-4">
          Explore the highlights of the Sacred Valley of the Incas in a single
          day filled with history, culture, and breathtaking landscapes. This
          tour takes you on an unforgettable journey through this historically
          and culturally rich region.
        </p>
        <div className="space-y-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-gray-600" />
            <strong className="w-28 text-gray-700">Duration:</strong>
            <span>11.5 hours</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-gray-600" />
            <strong className="w-28 text-gray-700">Schedule:</strong>
            <span>7:00 AM</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-gray-600" />
            <strong className="w-28 text-gray-700">Meeting point:</strong>
            <span>Pickup at your accommodation</span>
          </div>
          <div className="flex items-center gap-2">
            <Languages size={18} className="text-gray-600" />
            <strong className="w-28 text-gray-700">Guide:</strong>
            <span>English, Spanish</span>
          </div>
          <div className="flex items-center gap-2">
            <Dumbbell size={18} className="text-gray-600" />
            <strong className="w-28 text-gray-700">Fitness level:</strong>
            <span>Low, Intermediate</span>
          </div>
        </div>
      </motion.section>

      <section id="inclusion" className="mb-12 scroll-mt-28">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Inclusion</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-green-700 mb-2">Included</h3>
            <ul className="space-y-1 text-sm">
              <li>✅ Hotel pickup</li>
              <li>✅ Transportation</li>
              <li>✅ Tour guide</li>
              <li>✅ Buffet lunch</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-red-600 mb-2">Excluded</h3>
            <ul className="space-y-1 text-sm">
              <li>❌ Tourist Ticket: Foreigners s/70 (US$19), Peruvians s/40</li>
              <li>❌ Salt Mines of Maras: Foreigners s/20 (US$5.5), Peruvians s/15</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="description" className="mb-12 scroll-mt-28">
        <h2 className="text-xl font-bold text-gray-800 mb-3">Description</h2>
         <p className="mt-2 text-sm text-text-body"
            dangerouslySetInnerHTML={{ __html: data?.description }}/>
      </section>

      <section id="what-to-bring" className="mb-12 scroll-mt-28">
        <h2 className="text-xl font-bold text-gray-800 mb-3">What to bring</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
          <li>Comfortable clothes</li>
          <li>Walking shoes</li>
          <li>Water bottle</li>
          <li>Sunscreen & hat</li>
        </ul>
      </section>

      <section id="cancellation" className="mb-12 scroll-mt-28">
        <h2 className="text-xl font-bold text-gray-800 mb-3">Cancellation</h2>
        <p className="text-sm text-gray-700">
          Free cancellation up to 24 hours in advance. No refunds after that
          time.
        </p>
      </section>

      <section id="reviews" className="mb-12 scroll-mt-28">
        <h2 className="text-xl font-bold text-gray-800 mb-3">Reviews</h2>
        <div className="space-y-2 text-sm text-gray-700">
          <p>⭐⭐⭐⭐⭐ "Amazing trip! Highly recommend."</p>
          <p>⭐⭐⭐⭐ "Great experience, but the bus was a little crowded."</p>
        </div>
      </section>
    </div>
  );
}
