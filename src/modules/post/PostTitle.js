import React from "react";
import { Link } from "react-router-dom";
import classNames from "utils/classNames";
import Proptypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "components/common/ErrorComponent";

const PostTitle = ({ children, className = "", to = "" }) => {
  return (
    <div
      className={classNames(
        "font-semibold leading-normal tracking-[0.25px] text-base lg:text-[22px]",
        className
      )}
    >
      <Link to={`/${to}`} className="block">
        {children}
      </Link>
    </div>
  );
};

PostTitle.prototype = {
  children: Proptypes.node,
  className: Proptypes.string,
  to: Proptypes.string,
};

export default withErrorBoundary(PostTitle, {
  FallbackComponent: ErrorComponent,
});
