"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";

const CartPage = () => {
    return (
        <div className="bg-gray-50 p-4 rounded-md shadow">
            {/* Table Header */}
            <div className="grid grid-cols-12 border-b pb-2 font-semibold text-gray-700">
                <div className="col-span-6">Tour</div>
                <div className="col-span-3">Price</div>
                <div className="col-span-3">Subtotal</div>
            </div>

            {/* Item 1 */}
            <div className="grid grid-cols-12 py-4 border-b items-start gap-3">
                {/* Delete Icon */}
                <div className="flex justify-center items-center">
                    <Trash2 className="text-red-500 cursor-pointer" size={28} />
                </div>

                {/* Tour Image */}
                <div className="col-span-3">
                    <Image
                        src="https://res.cloudinary.com/dvge54a7y/image/upload/v1756597597/kss9ei3hziitvtr8u6ur.jpg" // replace with your actual image path
                        alt="Tour Image"
                        width={300}
                        height={200}
                        className="rounded-md"
                    />
                </div>

                {/* Tour Info */}
                <div className="col-span-5 text-sm leading-relaxed">
                    <h3 className="text-brand-primary font-semibold mb-1">
                        Paracas, Ica, and Huacachina Oasis from Lima
                    </h3>
                    <p>
                        <span className="font-semibold">From:</span> September 9, 2025 –
                        4:30 am
                    </p>
                    <p>
                        <span className="font-semibold">To:</span> September 9, 2025 –
                        10:30 pm
                    </p>
                    <p>
                        <span className="font-semibold">Duration:</span> 18 hours
                    </p>
                    <p>
                        <span className="font-semibold">Adults:</span> 1
                    </p>
                </div>

                {/* Price & Subtotal */}
                <div className="col-span-3 flex justify-between items-start font-medium">
                    <span>US$50.00</span>
                    <span>US$50.00</span>
                </div>
            </div>

            {/* Item 2 */}
            <div className="grid grid-cols-12 py-4 border-b items-start gap-3">
                {/* Delete Icon */}
                <div className="flex justify-center items-center">
                    <Trash2 className="text-red-500 cursor-pointer" size={28} />
                </div>

                {/* Tour Image */}
                <div className="col-span-3">
                    <Image
                        src="https://res.cloudinary.com/dvge54a7y/image/upload/v1756597597/kss9ei3hziitvtr8u6ur.jpg" // replace with your actual image path
                        alt="Tour Image"
                        width={300}
                        height={200}
                        className="rounded-md"
                    />
                </div>

                {/* Tour Info */}
                <div className="col-span-5 text-sm leading-relaxed">
                    <h3 className="text-brand-primary font-semibold mb-1">
                        Paracas, Ica, and Huacachina Oasis from Lima
                    </h3>
                    <p>
                        <span className="font-semibold">From:</span> September 5, 2025 –
                        4:30 am
                    </p>
                    <p>
                        <span className="font-semibold">To:</span> September 5, 2025 –
                        10:30 pm
                    </p>
                    <p>
                        <span className="font-semibold">Duration:</span> 18 hours
                    </p>
                    <p>
                        <span className="font-semibold">Adults:</span> 1
                    </p>
                </div>

                {/* Price & Subtotal */}
                <div className="col-span-3 flex justify-between items-start font-medium">
                    <span>US$50.00</span>
                    <span>US$50.00</span>
                </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end mt-4">
                <button
                    type="submit"

                    className="px-4 py-2 rounded-md bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-secondary)] cursor-pointer transition text-white font-medium disabled:opacity-50"
                >
                    Update Cart
                </button>
            </div>
        </div>
    );
};

export default CartPage;
