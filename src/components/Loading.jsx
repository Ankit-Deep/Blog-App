import React from "react";

function Loading() {
  return (
    <>
      {/* <div className="visible w-screen h-screen bg-white text-center flex items-center justify-center"> */}
        <dialog open className="z-50 w-1/4 h-1/3 rounded-2xl bg-gray-500 opacity-40 flex items-center justify-center top-48">
          <div className="h-[100px] w-[100px] rounded-full border-[7px] border-black border-r-gray-500 transition-transform duration-500 animate-spin">
            {/* <h1 className="">{text}</h1> */}
          </div>
        </dialog>
      {/* </div> */}
    </>
  );
}

export default Loading;