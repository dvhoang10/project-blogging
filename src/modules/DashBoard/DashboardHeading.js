import ErrorComponent from "components/common/ErrorComponent";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import Proptypes from "prop-types";

const DashboardHeading = ({ title = "", desc = "", children }) => {
  return (
    <div className="flex items-start justify-between mb-10">
      <div>
        <h1 className="text-xl font-semibold lg:text-4xl mb-[5px] text-black">
          {title}
        </h1>
        <p className="lg:mb-0 mb-[25px]">{desc}</p>
      </div>
      {children}
    </div>
  );
};

DashboardHeading.prototype = {
  title: Proptypes.string,
  desc: Proptypes.string,
  children: Proptypes.node,
};

export default withErrorBoundary(DashboardHeading, {
  FallbackComponent: ErrorComponent,
});
