"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function BookingCalculator() {
  // Prices
  const basePricePerPerson = 50; // Example: $50 per person
  const services = [
    { id: "lunch", name: "Lunch", price: 20 },
    { id: "sunset", name: "Sunset experience + hotel pickup", price: 40 },
    { id: "pickup", name: "Hotel pickup", price: 15 },
  ];

  const [counts, setCounts] = useState({ adult: 1, child: 0, infant: 0 });
  const [people, setPeople] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Update people count when counts change
  useEffect(() => {
    const totalPeople = counts.adult + counts.child + counts.infant;
    setPeople(totalPeople);
  }, [counts]);

  const handleIncrement = (type) => {
    setCounts((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const handleDecrement = (type) => {
    setCounts((prev) => ({
      ...prev,
      [type]: prev[type] > 0 ? prev[type] - 1 : 0,
    }));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle service toggle
  const handleServiceToggle = (id) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  // Calculate totals
  const basePrice = people * basePricePerPerson;
  const servicesTotal = selectedServices.reduce((sum, id) => {
    const service = services.find((s) => s.id === id);
    return sum + (service ? service.price : 0);
  }, 0);
  const total = basePrice + servicesTotal;

  return (
    <div className="max-w-sm mx-auto space-y-4">
      {/* Number of people dropdown */}
      <div className="relative" ref={dropdownRef}>
        <label className="font-medium text-gray-700 mb-1 block">
          N° of people:
        </label>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="w-full border rounded-md px-4 py-2 flex items-center justify-between bg-white text-gray-800"
        >
          {people} {people === 1 ? "person" : "persons"}
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>

        {open && (
          <div className="absolute z-10 mt-2 w-full border rounded-md shadow-lg bg-white p-4">
            {[
              { key: "adult", label: "Adults" },
              { key: "child", label: "Children (6–12 yrs)" },
              { key: "infant", label: "Infant (0–5 yrs)" },
            ].map(({ key, label }) => (
              <div
                key={key}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <span className="text-gray-700">{label}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDecrement(key)}
                    className={`w-7 h-7 flex items-center justify-center border rounded ${
                      counts[key] === 0
                        ? "text-gray-400 border-gray-300 cursor-not-allowed"
                        : "text-red-500 border-red-500 hover:bg-red-50"
                    }`}
                    disabled={counts[key] === 0}
                  >
                    −
                  </button>
                  <span className="w-6 text-center">{counts[key]}</span>
                  <button
                    onClick={() => handleIncrement(key)}
                    className="w-7 h-7 flex items-center justify-center border rounded text-green-600 border-green-600 hover:bg-green-50"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={() => setOpen(false)}
              className="text-red-500 text-sm font-medium mt-3 hover:underline"
            >
              Close
            </button>
          </div>
        )}
      </div>

      {/* Services */}
      <div>
        <p className="font-semibold mb-2">Tickets/Services</p>
        {services.map((service) => (
          <label
            key={service.id}
            className="flex items-center gap-2 mb-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedServices.includes(service.id)}
              onChange={() => handleServiceToggle(service.id)}
              className="w-4 h-4"
            />
            <span>
              {service.name} (+US${service.price})
            </span>
          </label>
        ))}
      </div>

      {/* Price Details */}
      <div className="border-t pt-3 text-sm">
        <div className="flex justify-between">
          <span>Base price</span>
          <span className="font-semibold">US${basePrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Services</span>
          <span className="font-semibold">US${servicesTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between border-t mt-2 pt-2 text-lg font-bold">
          <span>Total</span>
          <span>US${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
