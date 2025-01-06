import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ProfileIcon({ userData }) {
  return (
    <>
      <div
        className=" text-white  flex gap-3 items-center cursor-pointer"
        title="My Account"
      >
        <img
          src="/assets/userIcon2.png"
          alt=""
          className="w-7 h-7 rounded-full "
        />

        {/* <FontAwesomeIcon icon="fa-thin fa-circle-user" /> */}

        {/* <svg className="w-8 bg-slate-500 rounded-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M406.5 399.6C387.4 352.9 341.5 320 288 320l-64 0c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3l64 0c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z"/></svg> */}
        <h2 className="text-xl ">{userData.name}</h2>
      </div>
    </>
  );
}

export default ProfileIcon;
