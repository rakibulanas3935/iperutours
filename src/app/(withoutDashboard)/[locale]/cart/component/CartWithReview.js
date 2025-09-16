'use client';

import { motion } from 'framer-motion';
import 'react-day-picker/dist/style.css';
import CartPage from './CartPage';
import { useCartContext } from '@/context/cartContext';

export default function CartWithReview({ onNext }) {
    const { cartItem } = useCartContext();

    // ✅ Calculate total dynamically
    const basePrice = cartItem.reduce((sum, item) => sum + (item?.basePrice || 0), 0);

    const servicesFee = cartItem.reduce((sum, item) => {
        const serviceTotal = item.selectedServices?.reduce(
            (sSum, service) => sSum + (service.price || 0),
            0
        ) || 0;
        return sum + serviceTotal;
    }, 0);

    const totalPrice = basePrice + servicesFee;

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column */}
            <div className='col-span-2'>
                <CartPage cartItem={cartItem} />
            </div>

            {/* Right Column */}
            <div className='row-span-2'>
                <motion.div
                    className="w-full max-w-lg bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg p-6 sticky top-10"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="border-t pt-3 text-sm">
                        <div className='text-2xl font-bold mb-3'>Ready to Go?</div>
                        <div className="flex justify-between mb-2">
                            <span>Base price</span>
                            <span className="font-semibold">US$ {basePrice}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Services</span>
                            <span className="font-semibold">US$ {servicesFee}</span>
                        </div>
                        <div className="flex justify-between border-t mt-2 pt-2 text-lg font-bold">
                            <span>Total</span>
                            <span>US$ {totalPrice}</span>
                        </div>
                    </div>

                    {/* Book Button */}
                    <button
                        className="mt-6 cursor-pointer w-full bg-brand-primary text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-brand-secondary transition-all"
                        onClick={onNext}
                    >
                        Proceed to Checkout
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
