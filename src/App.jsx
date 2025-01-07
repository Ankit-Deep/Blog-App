import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer, AuthLayout, Loading } from "./components";
import { Outlet } from "react-router-dom";
// import Loading from "./components/index";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const userStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    authService
      .getCurrentState()
      .then((userData) => {
        // console.log("App.jsx userData: ", userData);
        if (userData) {
          dispatch(login(userData));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const userData = useSelector((state) => state.auth.userData);

  // console.log("App.jsx userData 2: ", userData);

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
        {/* <Loading/> */}
      </div>
    );
  } else
    return (
      <>
        <div className="min-h-screen h-screen bg-gray-100 text-black flex flex-col content-between">
          <div className="w-full flex flex-col bg-slate-400 ">
            <Header />

            <main className="">
              <Outlet />
            </main>

            <Footer />
          </div>
        </div>
      </>
    );
}

export default App;
