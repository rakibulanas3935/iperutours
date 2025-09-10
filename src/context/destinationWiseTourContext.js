"use client";
import {
    createContext,
    useState,
    useContext,
    useEffect,
    useMemo,
} from "react";
import useAxiosGet from "../utils/useAxiosGet";

const DestinationWiseTourContext = createContext();

const DestinationWiseTourProvider = ({ children }) => {
    const [destinationWiseTour, getAlldestinationWiseTour, destinationWiseTourLoading, setdestinationWiseTour] = useAxiosGet([]);
    const [reload, setReload] = useState(false);

    // Fetch all destinationWiseTours whenever component mounts or reload changes
    useEffect(() => {
        getAlldestinationWiseTour(`http://localhost:3000/api/v1/places/destination/tours`);
    }, [reload]);

    const DestinationWiseTourContextValue = useMemo(
        () => ({ destinationWiseTour, setdestinationWiseTour, setReload, destinationWiseTourLoading}),
        [destinationWiseTour, destinationWiseTourLoading]
    );

    return (
        <DestinationWiseTourContext.Provider value={DestinationWiseTourContextValue}>
            {children}
        </DestinationWiseTourContext.Provider>
    );
};

const useDestinationWiseTourContext = () => {
    return useContext(DestinationWiseTourContext);
};

export { DestinationWiseTourProvider, useDestinationWiseTourContext };
