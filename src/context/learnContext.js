"use client";
import {
    createContext,
    useState,
    useContext,
    useEffect,
    useMemo,
} from "react";
import useAxiosGet from "../utils/useAxiosGet";

const LearnContext = createContext();

const LearnProvider = ({ children }) => {
    const [learn, getAlllearn, learnLoading, setlearn] = useAxiosGet([]);
    const [reload, setReload] = useState(false);

    // Fetch all learns whenever component mounts or reload changes
    useEffect(() => {
        getAlllearn(`https://nova-next-gen-server.onrender.com/api/v1/learn`);
    }, [reload]);

    const LearnContextValue = useMemo(
        () => ({ learn, setlearn, setReload, learnLoading }),
        [learn, learnLoading]
    );

    return (
        <LearnContext.Provider value={LearnContextValue}>
            {children}
        </LearnContext.Provider>
    );
};

const useLearnContext = () => {
    return useContext(LearnContext);
};

export { LearnProvider, useLearnContext };
