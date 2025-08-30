"use client"
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const Header = () => {
    return (
        <motion.header
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-40 mt-20 sm:mt-24"
        >

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
                    {/* Animated background effect */}
                    <motion.div 
                        className="absolute inset-0 opacity-30"
                        animate={{
                            background: [
                                'radial-gradient(circle at 0% 0%, #4F46E5, transparent)',
                                'radial-gradient(circle at 100% 100%, #4F46E5, transparent)',
                                'radial-gradient(circle at 0% 0%, #4F46E5, transparent)',
                            ],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />

                    <div className="relative px-6 py-8 sm:px-8 sm:py-12">
                        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
                            {/* Content */}
                            <div className="flex flex-col justify-center">
                                <motion.h2 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400"
                                >
                                    Our Missions
                                </motion.h2>
                                
                                <motion.p 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="mt-4 text-lg text-gray-300"
                                >
                                   Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus sint similique vel aperiam debitis, natus eos recusandae nisi amet! Deserunt sint sit excepturi aspernatur ipsum vel iste perspiciatis odit ab?
                                </motion.p>

                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="mt-6 flex flex-wrap gap-4"
                                >
                                    <Link href="/events">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-semibold transition-all hover:shadow-lg hover:shadow-purple-500/25"
                                        >
                                            View Events
                                        </motion.button>
                                    </Link>
                                    <Link href="/join">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg text-white font-semibold transition-all hover:bg-white/20"
                                        >
                                            Join Club
                                        </motion.button>
                                    </Link>
                                </motion.div>
                            </div>

                            {/* Stats or Featured Image */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 }}
                                className="relative lg:h-full"
                            >
                                <div className="grid grid-cols-2 gap-4 h-full">
                                    {['Members', 'Events', 'Projects', 'Awards'].map((label, index) => (
                                        <motion.div
                                            key={label}
                                            whileHover={{ scale: 1.05 }}
                                            className="flex flex-col items-center justify-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
                                        >
                                            <span className="text-3xl font-bold text-white">
                                                {[200, 50, 30, 15][index]}+
                                            </span>
                                            <span className="mt-2 text-sm text-gray-300">
                                                {label}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.header>
    )
}

export default Header