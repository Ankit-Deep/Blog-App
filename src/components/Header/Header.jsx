import React, { useState } from "react";
import { Button, Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileIcon from "../profile/ProfileIcon";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  // console.log("Auth status in header: ", authStatus);

  const userData = useSelector((state) => state.auth.userData);
  // console.log("Auth data in header: ", userData);

  const navigate = useNavigate();

  const navItems = [
    {
      // slug means the end part of URL that comes after backslash /
      name: "Home",
      slug: "/",
      active: authStatus,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "My Posts",
      slug: "/my-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];


  const [showNav, setShowNav] = useState("hidden");

  // const showDropDown = () => {
  //   // const dropdownMenu = document.getElementById()
  //   setShowNav("visible");
  // }

  return (
    <header className="py-3 top-0 fixed z-10 w-full  shadow bg-[#0d1b2a]">
      <Container>
        <nav className="flex items-center justify-between text-center max-h-20 mx-5 sm:mx-2">
          {/* Div for just logo */}
          <div className="">
            <Link to="/">
              {authStatus && <ProfileIcon userData={userData} />}
            </Link>
          </div>

          {/* Unordered list for home, about etc */}
          <ul className="hidden md:flex justify-end">
            {navItems.map((item) =>
              // only those items will be shown for which the authStatus is true

              item.active ? (
                // The HTML tag which is repeated, we have to give it a key to make it unique
                <li key={item.name} className="mx-2">
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`text-lg inline-block px-6 py-2 rounded-full text-white hover:bg-blue-200 hover:text-black hover:font-medium hover:px-7 mx-1 duration-200`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {/* show logout button only if the user is authenticated / logged in*/}
            {authStatus && (
              <li className="inline-block px-5 py-2  duration-200 text-white text-lg hover:px-6 bg-red-500 hover:bg-red-600 rounded-full">
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Dropdown navbar */}
          <button
            className="md:hidden  text-white w-10 h-10 text-center px-1"
            id="dropdown"
            onClick={() => {
              if (showNav === "hidden") {
                setShowNav("visible");
              } else {
                setShowNav("hidden");
              }
            }}
          >
            <svg
              className="w-6 h-6 text-xl"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </nav>
      </Container>

      <div
        id="dropdownMenu"
        className={`md:hidden bg-gray-800 text-white ${showNav}`}
      >
        <ul className="flex flex-col w-[40%] items-center justify-center text-center float-right mx-4 my-2 rounded-lg bg-slate-600">
          {navItems.map((item) =>
            // only those items will be shown for which the authStatus is true

            item.active ? (
              // The HTML tag which is repeated, we have to give it a key to make it unique
              <li key={item.name} className="visible w-full">
                <button
                  onClick={() => navigate(item.slug)}
                  className={`inline-block  py-2 w-full text-white font-medium hover:bg-blue-200 hover:text-black `}
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )}

          {authStatus && (
            <li className="py-2 hover:bg-blue-200 font-medium w-full hover:text-black">
              <LogoutBtn />
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
