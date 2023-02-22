import React from "react";
import classNames from "utils/classNames";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "components/common/ErrorComponent";
import { useController } from "react-hook-form";

const Input = ({
  control,
  name = "",
  type = "text",
  children,
  className = "",
  ...rest
}) => {
  let defaultClassName =
    "w-full px-5 py-4 text-xs lg:text-sm transition-all ease-linear border rounded-lg border-grayLight font-medium focus:border-primary";
  const { field } = useController({ control, name, defaultValue: "" });
  return (
    <div className="relative w-full">
      <input
        id={name}
        type={type}
        className={classNames(
          defaultClassName,
          className,
          children ? "pr-16" : ""
        )}
        {...field}
        {...rest}
      />
      {children && (
        <span className="absolute -translate-y-1/2 cursor-pointer select-none right-6 top-1/2">
          {children}
        </span>
      )}
    </div>
  );
};

Input.prototype = {
  name: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.node,
  classNames: PropTypes.string,
  placeholder: PropTypes.string,
};

export default withErrorBoundary(Input, {
  FallbackComponent: ErrorComponent,
});
