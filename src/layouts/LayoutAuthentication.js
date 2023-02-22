import React from "react";
import { Link } from "react-router-dom";

const LayoutAuthentication = ({ children }) => {
  return (
    <div className="min-h-screen p-10 layout-container">
      <div className="mb-5 text-center">
        <Link to="/" className="inline-block">
          <img srcSet="/logo.png" alt="logo" />
        </Link>
      </div>
      <h1 className="text-[30px] lg:text-[40px] text-blue00 text-center font-semibold mb-[25px]">
        Blogging App
      </h1>
      {children}
    </div>
  );
};

export default LayoutAuthentication;
