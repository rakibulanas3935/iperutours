"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useEventContext } from "@/app/context/eventContext";
import CommonLoader from "../common/CommonLoader";
import Link from "next/link";
import { Loader } from "lucide-react";

export default function Hero() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const { upcomingEvent, upComingEventEventLoading } = useEventContext()

    useEffect(() => {
        const eventTime = upcomingEvent?.data?.events[0]?.eventTime;
        if (!eventTime) return; // Don't start timer until we have a valid date

        const targetDate = new Date(eventTime).getTime();

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const diff = targetDate - now;

            if (diff <= 0) {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / (1000 * 60)) % 60),
                seconds: Math.floor((diff / 1000) % 60),
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [upcomingEvent?.data?.events[0]?.eventTime]);


    return (
        <div className="relative min-h-screen overflow-hidden bg-[#05010e] text-white">
            {/* Cosmic gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#05010e] via-[#120851] to-[#05010e]" />

            {/* Nebula glow */}
            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-700/30 rounded-full blur-[200px]" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[180px]" />
            <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-[150px]" />

            {/* Stars */}
            <div className="absolute inset-0">
                {[...Array(80)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        initial={{ opacity: 0.1 }}
                        animate={{
                            opacity: [0.1, 1, 0.1],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            {/* Moon */}
            <motion.div
                className="absolute right-[10%] top-[15%] hidden sm:block sm:w-[270px] sm:h-[270px] rounded-full shadow-[0_0_60px_rgba(255,255,255,0.5)]"
                style={{
                    background: "radial-gradient(circle at 70% 70%, #ffffff, #d9d9d9)",
                    boxShadow:
                        "inset -25px -25px 40px rgba(0,0,0,0.3), 0 0 80px rgba(200,200,255,0.4)",
                }}
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                }}
            >
                {/* Moon craters with shadow */}
                <div className="absolute top-[30%] left-[20%] w-[40px] h-[40px] rounded-full bg-[rgba(0,0,0,0.1)] shadow-inner shadow-black/40" />
                <div className="absolute top-[50%] left-[50%] w-[30px] h-[30px] rounded-full bg-[rgba(0,0,0,0.1)] shadow-inner shadow-black/40" />
                <div className="absolute top-[20%] right-[30%] w-[25px] h-[25px] rounded-full bg-[rgba(0,0,0,0.1)] shadow-inner shadow-black/40" />
            </motion.div>

            {/* Rocket */}
            <motion.div
                initial={{ x: -200, y: 0, rotate: 0 }}
                animate={{
                    x: [-200, 1400],
                    y: [50, 20, -30, 0, -10], // combination of curves and flats
                    rotate: [0, 5, -5, 10], // gentle tilts
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: ["easeInOut", "linear", "easeInOut", "linear"], // mix of smooth and straight
                    times: [0, 0.2, 0.5, 0.8, 1], // sync curves/straights with position
                }}
                className="absolute top-1/2 left-0 flex flex-col items-center"
            >
                <Image
                    src="/rocket.png"
                    alt="Spaceship"
                    width={120}
                    height={120}
                    className="drop-shadow-[0_0_20px_rgba(255,150,50,0.6)]"
                />
            </motion.div>



            {/* Main content */}
            <div className="relative z-10 flex flex-col items-center text-center pt-32">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(180,150,255,0.4)]">
                    Explore the Cosmos
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl">
                    Join our community of stargazers and embark on a journey through the
                    wonders of the universe.
                </p>

                {/* Countdown box */}
                <Link href={`/events/${upcomingEvent?.data?.events[0]?._id}`}>
                    <div className="bg-[#0b1230]/80 border border-purple-500 rounded-xl p-6 w-[350px] h-[180px] shadow-lg shadow-purple-500/30 backdrop-blur-md flex items-center justify-center">
                        {upComingEventEventLoading ? (
                            <div className="flex flex-col items-center gap-3 text-slate-300">
                                <Loader className="w-6 h-6 animate-spin text-blue-400" />
                                <span className="text-lg font-medium">Loading ...</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center w-full">
                                <h2 className="text-xl font-semibold mb-4 text-center">
                                    {upcomingEvent?.data?.events[0]?.title}
                                </h2>
                                <div className="flex justify-center gap-4 text-center">
                                    {Object.entries(timeLeft).map(([label, value]) => (
                                        <div key={label}>
                                            <p className="text-3xl font-bold text-blue-300">{value}</p>
                                            <p className="uppercase text-xs text-gray-400">{label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                </Link>
                {/* Button */}
                <motion.a
                    href="/join"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 px-8 py-4 text-lg font-semibold text-white rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 transition-all shadow-[0_0_30px_rgba(140,100,255,0.4)]"
                >
                    Start Your Journey
                </motion.a>
            </div>
        </div>
    );
}
