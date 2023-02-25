import ErrorComponent from "components/common/ErrorComponent";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import DashBoardHeader from "./DasboardHeader";
import SideBar from "./SideBar";

const DashboardLayout = () => {
  return (
    <div className="max-w-[1600px] mx-auto">
      <DashBoardHeader></DashBoardHeader>
      <div className="grid grid-cols-1 px-5 py-10 lg:grid-cols-dashBoardMain gap-x-10">
        <SideBar></SideBar>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default withErrorBoundary(DashboardLayout, {
  FallbackComponent: ErrorComponent,
});
