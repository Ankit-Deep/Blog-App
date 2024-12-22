import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  {
    label, // username, name, age etc
    type = "text",
    className = "",
    ...props
    // ref for reference of this Input Component
  }, ref ) {
  const id = useId();

  return (
    <div className="w-full py-1">
      {label && (
        <label htmlFor={id} className="inline-block p-1 text-lg ">
          {label}
        </label>
      )}

      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none w-full focus:bg-gray-50 border-gray-200  ${className}`}
        ref={ref}
        id={id}
        {...props}
      />
    </div>
  );
});

export default Input
