'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import Link from 'next/link';
import CheckoutPage from './component/MultiStep';
import CartPage from './component/CartPage';


export default function SacredValleyTrip() {

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">     
                <CheckoutPage/>
        </div>

    );
}
