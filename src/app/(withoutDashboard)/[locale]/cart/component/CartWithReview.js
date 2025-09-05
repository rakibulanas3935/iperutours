'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import Link from 'next/link';
import CartPage from './CartPage';



export default function CartWithReview({onNext}) {

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column */}
            <div className='col-span-2'>
                <CartPage />
            </div>


            <div className='row-span-2'>
                <motion.div
                    className="w-full max-w-lg bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg p-6 sticky  top-10"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    
                    <div className="border-t pt-3 text-sm">
                        <div className='text-2xl'>Total</div>
                        <div className="flex justify-between">
                            <span>Base price</span>
                            <span className="font-semibold">US$ 400</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Services</span>
                            <span className="font-semibold">US$ 405</span>
                        </div>
                        <div className="flex justify-between border-t mt-2 pt-2 text-lg font-bold">
                            <span>Total</span>
                            <span>US$409</span>
                        </div>
                    </div>
                    {/* <BookingBox/> */}
                    {/* Book Button */}
                
                        <button className="mt-6 cursor-pointer w-full bg-brand-primary text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-brand-secondary transition-all"
                        onClick={onNext}>
                            Book Now
                        </button>
                 
                </motion.div>
            </div>
           

        </div>

    );
}
