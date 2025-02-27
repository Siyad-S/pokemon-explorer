import { CircularProgress } from "@mui/material";
import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center flex-grow absolute inset-0 bg-black bg-opacity-50 z-50">
      <CircularProgress />
      <span className="ml-2 text-white">Loading...</span>
    </div>
  );
};

export default Loader;
