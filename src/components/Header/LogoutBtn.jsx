import React from "react";
import { logout } from "../../store/authSlice";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    authService.logOut().then(() => {
      dispatch(logout());
      console.log("user logged out");
      navigate("/login");
    });
    // .catch();
  }

  return (
    <>
      <div>
        <button
          className=""
          onClick={logoutHandler} 
        >
          Logout
        </button>
      </div>
    </>
  );
}

export default LogoutBtn;
