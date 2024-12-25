import React from "react";
import { logout } from "../../store/authSlice";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    navigate("/login");
    authService
      .logOut()
      .then(() => dispatch(logout(), navigate("/")))
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
