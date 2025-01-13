import React, { useState } from 'react'

function Button( {
    children, // referred as text only
    type = 'button',
    bgColor = '',
    textColor = '',
    hover = '',
    className = '',
    ...props
}) {
    const [cursorState, setCursorState] = useState("cursor-pointer")

    function buttonClick() {
        setCursorState("cursor-wait")
    }

    return (
      <button
        className={`visible text-base sm:px-4 px-6 py-2 rounded-lg ${cursorState} hover:${hover} ${type} ${bgColor} ${textColor} ${className}`}
        {...props}
        onClick={buttonClick}
      >
        {children}
      </button>
    );
}

export default Button
