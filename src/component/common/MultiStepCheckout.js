"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import useAxiosPost from "@/utils/useAxiosPost";
import { useUserContext } from "@/context/userContext";
import { toast } from "react-toastify";
import { useCartContext } from "@/context/cartContext";

export default function CheckoutMultiPage() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { cartItem, reloadCart } = useCartContext();
  const { user, setReload } = useUserContext();
  const [, postUserinfo, postUserLoading] = useAxiosPost();
  const [, postBooking, postBookingLoading] = useAxiosPost();
  const basePrice = cartItem.reduce((sum, item) => sum + item.totalPrice, 0);
  // Fetch countries and states/districts
  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/states")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.data.map((c) => ({
          country: c.name,
          states: c.states.map((s) => s.name),
        }));
        setCountries(formatted);
      })
      .catch((err) => console.error(err));
  }, []);

  // Update districts when country changes
  useEffect(() => {
    const countryData = countries.find((c) => c.country === selectedCountry);
    setDistricts(countryData ? countryData.states : []);
    setSelectedDistrict("");
  }, [selectedCountry, countries]);

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;

    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const userName = form.userName.value;
    const email = form.email.value;
    const whatsapp = form.whatsApp.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (!firstName) {
      toast.warn("First Name Required");
      return;
    }
    if (!lastName) {
      toast.warn("Last Name Required");
      return;
    }
    if (!userName) {
      toast.warn("User Name Required");
      return;
    }
    if (!email) {
      toast.warn("Email Required");
      return;
    }
    if (password !== confirmPassword) {
      toast.warn("Passwords do not match!");
      return;
    }



    postUserinfo(
      "http://localhost:3000/api/v1/users/signup",
      {
        firstName,
        lastName,
        userName,
        country: selectedCountry,
        district: selectedDistrict,
        email,
        whatsapp,
        password,
        passwordConfirm: confirmPassword,
      },
      (res) => {
        if (res?.status === "success") {
          localStorage.setItem("token", res.token);
          setReload((prev) => !prev);
          form.reset();
          setSelectedCountry("");
          setSelectedDistrict("");
        }

      },
      true
    );
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      toast.warn("You must be logged in to place a booking.");
      return;
    }

    if (cartItem.length === 0) {
      toast.warn("Your cart is empty!");
      return;
    }

    try {
      for (const item of cartItem) {
        const payload = {
          tourId: item.tour._id,
          userId: user._id,
          travelDate: item.selectedDate,
          numberOfPeople: item.numberOfPeople,
          specialRequest: "", 
        };

        postBooking(
          "http://localhost:3000/api/v1/booking",
          payload,
          (res) => {
            if (res?.status === "success") {
              localStorage.removeItem("cart"); 
              reloadCart()
            } else {
              toast.error(`Booking failed for ${item.tour.title}`);
            }
          },
          true
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while placing bookings.");
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col py-10">
      <div className="flex flex-col lg:flex-row max-w-6xl mx-auto gap-6 px-4">
        {/* Left side: Contact form */}
        {
          user ? <></> : <form
            className="flex-1 bg-white border border-gray-200 rounded-xl p-6 shadow-md"
            onSubmit={handleRegister}
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Contact Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="firstName"
                placeholder="First Name *"
                className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition"
              />
              <input
                name="lastName"
                placeholder="Last Name"
                className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition"
              />
            </div>

            {/* Country Dropdown */}
            <select
              className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none mt-4"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c.country} value={c.country}>
                  {c.country}
                </option>
              ))}
            </select>

            {/* District Dropdown */}
            <select
              className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none mt-4"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
            >
              <option value="">Select District</option>
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <input
              name="whatsApp"
              placeholder="WhatsApp (optional)"
              className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition w-full mt-4"
            />
            <input
              name="userName"
              placeholder="User Name *"
              className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition w-full mt-4"
            />
            <input
              name="email"
              placeholder="Email Address *"
              className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition w-full mt-4"
            />

            {/* Password with toggle */}
            <div className="relative mt-4">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a Password *"
                className="w-full p-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-900"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="relative mt-4">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password *"
                className="w-full p-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-900"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <h3 className="font-medium mt-6 text-gray-700">Additional Information</h3>
            <textarea
              name="additionalInfo"
              placeholder="Hotel or pickup point (optional)"
              className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition w-full mt-2"
            />

            <button
              type="submit"
              className="mt-4 bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded-xl font-semibold transition"
            >
              {postUserLoading ? "Creating Account ..." : "Sing Up"}
            </button>
          </form>
        }


        {/* Right side: Reservation + Payment */}
        <div className="w-full space-y-6">
          {cartItem.length === 0 && (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}

          {cartItem.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-md"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Reservation</h2>
              <p className="text-sm text-gray-600">
                <strong>Tour:</strong> {item.tour.title}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Date:</strong>{" "}
                {new Date(item.selectedDate).toLocaleDateString()} –{" "}
                {new Date(item.selectedDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Duration:</strong> {item.tour.duration || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Adults:</strong> {item.numberOfPeople}
              </p>

              <div className="flex justify-between mt-4 text-gray-700">
                <span className="font-semibold">Subtotal</span>
                <span>US${item.totalPrice}</span>
              </div>
            </div>
          ))}

          {/* Payment Section */}
          {cartItem.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Credit or Debit Card</h2>
              <input
                placeholder="Card Number"
                className="border border-gray-300 p-2 rounded-lg w-full mb-2"
              />
              <div className="flex gap-2 mb-2">
                <input
                  placeholder="MM/YY"
                  className="border border-gray-300 p-2 rounded-lg w-1/2"
                />
                <input
                  placeholder="CVV"
                  className="border border-gray-300 p-2 rounded-lg w-1/2"
                />
              </div>
              <input
                placeholder="Card Holder Name"
                className="border border-gray-300 p-2 rounded-lg w-full mb-2"
              />
              <input
                placeholder="Email"
                className="border border-gray-300 p-2 rounded-lg w-full mb-2"
              />
              <div className="flex items-start mt-2">
                <input type="checkbox" className="mt-1" />
                <p className="text-xs ml-2 text-gray-600">
                  I agree to the <span className="text-green-600">terms and conditions</span>.
                </p>
              </div>
              <div className="flex justify-between mt-4 text-lg font-bold">
                <span>Total</span>
                <span>US${basePrice}</span>
              </div>
              <button className="mt-4 bg-green-600 cursor-pointer hover:bg-green-700 text-white w-full py-3 rounded-xl font-semibold transition" onClick={handleBooking}>
                PLACE BOOKING
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
