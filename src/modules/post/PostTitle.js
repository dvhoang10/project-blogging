import React from "react";
import { Link } from "react-router-dom";
import classNames from "utils/classNames";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "components/common/ErrorComponent";

const PostTitle = ({ children, className = "", to = "", size = "normal" }) => {
  let defaultClassName = "font-semibold leading-normal tracking-[0.25px]";
  switch (size) {
    case "normal":
      defaultClassName += " text-sm lg:text-large";
      break;
    case "large":
      defaultClassName += " text-base lg:text-[22px]";
      break;
    default:
      break;
  }
  return (
    <div className={classNames(defaultClassName, className)}>
      <Link to={`/${to}`} className="block">
        {children}
      </Link>
    </div>
  );
};

PostTitle.prototype = {
  children: PropTypes.node,
  className: PropTypes.string,
  to: PropTypes.string,
  size: PropTypes.oneOf(["normal", "large"]),
};

export default withErrorBoundary(PostTitle, {
  FallbackComponent: ErrorComponent,
});
