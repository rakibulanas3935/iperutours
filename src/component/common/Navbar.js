"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useUserContext } from '@/app/context/userContext';
import CommonLoader from './CommonLoader';


const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const { user,userLoading } = useUserContext();
    console.log('User', user)
    // Handle scroll event
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About Us' },
        { href: '/join', label: 'Join' },
        { href: '/events', label: 'Events' },
        { href: '/projects', label: 'Projects' },
        { href: '/learn', label: 'Learn' },
        { href: '/gallery', label: 'Gallery' },
        { href: '/blog', label: 'Blog' },
        // { href: '/merchantdise', label: 'Merchandise' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed  w-full !z-[50]"
        >
            <div className={`mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isScrolled ? 'bg-black/50' : 'bg-transparent'
                } backdrop-blur-md border-b border-white/10 rounded-lg max-w-7xl my-2 !overflow-hidden`}>
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex-shrink-0"
                    >
                        <Link href="/" className="text-white text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                            Deep Sky Society
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className=" flex items-center space-x-4">
                            {navLinks.map((link) => (
                                <motion.div
                                    key={link.href}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        href={link.href}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === link.href
                                            ? 'text-white bg-white/10'
                                            : 'text-gray-300 hover:text-white hover:bg-white/10'
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                            {
                                user ? (
                                    <motion.div
                                    key={'/dashboard'}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        href={'/dashboard'}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === '/dashboard'
                                            ? 'text-white bg-white/10'
                                            : 'text-gray-300 hover:text-white hover:bg-white/10'
                                            }`}
                                    >
                                        Dashboard
                                    </Link>
                                </motion.div>

                                ) : <motion.div
                                    key={'/login'}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        href={'/login'}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === '/login'
                                            ? 'text-white bg-white/10'
                                            : 'text-gray-300 hover:text-white hover:bg-white/10'
                                            }`}
                                    >
                                        Login
                                    </Link>
                                </motion.div>
                            }


                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            <div className="relative w-6 h-6">
                                <span className={`absolute block w-full h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 top-3' : 'top-1'
                                    }`} />
                                <span className={`absolute block w-full h-0.5 bg-current transform transition-all duration-300 top-3 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                                    }`} />
                                <span className={`absolute block w-full h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 top-3' : 'top-5'
                                    }`} />
                            </div>
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <motion.div
                    initial={false}
                    animate={{ height: isMobileMenuOpen ? 'auto' : 0 }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden overflow-hidden"
                >
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navLinks.map((link) => (
                            <motion.div
                                key={link.href}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    href={link.href}
                                    className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${pathname === link.href
                                        ? 'text-white bg-white/10'
                                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                                        }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}
                        {
                                user ? (
                                    <motion.div
                                    key={'/dashboard'}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        href={'/dashboard'}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === '/dashboard'
                                            ? 'text-white bg-white/10'
                                            : 'text-gray-300 hover:text-white hover:bg-white/10'
                                            }`}
                                    >
                                        Dashboard
                                    </Link>
                                </motion.div>

                                ) : <motion.div
                                    key={'/login'}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        href={'/login'}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === '/login'
                                            ? 'text-white bg-white/10'
                                            : 'text-gray-300 hover:text-white hover:bg-white/10'
                                            }`}
                                    >
                                        Login
                                    </Link>
                                </motion.div>
                            }

                    </div>
                </motion.div>
            </div>
        </motion.nav>
    );
};

export default Navbar;