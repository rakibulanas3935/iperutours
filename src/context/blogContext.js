"use client";
import {
    createContext,
    useState,
    useContext,
    useEffect,
    useMemo,
} from "react";
import useAxiosGet from "../utils/useAxiosGet";

const BlogContext = createContext();

const BlogProvider = ({ children }) => {
    const [blogs, getAllBlogs, blogsLoading, setBlogs] = useAxiosGet([]);
    const [reload, setReload] = useState(false);

    // Fetch all blogss whenever component mounts or reload changes
    useEffect(() => {
        getAllBlogs(`https://nova-next-gen-server.onrender.com/api/v1/blogs`);
    }, [reload]);

    const BlogContextValue = useMemo(
        () => ({ blogs, setBlogs, setReload, blogsLoading }),
        [blogs, blogsLoading]
    );

    return (
        <BlogContext.Provider value={BlogContextValue}>
            {children}
        </BlogContext.Provider>
    );
};

const useBlogContext = () => {
    return useContext(BlogContext);
};

export { BlogProvider, useBlogContext };
