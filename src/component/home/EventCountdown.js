"use client"
import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const CountdownUnit = ({ value, label }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center px-4"
    >
        <motion.div 
            className="w-24 h-24 relative bg-gradient-to-br from-purple-600/30 to-blue-600/30 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-2 border border-white/10"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(88, 28, 235, 0.3)" }}
            transition={{ duration: 0.2 }}
        >
            <span className="text-4xl font-bold text-white">{value}</span>
            <motion.div 
                className="absolute -inset-px bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl"
                animate={{
                    opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </motion.div>
        <span className="text-sm font-medium text-gray-300 uppercase tracking-wider">{label}</span>
    </motion.div>
)

const EventCountdown = ({ eventDate, eventName }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = new Date(eventDate).getTime() - new Date().getTime()
            
            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                })
            }
        }

        const timer = setInterval(calculateTimeLeft, 1000)
        calculateTimeLeft()

        return () => clearInterval(timer)
    }, [eventDate])

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 mt-12 border border-white/10"
        >
            <motion.h3 
                className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 text-center mb-8"
                animate={{
                    backgroundPosition: ["0%", "100%"],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
            >
                {eventName}
            </motion.h3>
            <div className="flex flex-wrap justify-center gap-6">
                <CountdownUnit value={timeLeft.days} label="Days" />
                <CountdownUnit value={timeLeft.hours} label="Hours" />
                <CountdownUnit value={timeLeft.minutes} label="Minutes" />
                <CountdownUnit value={timeLeft.seconds} label="Seconds" />
            </div>
        </motion.div>
    )
}

export default EventCountdown