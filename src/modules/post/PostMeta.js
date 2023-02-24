import React from "react";
import { Link } from "react-router-dom";
import classNames from "utils/classNames";
import Protypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "components/common/ErrorComponent";

const PostMeta = ({ date = "", authorName = "", className = "", to = "" }) => {
  return (
    <div
      className={classNames(
        "flex items-center gap-x-[6px] lg:gap-x-3 font-semibold",
        className
      )}
    >
      <span>{date}</span>
      <span className="inline-block w-1 h-1 bg-current rounded-[100rem]"></span>
      <Link to={`/author/${to}`}>
        <span>{authorName}</span>
      </Link>
    </div>
  );
};

PostMeta.prototype = {
  date: Protypes.string,
  authorName: Protypes.string,
  className: Protypes.string,
  to: Protypes.string,
};

export default withErrorBoundary(PostMeta, {
  FallbackComponent: ErrorComponent,
});
