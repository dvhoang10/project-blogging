import React from "react";
import Proptypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "components/common/ErrorComponent";

const FormLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-1 lg:mb-10 lg:grid-cols-2 lg:gap-x-10">
      {children}
    </div>
  );
};

FormLayout.prototype = {
  children: Proptypes.node,
};

export default withErrorBoundary(FormLayout, {
  FallbackComponent: ErrorComponent,
});
