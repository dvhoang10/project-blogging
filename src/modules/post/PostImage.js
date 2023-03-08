import React from "react";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "components/common/ErrorComponent";
import { Link } from "react-router-dom";

const PostImage = ({ className = "", url = "", alt = "", to = "" }) => {
  const defaultClassName = "object-cover w-full h-full rounded-[inherit]";
  if (to) {
    return (
      <Link to={`/${to}`} className="block">
        <div className={className}>
          <img
            src={url}
            alt={alt}
            loading="lazy"
            className={defaultClassName}
          />
        </div>
      </Link>
    );
  }
  return (
    <div className={className}>
      <img src={url} alt={alt} loading="lazy" className={defaultClassName} />
    </div>
  );
};

PostImage.prototype = {
  className: PropTypes.string,
  url: PropTypes.string,
  alt: PropTypes.string,
};

export default withErrorBoundary(PostImage, {
  FallbackComponent: ErrorComponent,
});
