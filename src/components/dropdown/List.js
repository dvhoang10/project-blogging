import React from "react";
import { useDropdown } from "./dropdown-context";
import Proptypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "components/common/ErrorComponent";

const List = ({ children }) => {
  const { show } = useDropdown();
  return (
    <>
      {show && (
        <div className="absolute left-0 z-10 w-full bg-white shadow-sm top-full">
          {children}
        </div>
      )}
    </>
  );
};

List.prototype = {
  children: Proptypes.node,
};

export default withErrorBoundary(List, { FallbackComponent: ErrorComponent });
