import React from "react";
import classNames from "utils/classNames";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "components/common/ErrorComponent";

const Field = ({ children, className = "" }) => {
  let defaultClassName =
    "flex flex-col items-start gap-y-5 first:mb-5 lg:first:mb-0";
  return (
    <div className={classNames(defaultClassName, className)}>{children}</div>
  );
};

Field.prototype = {
  children: PropTypes.string,
  classNames: PropTypes.string,
};

export default withErrorBoundary(Field, { FallbackComponent: ErrorComponent });
