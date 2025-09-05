"use client";
import {
    createContext,
    useState,
    useContext,
    useEffect,
    useMemo,
} from "react";
import useAxiosGet from "../utils/useAxiosGet";

const CountryContext = createContext();

const CountryProvider = ({ children }) => {
    const [country, getAllcountry, countryLoading, setcountry] = useAxiosGet([]);
    const [reload, setReload] = useState(false);

    // Fetch all countrys whenever component mounts or reload changes
    useEffect(() => {
        getAllcountry(`http://localhost:3000/api/v1/country`);
    }, [reload]);

    const CountryContextValue = useMemo(
        () => ({ country, setcountry, setReload, countryLoading}),
        [country, countryLoading]
    );

    return (
        <CountryContext.Provider value={CountryContextValue}>
            {children}
        </CountryContext.Provider>
    );
};

const useCountryContext = () => {
    return useContext(CountryContext);
};

export { CountryProvider, useCountryContext };
