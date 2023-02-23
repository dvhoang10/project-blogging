import React from "react";
import classNames from "utils/classNames";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "components/common/ErrorComponent";
import { LoadingSpinner } from "components/loading";
import { Link } from "react-router-dom";

const Button = ({
  type = "submit",
  className = "",
  children,
  isLoading = false,
  kind = "primary",
  ...rest
}) => {
  let defaultClassName =
    "flex items-center justify-center h-12 lg:h-[60px] font-semibold text-sm lg:text-base rounded-lg";
  switch (kind) {
    case "primary":
      defaultClassName += " bg-btPrimary text-white";
      break;
    case "secondary":
      defaultClassName += " bg-primary text-white";
      break;
    case "white":
      defaultClassName += " bg-white text-primary";
      break;
    default:
      break;
  }
  const child = !!isLoading ? <LoadingSpinner></LoadingSpinner> : children;
  if (rest.to) {
    return (
      <Link to={rest.to} className={classNames(defaultClassName, className)}>
        {child}
      </Link>
    );
  }
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
  type: PropTypes.oneOf(["button", "submit"]),
  className: PropTypes.string,
  children: PropTypes.node,
  kind: PropTypes.oneOf(["primary", "secondary", "white"]),
  isLoading: PropTypes.bool,
};

export default withErrorBoundary(Button, {
  FallbackComponent: ErrorComponent,
});
