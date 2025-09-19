"use client";
import {
    createContext,
    useState,
    useContext,
    useEffect,
    useMemo,
} from "react";
import useAxiosGet from "../utils/useAxiosGet";

const SettingContext = createContext();

const SettingProvider = ({ children }) => {
    const [settings, getAllsettings, settingsLoading, setsettings] = useAxiosGet([]);
    const [reload, setReload] = useState(false);

    // Fetch all settingss whenever component mounts or reload changes
    useEffect(() => {
        getAllsettings(`http://localhost:3000/api/v1/settings`);
    }, [reload]);

    const SettingContextValue = useMemo(
        () => ({ settings, setsettings, setReload, settingsLoading }),
        [settings, settingsLoading]
    );

    return (
        <SettingContext.Provider value={SettingContextValue}>
            {children}
        </SettingContext.Provider>
    );
};

const useSettingContext = () => {
    return useContext(SettingContext);
};

export { SettingProvider, useSettingContext };
