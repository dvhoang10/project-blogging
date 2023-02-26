import React from "react";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "components/common/ErrorComponent";

const Toggle = ({ on = false, onClick = () => {}, ...rest }) => {
  return (
    <label>
      <input
        type="checkbox"
        className="hidden"
        checked={on}
        onChange={() => {}}
        onClick={onClick}
      />
      <div
        className={`inline-block w-[70px] h-[42px] relative cursor-pointer rounded-full p-1 transition-all ${
          on ? "bg-green-500" : "bg-gray-300"
        }`}
        {...rest}
      >
        <span
          className={`w-[34px] h-[34px] bg-white rounded-full inline-block transition-all ${
            on ? "translate-x-[28px]" : ""
          }`}
        ></span>
      </div>
    </label>
  );
};

Toggle.prototype = {
  on: PropTypes.bool,
  onClick: PropTypes.func,
};

export default withErrorBoundary(Toggle, { FallbackComponent: ErrorComponent });
