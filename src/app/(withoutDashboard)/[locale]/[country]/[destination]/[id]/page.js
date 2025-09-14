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
import { useParams, useRouter } from 'next/navigation';
import PageNavigation from '@/component/common/PageNavigation';
import BookingCalculator from '@/component/common/BookingCalculator';
import BookingBox from '@/component/common/BookingBox';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { addToCart } from '@/component/common/cartUtils';
import { useCartContext } from '@/context/cartContext';

export default function SacredValleyTrip() {

    const [currentImage, setCurrentImage] = useState(0);
    const { counry,destination,id } = useParams();
    const router = useRouter();
    const [tourDetails, getTourDetails, tourDetailsLoading, setTourDetails] = useAxiosGet([]);
    const today = new Date(); // Current date
    // const minDate = tourDetails?.data?.advanceTime ? new Date(tourDetails?.data?.advanceTime) : today;
    const [selectedDate, setSelectedDate] = useState(today);
    const [selectedSlot, setSelectedSlot] = useState("");
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
    const { reloadCart } = useCartContext()
    const [counts, setCounts] = useState({ adult: 1, child: 0, infant: 0 });
    const [people, setPeople] = useState(1);
    const [total, setTotal] = useState(0)
    useEffect(() => {
        getTourDetails(`http://localhost:3000/api/v1/tours/${id}`, (res) => {
            // const availableTimeSlot = res?.data?.timeSlots?.filter(slot => {
            //     const slotDate = new Date(selectedDate);
            //     slotDate?.setHours(slot.startHour, slot.startMinute, 0, 0);
            //     return slotDate >= res?.data?.advanceTime;
            // }) || [];
            // console.log(availableTimeSlot)
            // setAvailableTimeSlots(res?.data?.timeSlots)
            setTourDetails(res)
        });
    }, [id]);

    if (tourDetailsLoading) return <CommonLoader />;

    const images = tourDetails?.data?.images || [];

    const handleBooking = () => {
        const bookingData = {
            selectedDate: selectedDate,
            tour: tourDetails?.data,
            numberOfPeople: people,
            totalPrice: total,
            bookingDate: new Date().toISOString(),
        };
        const result = addToCart(bookingData);

        if (!result.success) {
            toast.success(result.message);
            return;
        }
        reloadCart()
        router.push('/cart');
    };


    console.log(tourDetails)

    const advanceTimeDate = new Date(tourDetails?.data?.advanceTime);

    const handleDateSelect = (date) => {
        setSelectedDate(date);

        // If the selected date is before advanceTime's date (midnight), show nothing
        if (date.setHours(0, 0, 0, 0) < advanceTimeDate.setHours(0, 0, 0, 0)) {
            setAvailableTimeSlots([]);
            setSelectedSlot("No slots available");
            return;
        }
        // Show only slots after advanceTime
        const filteredSlots = tourDetails?.data?.timeSlots?.filter(slot => {
            const slotDate = new Date(date);
            slotDate.setHours(slot.startHour, slot.startMinute, 0, 0);
            return slotDate >= advanceTimeDate;
        }) || [];
        setAvailableTimeSlots(filteredSlots);

        if (filteredSlots.length === 1) {
            const slot = filteredSlots[0];
            setSelectedSlot(
                `${String(slot.startHour).padStart(2, '0')}:${String(slot.startMinute).padStart(2, '0')} - ${String(slot.endHour).padStart(2, '0')}:${String(slot.endMinute).padStart(2, '0')}`
            );
        } else {
            setSelectedSlot("");
        }

    };


    return (
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column */}
            <div className='col-span-2'>
                {/* Image Hero */}
                {/* Tour Info */}

                <div className="mb-6">
                    <h1 className="text-3xl font-extrabold text-gray-900">
                        {tourDetails?.data?.title}
                    </h1>
                    <div className="flex items-center gap-2 mt-2 text-red-600 font-medium text-sm">
                        <MapPin size={16} />
                        {tourDetails?.data?.place?.placeName} , {tourDetails?.data?.country?.name}
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-sm">
                        <span className="text-green-600 font-semibold">
                            {tourDetails?.availability || 'Daily availability'}
                        </span>
                        {(() => {
                            const reviews = tourDetails?.data?.reviews;
                            const avg =
                                reviews?.length === 0
                                    ? 0
                                    : reviews?.reduce((sum, r) => sum + r.rating, 0) /
                                    reviews?.length;
                            const roundedAvg = Math.round(avg * 10) / 10;
                            return (
                                <div className="flex items-center gap-2">

                                    <div className="flex ">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <span
                                                key={i}
                                                className={`${i < Math.floor(roundedAvg)
                                                    ? "text-yellow-400"
                                                    : "text-gray-300"
                                                    }`}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>

                                </div>
                            );
                        })()}
                        <span className="text-gray-500">
                            ({tourDetails?.data?.reviews.length || 0} reviews)
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

                <PageNavigation destination={tourDetails?.data?.place?.placeName} country={tourDetails?.data?.country?.name} title={tourDetails?.data?.title} />
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
                            ${tourDetails?.data?.pricing?.basePrice}
                        </h2>
                        {(() => {
                            const reviews = tourDetails?.data?.reviews;
                            const avg =
                                reviews?.length === 0
                                    ? 0
                                    : reviews?.reduce((sum, r) => sum + r.rating, 0) /
                                    reviews?.length;
                            const roundedAvg = Math.round(avg * 10) / 10;
                            return (
                                <div className="flex items-center gap-2">

                                    <div className="flex ">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <span
                                                key={i}
                                                className={`${i < Math.floor(roundedAvg)
                                                    ? "text-yellow-400"
                                                    : "text-gray-300"
                                                    }`}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600">
                                        {roundedAvg} ({tourDetails?.data?.reviews?.length})
                                    </span>
                                </div>
                            );
                        })()}
                    </div>

                    <div className="mt-5">
                        <label className="font-medium text-gray-700">Select a date</label>
                        <div className="mt-2 border rounded-xl p-3 bg-white shadow-inner">
                            <DayPicker
                                mode="single"
                                selected={selectedDate}
                                onSelect={handleDateSelect}
                                month={today}
                                disabled={{ before: today }}
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
                    <div className='mt-3'>
                        <label className="font-medium text-gray-700">Sechedule</label>
                        <select
                            value={selectedSlot}
                            onChange={(e) => setSelectedSlot(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg shadow-sm border border-neutral-line text-text-body bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200"
                        >
                            <option value="" disabled>Select a time slot</option>
                            {availableTimeSlots?.length === 0 && <option disabled>No slots available</option>}
                            {availableTimeSlots?.map((slot, i) => (
                                <option key={i} value={`${slot?.startHour}:${slot?.startMinute}-${slot?.endHour}:${slot?.endMinute}`}>
                                    {`${String(slot?.startHour).padStart(2, '0')}:${String(slot.startMinute).padStart(2, '0')} - ${String(slot.endHour).padStart(2, '0')}:${String(slot?.endMinute).padStart(2, '0')}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Duration */}
                    <div className="mt-4 mb-4">
                        <label className="font-medium text-gray-700">Duration</label>
                        <div className="w-full border rounded-lg p-2 bg-gray-50 text-gray-700 text-sm">
                            {tourDetails?.data?.timeSlots?.length > 0
                                ? `${tourDetails.data.timeSlots[0].endHour - tourDetails.data.timeSlots[0].startHour} hours`
                                : Number(tourDetails?.data?.details?.duration) < 24
                                    ? `${tourDetails?.data?.details?.duration} hours`
                                    : `${Math.floor(Number(tourDetails?.data?.details?.duration) / 24)} days`}
                        </div>
                    </div>

                    {/* People */}

                    <BookingCalculator data={tourDetails?.data} total={total} setPeople={setPeople} people={people} setCounts={setCounts} counts={counts} setTotal={setTotal} />
                    {/* <BookingBox/> */}
                    {/* Book Button */}

                    <button className="mt-6 cursor-pointer w-full bg-brand-primary text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-brand-secondary transition-all"
                        onClick={handleBooking}
                    >
                        Book Now
                    </button>

                </motion.div>
            </div>
            <div className='col-span-2'>
                <TripTabs data={tourDetails?.data} />
            </div>

        </div>

    );
}
