import React from "react";
import { Link } from "react-router-dom";

const LayoutAuthentication = ({ children }) => {
  return (
    <div className="flex items-center min-h-screen p-10">
      <div className=" layout-container">
        <div className="mb-5 text-center">
          <Link to="/" className="inline-block">
            <img
              srcSet="/logo.png"
              alt="logo"
              className="w-2/3 mx-auto lg:w-full"
            />
          </Link>
        </div>
        <h1 className="text-[30px] lg:text-[40px] text-accent text-center font-semibold mb-[25px]">
          Blogging App
        </h1>
        {children}
      </div>
    </div>
  );
};

export default LayoutAuthentication;
