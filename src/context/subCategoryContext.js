"use client";
import {
    createContext,
    useState,
    useContext,
    useEffect,
    useMemo,
} from "react";
import useAxiosGet from "../utils/useAxiosGet";

const SubCategoryContext = createContext();

const SubCategoryProvider = ({ children }) => {
    const [subCategorys, getAllsubCategorys, subCategorysLoading, setsubCategorys] = useAxiosGet([]);
    const [reload, setReload] = useState(false);

    // Fetch all subCategoryss whenever component mounts or reload changes
    useEffect(() => {
        getAllsubCategorys(`http://localhost:3000/api/v1/subcategories`);
    }, [reload]);

    const SubCategoryContextValue = useMemo(
        () => ({ subCategorys, setsubCategorys, setReload, subCategorysLoading}),
        [subCategorys, subCategorysLoading]
    );

    console.log('subCategorys',subCategorys)
    return (
        <SubCategoryContext.Provider value={SubCategoryContextValue}>
            {children}
        </SubCategoryContext.Provider>
    );
};

const useSubCategoryContext = () => {
    return useContext(SubCategoryContext);
};

export { SubCategoryProvider, useSubCategoryContext };
