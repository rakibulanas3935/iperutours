"use client";
import {
    createContext,
    useState,
    useContext,
    useEffect,
    useMemo,
} from "react";
import useAxiosGet from "../utils/useAxiosGet";

const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
    const [categorys, getAllCategorys, categorysLoading, setCategorys] = useAxiosGet([]);
    const [reload, setReload] = useState(false);

    // Fetch all Categoryss whenever component mounts or reload changes
    useEffect(() => {
        getAllCategorys(`http://localhost:3000/api/v1/categories`);
    }, [reload]);

    const CategoryContextValue = useMemo(
        () => ({ categorys, setCategorys, setReload, categorysLoading}),
        [categorys, categorysLoading]
    );

    return (
        <CategoryContext.Provider value={CategoryContextValue}>
            {children}
        </CategoryContext.Provider>
    );
};

const useCategoryContext = () => {
    return useContext(CategoryContext);
};

export { CategoryProvider, useCategoryContext };
