import React, { useState } from 'react'

function Button( {
    children, // referred as text only
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
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
        className={`visible sm:px-4 px-6 py-2 rounded-lg ${cursorState} ${hover} ${type} ${bgColor} ${textColor} `}
        {...props}
        onClick={buttonClick}
      >
        {children}
      </button>
    );
}

export default Button
