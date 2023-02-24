import React from "react";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "components/common/ErrorComponent";

const PostImage = ({ className = "", url = "", alt = "" }) => {
  return (
    <div className={className}>
      <img
        src={url}
        alt={alt}
        loading="lazy"
        className="object-cover w-full h-full rounded-[inherit]"
      />
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
