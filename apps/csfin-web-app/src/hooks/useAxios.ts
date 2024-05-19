import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";

const useAxios = <T>() => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<T>();
  const [controller, setController] = useState<AbortController>();

  const requestData = async (config: AxiosRequestConfig) => {
    setLoading(true);
    setError("");
    setData(undefined);

    controller?.abort();

    const ctrl = new AbortController();
    setController(ctrl);

    axiosInstance
      .request<T>({ ...config, signal: ctrl.signal })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.info("Request has been cancelled");
        } else {
          setError(error.response?.data ?? error.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    return () => {
      controller?.abort();
    };
  }, [controller]);

  return { loading, error, data, requestData };
};

export default useAxios;
