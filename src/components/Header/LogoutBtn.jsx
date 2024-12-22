import React from "react";
import { logout } from "../../store/authSlice";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService
      .logOut()
      .then(() => dispatch(logout()))
      .catch();
  };

  return (
    <>
      <div>
        <button
          className="inline-block px-6 py-2 duration-200 text-white font-medium hover:bg-blue-200 hover:text-black rounded-full"
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
    </>
  );
}

export default LogoutBtn;
