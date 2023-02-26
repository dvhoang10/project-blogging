import React from "react";
import classNames from "utils/classNames";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "components/common/ErrorComponent";

const LabelStatus = ({ children, type = "default" }) => {
  let styleClassName = "text-gray-500 bg-gray-100";
  switch (type) {
    case "success":
      styleClassName = "text-green-500 bg-green-100";
      break;
    case "warning":
      styleClassName = "text-orange-500 bg-orange-100";
      break;
    case "danger":
      styleClassName = "text-red-500 bg-red-100";
      break;
    default:
      break;
  }
  return (
    <span
      className={classNames(
        "inline-block py-[10px] px-[15px] rounded-lg text-sm font-normal",
        styleClassName
      )}
    >
      {children}
    </span>
  );
};

LabelStatus.prototype = {
  children: PropTypes.node,
  type: PropTypes.oneOf(["default", "success", "warning", "danger"]),
};

export default withErrorBoundary(LabelStatus, {
  FallbackComponent: ErrorComponent,
});
