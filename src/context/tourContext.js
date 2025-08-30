"use client";
import {
    createContext,
    useState,
    useContext,
    useEffect,
    useMemo,
} from "react";
import useAxiosGet from "../utils/useAxiosGet";

const TourContext = createContext();

const TourProvider = ({ children }) => {
    const [tours, getAlltours, toursLoading, settours] = useAxiosGet([]);
    const [reload, setReload] = useState(false);

    // Fetch all tourss whenever component mounts or reload changes
    useEffect(() => {
        getAlltours(`http://localhost:3000/api/v1/tours`);
    }, [reload]);

    const TourContextValue = useMemo(
        () => ({ tours, settours, setReload, toursLoading }),
        [tours, toursLoading]
    );

    return (
        <TourContext.Provider value={TourContextValue}>
            {children}
        </TourContext.Provider>
    );
};

const useTourContext = () => {
    return useContext(TourContext);
};

export { TourProvider, useTourContext };
