import React from "react";
import { useController } from "react-hook-form";
import Proptypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "components/common/ErrorComponent";

const Radio = ({ control, name, checked, children, ...rest }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  console.log(field);
  return (
    <label>
      <input
        checked={checked}
        type="radio"
        className="hidden"
        {...field}
        {...rest}
      />
      <div className="flex items-center font-medium cursor-pointer gap-x-3">
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center p-1 border ${
            checked
              ? "bg-primary border-primary text-white"
              : "border-gray-200 text-transparent"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <span>{children}</span>
      </div>
    </label>
  );
};

Radio.prototype = {
  control: Proptypes.node,
  name: Proptypes.string,
  checked: Proptypes.bool,
  children: Proptypes.node,
};

export default withErrorBoundary(Radio, {
  FallbackComponent: ErrorComponent,
});
