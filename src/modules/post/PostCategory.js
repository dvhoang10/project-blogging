import React from "react";
import { Link } from "react-router-dom";
import Proptypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "components/common/ErrorComponent";
import classNames from "utils/classNames";

const PostCategory = ({
  children,
  className = "",
  to = "",
  type = "primary",
}) => {
  let defaultClassName =
    "inline-block py-1 px-[10px] rounded-[10px] text-xs lg:text-sm text-gray6B font-semibold whitespace-nowrap";
  switch (type) {
    case "primary":
      defaultClassName += " bg-grayF3";
      break;
    case "secondary":
      defaultClassName += " bg-white";
      break;
    default:
      break;
  }
  return (
    <div className={classNames(defaultClassName, className)}>
      <Link to={`/category/${to}`}>{children}</Link>
    </div>
  );
};

PostCategory.prototype = {
  children: Proptypes.node,
  className: Proptypes.string,
  to: Proptypes.string,
  type: Proptypes.oneOf(["primary", "secondary"]),
};

export default withErrorBoundary(PostCategory, {
  FallbackComponent: ErrorComponent,
});
