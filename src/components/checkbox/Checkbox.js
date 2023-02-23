import React from "react";
import classNames from "utils/classNames";

const Checkbox = ({
  name = "",
  checked = false,
  onClick = () => {},
  className = "",
  children,
}) => {
  const defaultClassName =
    "inline-flex flex-shrink-0 items-center justify-center w-5 h-5 text-white border rounded cursor-pointer transition-all";
  return (
    <div
      className={classNames("flex items-center gap-x-3 lg:gap-x-5", className)}
    >
      <div
        className={classNames(
          defaultClassName,
          checked ? "bg-primary border-primary" : "border-grayf1"
        )}
        onClick={onClick}
      >
        <input
          type="checkbox"
          name={name}
          className="hidden"
          onChange={() => {}}
          checked={checked}
        />
        <span className={classNames(checked ? "" : "opacity-0 invisible")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
      {children && <div onClick={onClick}>{children}</div>}
    </div>
  );
};

export default Checkbox;
