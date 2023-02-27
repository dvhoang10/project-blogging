import React from "react";
import { useController } from "react-hook-form";

const TextArea = ({
  name = "",
  type = "text",
  control,
  className = "",
  ...rest
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <div className="relative w-full">
      <textarea
        className="w-full text-sm text-black transition-all bg-transparent border rounded-lg px-5 py-4 border-grayf1 resize-none min-h-[200px]"
        id={name}
        type={type}
        {...field}
        {...rest}
      />
    </div>
  );
};

export default TextArea;
