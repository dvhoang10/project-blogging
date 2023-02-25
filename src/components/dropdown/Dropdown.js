import React from "react";
import { DropdownProvider } from "./dropdown-context";
import Proptypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "components/common/ErrorComponent";

const Dropdown = ({ children, ...rest }) => {
  return (
    <DropdownProvider {...rest}>
      <div className="relative inline-block w-full">{children}</div>
    </DropdownProvider>
  );
};

Dropdown.prototype = {
  children: Proptypes.node,
};

export default withErrorBoundary(Dropdown, {
  FallbackComponent: ErrorComponent,
});
