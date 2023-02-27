import React from "react";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "components/common/ErrorComponent";

const FormLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-1 mb-5 lg:grid-cols-2 lg:gap-x-10">
      {children}
    </div>
  );
};

FormLayout.prototype = {
  children: PropTypes.node,
};

export default withErrorBoundary(FormLayout, {
  FallbackComponent: ErrorComponent,
});
