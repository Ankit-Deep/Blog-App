import React from "react";

function ProfileIcon({ userData }) {
  return (
    <>
      <div className=" text-white flex gap-3 items-center cursor-pointer" title="My Account">
        <img
          srcSet="../../src/assets/userIcon2.png"
          alt=""
          className="w-7 h-7 rounded-full "
        />
        <h2 className="text-xl ">{userData.name}</h2>
      </div>
    </>
  );
}

export default ProfileIcon;
