import React from "react";
import { axiosInstance } from "../../../utils/axios";

const isDev = process.env.NODE_ENV === "development";

const useErrorReport = () => {
  React.useEffect(() => {
    if (!isDev) {
      window.onerror = function (msg) {
        axiosInstance.post("/report/js", { msg });
        return false;
      };
    }
  }, []);
};

export default useErrorReport;
