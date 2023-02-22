import React from "react";
import classNames from "utils/classNames";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "components/common/ErrorComponent";

const Label = ({ htmlFor = "", className = "", children }) => {
  const defaultClassName =
    "text-sm lg:text-base font-semibold cursor-pointer text-grayDark";
  return (
    <label
      htmlFor={htmlFor}
      className={classNames(defaultClassName, className)}
    >
      {children}
    </label>
  );
};

Label.prototype = {
  htmlFor: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default withErrorBoundary(Label, { FallbackComponent: ErrorComponent });
