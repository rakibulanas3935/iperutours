"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useCartContext } from "@/context/cartContext";
import { removeFromCart } from "@/component/common/cartUtils";


const CartPage = () => {
  const { cartItem, reloadCart } = useCartContext();

  const handleDelete = (tourId, selectedDate) => {
    removeFromCart(tourId, selectedDate);
    reloadCart(); // Update context
  };
  console.log(cartItem)
  return (
    <div className="bg-gray-50 p-4 rounded-md shadow">
      {/* Table Header */}
      <div className="grid grid-cols-12 border-b pb-2 font-semibold text-gray-700">
        <div className="col-span-1"></div> {/* Trash Icon */}
        <div className="col-span-3">Tour</div>
        <div className="col-span-5">Details</div>
        <div className="col-span-3">Price</div>
      </div>

      {/* Cart Items */}
      {cartItem.length === 0 && (
        <p className="text-center py-6 col-span-12 text-gray-500">
          Your cart is empty.
        </p>
      )}

      {cartItem.map((item, idx) => (
        <div
          key={idx}
          className="grid grid-cols-12 py-4 border-b items-start gap-3"
        >
          {/* Delete Icon */}
          <div className="flex justify-center items-start">
            <Trash2
              className="text-red-500 cursor-pointer"
              size={24}
              onClick={() =>
                handleDelete(item.tour._id, item.selectedDate)
              }
            />
          </div>

          {/* Tour Image */}
          <div className="col-span-3">
            {item?.tour?.images?.[0] && (
              <Image
                src={item.tour.images[0]}
                alt={item.tour.title}
                width={300}
                height={200}
                className="rounded-md object-cover"
              />
            )}
          </div>

          {/* Tour Info */}
          <div className="col-span-5 text-sm leading-relaxed">
            <h3 className="text-brand-primary font-semibold mb-1">
              {item.tour.title}
            </h3>
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {new Date(item.bookingDate).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Duration:</span>{" "}
              {item.tour.duration || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Number of People:</span>{" "}
              {item.numberOfPeople}
            </p>
          </div>

          {/* Price */}
          <div className="col-span-3 flex justify-start items-start font-medium">
            <span>US${item.totalPrice}</span>
          </div>
        </div>
      ))}

      {/* Footer */}
      {cartItem.length > 0 && (
        <div className="flex justify-end mt-4">
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-secondary)] cursor-pointer transition text-white font-medium disabled:opacity-50"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
