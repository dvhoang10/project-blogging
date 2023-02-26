import React from "react";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "components/common/ErrorComponent";
import classNames from "utils/classNames";

const Table = ({ children, className = "" }) => {
  return (
    <div className={classNames("table-styles", className)}>
      <table>{children}</table>
    </div>
  );
};

Table.prototype = {
  children: PropTypes.string,
};

export default withErrorBoundary(Table, {
  FallbackComponent: ErrorComponent,
});
