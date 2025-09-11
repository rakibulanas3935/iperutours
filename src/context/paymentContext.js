"use client";
import {
    createContext,
    useState,
    useContext,
    useEffect,
    useMemo,
} from "react";
import useAxiosGet from "../utils/useAxiosGet";

const PaymentContext = createContext();

const PaymentProvider = ({ children }) => {
    const [payments, getAllpayments, paymentsLoading, setpayments] = useAxiosGet([]);
    const [reload, setReload] = useState(false);

    // Fetch all paymentss whenever component mounts or reload changes
    useEffect(() => {
        getAllpayments(`http://localhost:3000/api/v1/payment`);
    }, [reload]);

    const PaymentContextValue = useMemo(
        () => ({ payments, setpayments, setReload, paymentsLoading}),
        [payments, paymentsLoading]
    );

    console.log('payments',payments)
    return (
        <PaymentContext.Provider value={PaymentContextValue}>
            {children}
        </PaymentContext.Provider>
    );
};

const usePaymentContext = () => {
    return useContext(PaymentContext);
};

export { PaymentProvider, usePaymentContext };
