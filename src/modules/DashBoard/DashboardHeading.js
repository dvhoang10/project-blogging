import ErrorComponent from "components/common/ErrorComponent";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import PropTypes from "prop-types";

const DashboardHeading = ({ title = "", desc = "", children }) => {
  return (
    <div className="flex flex-col items-start justify-between mb-10 lg:flex-row">
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
  title: PropTypes.string,
  desc: PropTypes.string,
  children: PropTypes.node,
};

export default withErrorBoundary(DashboardHeading, {
  FallbackComponent: ErrorComponent,
});
