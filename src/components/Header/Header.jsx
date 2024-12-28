import React, { useState } from "react";
import { Button, Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileIcon from "../profile/ProfileIcon";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  console.log("Auth status in header: ", authStatus);
  
  
  const userData = useSelector((state) => state.auth.userData);
  console.log("Auth data in header: ", userData);

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

  return (
    <header className="py-3 top-0 fixed z-10 w-full  shadow bg-[#0d1b2a]">
      <Container>
        <nav className="flex text-center ">
          {/* Div for just logo */}
          <div className=" text-white px-5 text-center">
            <Link to="/">
              {authStatus && <ProfileIcon userData={userData} />}
            </Link>
          </div>

          {/* Unordered list for home, about etc */}
          <ul className="flex ml-auto ">
            {navItems.map((item) =>
              // only those items will be shown for which the authStatus is true

              item.active ? (
                // The HTML tag which is repeated, we have to give it a key to make it unique
                <li key={item.name} className="mx-2 visible">
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`inline-block px-6 py-2 rounded-full text-white font-medium hover:bg-blue-200 hover:text-black mx-1`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {/* show logout button only if the user is authenticated / logged in*/}
            {authStatus && (
              <li className="bg-red-600 rounded-full mx-1">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
