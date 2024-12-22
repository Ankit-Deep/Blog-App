import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentState()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <>
      <div className="min-h-screen bg-gray-100 text-black flex flex-wrap ">
        <div className="w-full flex flex-col bg-[#e0e1dd]">
          <Header />

          <main className="mt-16">
            <Outlet />
          </main>

          <Footer />
        </div>
      </div>
    </>
  ) : null;
}

export default App;
