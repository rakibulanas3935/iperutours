"use client";
import {
    createContext,
    useState,
    useContext,
    useEffect,
    useMemo,
} from "react";
import useAxiosGet from "../utils/useAxiosGet";

const EventContext = createContext();

const EventProvider = ({ children }) => {
    const [event, getAllEvent, eventLoading, setEvent] = useAxiosGet([]);
    const [reload, setReload] = useState(false);
    const [upcomingEvent, getAllUpComingEvent, upComingEventEventLoading, setUpcomignEvent] = useAxiosGet([]);
    // Fetch all events whenever component mounts or reload changes
    useEffect(() => {
        getAllEvent(`https://nova-next-gen-server.onrender.com/api/v1/events`);
        getAllUpComingEvent(`https://nova-next-gen-server.onrender.com/api/v1/events/top-five`);
    }, [reload]);

    const EventContextValue = useMemo(
        () => ({ event, setEvent, setReload, eventLoading ,upcomingEvent,upComingEventEventLoading}),
        [event, eventLoading,upcomingEvent,upComingEventEventLoading]
    );

    return (
        <EventContext.Provider value={EventContextValue}>
            {children}
        </EventContext.Provider>
    );
};

const useEventContext = () => {
    return useContext(EventContext);
};

export { EventProvider, useEventContext };
