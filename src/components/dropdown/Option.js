import React from "react";
import { useDropdown } from "./dropdown-context";
import Proptypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "components/common/ErrorComponent";

const Option = ({ onClick, children }) => {
  const { setShow } = useDropdown();
  const handleClick = () => {
    onClick && onClick();
    setShow(false);
  };
  return (
    <div
      className="flex items-center justify-between px-5 py-4 text-sm transition-all cursor-pointer hover:text-primary"
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

Option.prototype = {
  onClick: Proptypes.func,
  children: Proptypes.node,
};

export default withErrorBoundary(Option, { FallbackComponent: ErrorComponent });
