"use client";
import {
    createContext,
    useState,
    useContext,
    useEffect,
    useMemo,
} from "react";
import useAxiosGet from "../utils/useAxiosGet";

const BookingContext = createContext();

const BookingProvider = ({ children }) => {
    const [booking, getAllbooking, bookingLoading, setbooking] = useAxiosGet([]);
    const [reload, setReload] = useState(false);

    // Fetch all bookings whenever component mounts or reload changes
    useEffect(() => {
        getAllbooking(`http://localhost:3000/api/v1/booking`);
    }, [reload]);

    const BookingContextValue = useMemo(
        () => ({ booking, setbooking, setReload, bookingLoading}),
        [booking, bookingLoading]
    );

    console.log('booking',booking)
    return (
        <BookingContext.Provider value={BookingContextValue}>
            {children}
        </BookingContext.Provider>
    );
};

const useBookingContext = () => {
    return useContext(BookingContext);
};

export { BookingProvider, useBookingContext };
