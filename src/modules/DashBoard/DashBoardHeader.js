import Button from "components/button/Button";
import React from "react";
import { Link } from "react-router-dom";

const DashBoardHeader = () => {
  return (
    <div className="bg-white p-5 border-b border-b-[#eee] flex justify-between gap-5">
      <Link to="/" className="flex items-center gap-5">
        <img src="./logo-header.png" alt="" className="max-w-[40px]" />
        <span className="text-lg font-semibold">Blogging App</span>
      </Link>
      <div className="flex items-center gap-5">
        <Button to="#" className="p-5 h-12 lg:h-[52px]" kind="secondary">
          Write a new post
        </Button>
        <Link to="#" className="w-[52px] h-[52px]">
          <img
            src="https://images.unsplash.com/photo-1649837867356-6c7ef7057f32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
            alt=""
            className="object-cover w-full h-full rounded-full"
          />
        </Link>
      </div>
    </div>
  );
};

export default DashBoardHeader;
