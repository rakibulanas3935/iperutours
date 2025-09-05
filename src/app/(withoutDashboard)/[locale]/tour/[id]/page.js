'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import TripTabs from '@/component/common/TripTabs';
import useAxiosGet from '@/utils/useAxiosGet';
import CommonLoader from '@/component/common/CommonLoader';
import { useParams } from 'next/navigation';
import PageNavigation from '@/component/common/PageNavigation';
import BookingCalculator from '@/component/common/BookingCalculator';
import BookingBox from '@/component/common/BookingBox';
import Link from 'next/link';

export default function SacredValleyTrip() {
    const [selectedDate, setSelectedDate] = useState();
    const [currentImage, setCurrentImage] = useState(0);
    const { id } = useParams();
    const [tourDetails, getTourDetails, tourDetailsLoading] = useAxiosGet([]);
    console.log("tourDetails",tourDetails)

    useEffect(() => {
        getTourDetails(`http://localhost:3000/api/v1/tours/${id}`);
    }, [id]);

    if (tourDetailsLoading) return <CommonLoader />;

    const images = tourDetails?.data?.images || [];

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column */}
            <div className='col-span-2'>
                {/* Image Hero */}
                {/* Tour Info */}

                <div className="mb-6">
                    <h1 className="text-3xl font-extrabold text-gray-900">
                        {tourDetails?.title || 'Complete Sacred Valley Day Trip'}
                    </h1>
                    <div className="flex items-center gap-2 mt-2 text-red-600 font-medium text-sm">
                        <MapPin size={16} />
                        {tourDetails?.location || 'Cusco, Peru'}
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-sm">
                        <span className="text-green-600 font-semibold">
                            {tourDetails?.availability || 'Daily availability'}
                        </span>
                        <span className="text-yellow-500">★★★★★</span>
                        <span className="text-gray-500">
                            ({tourDetails?.reviews || 8} reviews)
                        </span>
                    </div>
                    {/* <div className="mt-4 text-gray-500 text-sm">
                            Home / <span className="text-orange-500">Peru</span> /{' '}
                            <span className="text-orange-500">Cusco</span>
                        </div> */}
                   
                </div>
                <motion.div
                    className="relative w-full h-[450px] rounded-2xl overflow-hidden shadow-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    {images.length > 0 && (
                        <>
                            <Image
                                src={images[currentImage]}
                                alt={tourDetails?.title}
                                fill
                                className="object-cover"
                            />
                            {/* Carousel Arrows */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow transition"
                                        onClick={() =>
                                            setCurrentImage((prev) =>
                                                prev === 0 ? images.length - 1 : prev - 1
                                            )
                                        }
                                    >
                                        <ArrowLeft size={20} />
                                    </button>
                                    <button
                                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow transition"
                                        onClick={() =>
                                            setCurrentImage((prev) =>
                                                prev === images.length - 1 ? 0 : prev + 1
                                            )
                                        }
                                    >
                                        <ArrowRight size={20} />
                                    </button>
                                </>
                            )}
                        </>
                    )}
                </motion.div>

                <PageNavigation title={tourDetails?.data?.place?.placeName} />
                {/* Thumbnails */}
                {/* <div className="flex mt-4 gap-3 overflow-x-auto">
                        {images.map((img, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.1 }}
                                className={`relative w-20 h-20 flex-shrink-0 rounded-lg cursor-pointer overflow-hidden border-2 transition ${currentImage === index
                                    ? 'border-green-500 shadow-lg'
                                    : 'border-gray-300'
                                    }`}
                                onClick={() => setCurrentImage(index)}
                            >
                                <Image src={img} alt={tourDetails?.title} fill className="object-cover" />
                            </motion.div>
                        ))}
                    </div> */}


            </div>


            <div className='row-span-2'>
                <motion.div
                    className="w-full max-w-lg bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg p-6 sticky  top-10"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-green-600">
                            ${tourDetails?.price || '24.00'}
                        </h2>
                        <span className="text-yellow-500">★★★★★</span>
                    </div>

                    {/* Modern Date Picker */}
                    <div className="mt-5">
                        <label className="font-medium text-gray-700">Select a date</label>
                        <div className="mt-2 border rounded-xl p-3 bg-white shadow-inner">
                            <DayPicker
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                defaultMonth={new Date(2025, 7)}
                                styles={{
                                    caption: { color: '#111827', fontWeight: 600, fontSize: '1.1rem' },
                                    head: { color: '#6B7280', fontWeight: 500 },
                                    day: {
                                        borderRadius: '0.1rem',
                                        padding: '0.1rem',
                                        margin: '2px',
                                        color: '#374151',
                                        fontWeight: 500,
                                        transition: 'all 0.2s ease-in-out',
                                    },
                                    day_hover: {
                                        backgroundColor: '#f0fdf4',
                                        color: '#16a34a',
                                        cursor: 'pointer',
                                    },
                                    day_selected: {
                                        backgroundColor: '#22c55e',
                                        color: 'white',
                                        fontWeight: 600,
                                        boxShadow: '0 4px 12px rgba(34, 197, 94, 0.4)',
                                    },
                                    day_today: {
                                        color: '#16a34a',
                                        fontWeight: 600,
                                        border: '1px solid #22c55e',
                                    },
                                    day_outside: {
                                        color: '#d1d5db',
                                    },
                                }}
                                modifiersStyles={{
                                    disabled: {
                                        color: '#e5e7eb',
                                        cursor: 'not-allowed',
                                    },
                                }}
                            />
                        </div>
                    </div>

                    {/* Duration */}
                    <div className="mt-4 mb-4">
                        <label className="font-medium text-gray-700">Duration</label>
                        <div className="w-full border rounded-lg p-2 bg-gray-50 text-gray-700 text-sm">
                            {tourDetails?.duration || '11 hours'}
                        </div>
                    </div>

                    {/* People */}

                    <BookingCalculator />
                    {/* <BookingBox/> */}
                    {/* Book Button */}
                    <Link href="/cart">
                        <button className="mt-6 cursor-pointer w-full bg-brand-primary text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-brand-secondary transition-all">
                            Book Now
                        </button>
                    </Link>
                </motion.div>
            </div>
            <div className='col-span-2'>
                <TripTabs data={tourDetails?.data} />
            </div>

        </div>

    );
}
