import React from "react";

function ProfileIcon({ userData }) {
  return (
    <>
      <div className="border-2 border-black text-white flex " title="My Account">
        <h2>{userData.name}</h2>
      </div>
    </>
  );
}

export default ProfileIcon;
