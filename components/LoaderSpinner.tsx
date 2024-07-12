import { Loader } from "lucide-react";
import React from "react";

const LoaderSpinner = () => {
  return (
    <div className="flex-center h-screen w-full">
      <Loader className="animated-spinn text-orange-1" />
    </div>
  );
};

export default LoaderSpinner;
