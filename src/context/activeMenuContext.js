"use client";
import {
    createContext,
    useState,
    useContext,
    useEffect,
    useMemo,
} from "react";
import useAxiosGet from "../utils/useAxiosGet";
import { data } from "autoprefixer";

const ActiveMenuContext = createContext();

const ActiveMenuProvider = ({ children }) => {
    const [activeMenu, getAllactiveMenu, activeMenuLoading, setactiveMenu] = useAxiosGet([]);
    const [reload, setReload] = useState(false);

    // Fetch all activeMenus whenever component mounts or reload changes
    useEffect(() => {
        getAllactiveMenu(`http://localhost:3000/api/v1/places`,(data)=>{
            setactiveMenu(data?.data[0])
        });
    }, [reload]);

    const ActiveMenuContextValue = useMemo(
        () => ({ activeMenu, setactiveMenu, setReload, activeMenuLoading,getAllactiveMenu }),
        [activeMenu, activeMenuLoading]
    );

    return (
        <ActiveMenuContext.Provider value={ActiveMenuContextValue}>
            {children}
        </ActiveMenuContext.Provider>
    );
};

const useActiveMenuContext = () => {
    return useContext(ActiveMenuContext);
};

export { ActiveMenuProvider, useActiveMenuContext };
