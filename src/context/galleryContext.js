"use client";
import {
    createContext,
    useState,
    useContext,
    useEffect,
    useMemo,
} from "react";
import useAxiosGet from "../utils/useAxiosGet";

const GalleryContext = createContext();

const GalleryProvider = ({ children }) => {
    const [gallery, getAllgallery, galleryLoading, setgallery] = useAxiosGet([]);
    const [reload, setReload] = useState(false);

    // Fetch all gallerys whenever component mounts or reload changes
    useEffect(() => {
        getAllgallery(`https://nova-next-gen-server.onrender.com/api/v1/gallery/approved`);
    }, [reload]);

    const GalleryContextValue = useMemo(
        () => ({ gallery, setgallery, setReload, galleryLoading }),
        [gallery, galleryLoading]
    );

    return (
        <GalleryContext.Provider value={GalleryContextValue}>
            {children}
        </GalleryContext.Provider>
    );
};

const useGalleryContext = () => {
    return useContext(GalleryContext);
};

export { GalleryProvider, useGalleryContext };
