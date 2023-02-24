import React from "react";
import { Link } from "react-router-dom";
import Proptypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "components/common/ErrorComponent";

const PostCategory = ({ children, className = "", to = "" }) => {
  return (
    <div className="inline-block py-1 px-[10px] rounded-[10px] text-gray6B font-semibold whitespace-nowrap bg-white">
      <Link to={`/category/${to}`}>{children}</Link>
    </div>
  );
};

PostCategory.prototype = {
  children: Proptypes.node,
  className: Proptypes.string,
  to: Proptypes.string,
};

export default withErrorBoundary(PostCategory, {
  FallbackComponent: ErrorComponent,
});
