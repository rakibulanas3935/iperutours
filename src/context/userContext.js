"use client";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import useAxiosGet from "../utils/useAxiosGet";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [users, getAllusers, userLoading, setALluser] = useAxiosGet([])
  const fetchCurrentUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        " https://nova-next-gen-server.onrender.com/api/v1/users/current-user",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch current user");
      }

      const data = await response.json();
      setUser(data.data.user);
    } catch (error) {
      console.error("Error fetching current user:", error);
    } finally {
      setLoading(false); // End loading
    }
  }, [reload]);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  useEffect(() => {
    getAllusers(`https://nova-next-gen-server.onrender.com/api/v1/users`)
  }, [reload])
  const userContextValue = useMemo(
    () => ({ user, users,setUser, loading, setReload,userLoading }),
    [user, loading,users,userLoading]
  );

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };