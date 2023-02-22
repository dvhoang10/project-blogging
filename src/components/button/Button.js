import React from "react";
import classNames from "utils/classNames";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "components/common/ErrorComponent";
import { LoadingSpinner } from "components/loading";

const Button = ({
  type = "submit",
  className = "",
  children,
  isLoading = false,
  kind = "primary",
  ...rest
}) => {
  let defaultClassName =
    "flex items-center justify-center min-h-[66px] font-semibold text-base rounded-lg";
  switch (kind) {
    case "primary":
      defaultClassName += " bg-btPrimary text-white";
      break;
    default:
      break;
  }
  const child = !!isLoading ? <LoadingSpinner></LoadingSpinner> : children;
  return (
    <button
      type={type}
      className={classNames(
        defaultClassName,
        className,
        !!isLoading ? "opacity-50 pointer-events-none" : ""
      )}
      {...rest}
    >
      {child}
    </button>
  );
};

Button.prototype = {
  type: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  kind: PropTypes.oneOf(["primary", "secondary"]),
  isLoading: PropTypes.bool,
};

export default withErrorBoundary(Button, {
  FallbackComponent: ErrorComponent,
});
