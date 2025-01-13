import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer, AuthLayout, Loading } from "./components";
import { Outlet } from "react-router-dom";
// import Loading from "./components/index";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const userStatus = useSelector((state) => state.auth.status);


  useEffect(() => {
    // if (userStatus) {
    authService
      .getCurrentState()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        }
      })
      .finally(() => setLoading(false));
    // }
  }, []);

  const userData = useSelector((state) => state.auth.userData);

  // console.log("App.jsx userData 2: ", userData);

  // const theme = useSelector((state) => state.theme.theme);


  if (loading) {
    return (
      <div className="bg-white w-screen  h-screen">
        <h1>Loading...</h1>
        {/* <Loading/> */}
      </div>
    );
  } else
    return (
      <>
        {/* <Provider store={store}> */}
        <div className={`overflow-x-hidden`}>
          <div className="w-screen  h-screen flex flex-col justify-between items-stretch bg-white">
            <Header />

            <main className="min-w-full bg-white">
              <Outlet />
            </main>

            <Footer />
          </div>
        </div>
        {/* </Provider> */}
      </>
    );
}

export default App;
