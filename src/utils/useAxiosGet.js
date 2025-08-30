import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const useAxiosGet = (initialValue) => {
  const [res, setRes] = useState(initialValue || []);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getData = (
    url,
    cb,
    errorCb,
    headers = {},
    isToast = false,
    successMessage = "Fetched successfully",
    errorMessage = "Failed to fetch"
  ) => {
    setLoading(true);

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          ...headers,
        },
      })
      .then((res) => {
        if (cb && typeof cb === "function") {
          cb(res?.data || res);
        } else {
          setRes(res?.data);
        }

        if (isToast) {
          toast.success(
            res?.data?.message ||
              res?.data?.Message ||
              successMessage ||
              "Success"
          );
        }

        setLoading(false);
      })
      .catch((err) => {
        setRes(initialValue || []);
        if (errorCb && typeof errorCb === "function") {
          errorCb(err);
        } else {
          setError(err);
        }

        if (isToast) {
          toast.warn(
            err?.response?.data?.message ||
              err?.response?.data?.Message ||
              errorMessage ||
              "Something went wrong"
          );
        }

        setLoading(false);
      });
  };

  return [res, getData, loading, setRes, error, setLoading];
};

export default useAxiosGet;
