import Button from "components/button/Button";
import ErrorComponent from "components/common/ErrorComponent";
import { useAuth } from "contexts/auth-context";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import { Link } from "react-router-dom";

const DashboardHeader = () => {
  const { userInfo } = useAuth();
  return (
    <div className="bg-white p-5 border-b border-b-[#eee] flex justify-between gap-5">
      <Link to="/" className="flex items-center gap-5">
        <img src="./logo-header.png" alt="" className="max-w-[40px]" />
        <span className="hidden text-lg font-semibold lg:inline-block">
          Blogging App
        </span>
      </Link>
      <div className="flex items-center gap-5">
        <Button to="#" className="p-5 h-12 lg:h-[52px]" kind="secondary">
          Write a new post
        </Button>
        <Link to="#" className="w-[52px] h-[52px]">
          <img
            src={userInfo?.avatar}
            alt=""
            className="object-cover w-full h-full rounded-full"
          />
        </Link>
      </div>
    </div>
  );
};

export default withErrorBoundary(DashboardHeader, {
  FallbackComponent: ErrorComponent,
});
