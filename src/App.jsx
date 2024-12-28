import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer, AuthLayout } from "./components";
import { Outlet } from "react-router-dom";
// import { Container } from "postcss";
import { Container } from "./components/index";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const userStatus = useSelector((state) => state.auth.status);

  // if (!userStatus) {
  useEffect(() => {
    authService
      .getCurrentState()
      .then((userData) => {
        console.log("App.jsx userData: ", userData);
        if (userData) {
          dispatch(login(userData));
        }
      })
      .finally(() => setLoading(false));
  }, []);
  // }
  // setLoading(false);

  const userData = useSelector((state) => state.auth.userData);

  console.log("App.jsx userData 2: ", userData);

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else return (
    <>
      <div className="min-h-screen bg-gray-100 text-black flex justify-be">
        <div className="w-full flex flex-col justify-between bg-[#e0e1dd]">
          <Header />

          <main className="mt-16 h-full">
            <Outlet />
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
