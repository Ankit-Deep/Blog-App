import React from "react";

function ProfileIcon({ userData }) {
  return (
    <>
      <div className=" text-white" title="My Account">
        <h2 className="text-xl ">{userData.name}</h2>
      </div>
    </>
  );
}

export default ProfileIcon;
