import React from "react";

function Loading({text = "Loading..."}) {
  return (
    <>
      <div>
            <div className="h-[50%] w-[50%] rounded-full border-[10px] border-black border-r-white -rotate-180">
                <h1>{text}</h1>
            </div>
      </div>
    </>
  );
}

export default Loading;
