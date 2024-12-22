import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
// import { logout } from "../../store/authSlice";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);

  const navigate = useNavigate();

  const navItems = [
    {
      // slug means the end part of URL that comes after backslash /
      name: "Home",
      slug: "/",
      active: true,
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
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <>
      <header className="py-3 fixed w-full shadow bg-[#415a77]">
        <Container>
          <nav className="flex">
            {/* Div for just logo */}
            <div className="mr-4">
              <Link to="/">
                <Logo />
              </Link>
            </div>

            {/* Unordered list for home, about etc */}
            <ul className="flex ml-auto ">
              {navItems.map((item) =>
                // only those items will be shown for which the authStatus is true

                item.active ? (
                  // The HTML tag which is repeated, we have to give it a key to make it unique

                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="inline-block px-6 py-2 rounded-full text-white font-medium hover:bg-blue-200 hover:text-black mx-1"
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}

              {/* show logout button */}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </nav>
        </Container>
      </header>
    </>
  );
}

export default Header;
