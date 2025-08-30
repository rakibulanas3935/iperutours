"use client";
import {
    createContext,
    useState,
    useContext,
    useEffect,
    useMemo,
} from "react";
import useAxiosGet from "../utils/useAxiosGet";

const NewPlaceContext = createContext();

const NewPlaceProvider = ({ children }) => {
    const [newPlace, getAllnewPlace, newPlaceLoading, setnewPlace] = useAxiosGet([]);
    const [reload, setReload] = useState(false);

    // Fetch all newPlaces whenever component mounts or reload changes
    useEffect(() => {
        getAllnewPlace(`http://localhost:3000/api/v1/places`);
    }, [reload]);

    const NewPlaceContextValue = useMemo(
        () => ({ newPlace, setnewPlace, setReload, newPlaceLoading }),
        [newPlace, newPlaceLoading]
    );

    return (
        <NewPlaceContext.Provider value={NewPlaceContextValue}>
            {children}
        </NewPlaceContext.Provider>
    );
};

const useNewPlaceContext = () => {
    return useContext(NewPlaceContext);
};

export { NewPlaceProvider, useNewPlaceContext };
