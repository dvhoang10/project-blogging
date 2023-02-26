import React from "react";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "components/common/ErrorComponent";

const FieldCheckboxes = ({ children }) => {
  return <div className="flex flex-wrap gap-5">{children}</div>;
};

FieldCheckboxes.prototype = {
  children: PropTypes.node,
};

export default withErrorBoundary(FieldCheckboxes, {
  FallbackComponent: ErrorComponent,
});
