import React from "react";
import classNames from "utils/classNames";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "components/common/ErrorComponent";

const Heading = ({ className = "", children }) => {
  return (
    <div
      className={classNames(
        "text-tertiary text-[22px] lg:text-[28px] mb-5 lg:mb-[30px] font-semibold ",
        className
      )}
    >
      {children}
    </div>
  );
};

Heading.prototype = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default withErrorBoundary(Heading, {
  FallbackComponent: ErrorComponent,
});
