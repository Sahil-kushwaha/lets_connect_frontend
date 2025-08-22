import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 ">
      <div className="animate-spin rounded-full h-30 w-30 border-t-4 border-b-4 border-blue-500"></div>
    </div>
  );
};

export default Loader;
