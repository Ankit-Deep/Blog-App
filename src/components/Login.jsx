import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { login as authStoreLogin } from "../store/authSlice";
import { Input, Button, Logo } from "./index";
import { useDispatch, useSelector } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = React.useState("");

  const userStatus = useSelector((state) => state.auth.status);

  const login = async (data) => {
    // console.log("Current User : ", data);
    setError("");

    if (!userStatus) {
      try {
        // try {
        //   const currentUser = authService.getCurrentState();
        //   if (currentUser) {
        //     await authService.logOut();
        //   }
        // } catch (error) {
        //   // If getCurrentState fails, it means no user is logged in
        //   // We can proceed with account creation
        //   console.log("No current session");
        // }

        const session = await authService.logIn(data);

        if (session) {
          const userData = await authService.getCurrentState();

          // console.log("Log in current state: ", userData);

          if (userData) {
            dispatch(authStoreLogin(userData));
            // console.log("Userdata final: ", user);
          }
          navigate("/");
        }
      } catch (error) {
        setError(error);
        // console.log("Error : ", error);
        throw error;
      }
    }
  };

  const user = useSelector((state) => state.auth.userData);
  // console.log("Userdata after: ", user);

  return (
    <>
      <div className="flex items-center justify-center w-full sm:py-10 py-20 h-full ">
        <div
          className={`mx-3 sm:mx-auto w-full max-w-lg bg-gray-300 rounded-xl sm:p-5 p-4 py-20 border border-black/10 `}
        >


          <h2 className="text-center text-2xl font-bold leading-tight mb-4">
            Log in to your account
          </h2>

          <p className="text-center">
            Don't have any account? &nbsp;
            <Link
              to="/signup"
              className="font-medium hover:underline text-blue-700"
            >
              Sign Up
            </Link>
          </p>

          {error && <p className="text-red-600 mt-8 text-center">{error} </p>}

          <form onSubmit={handleSubmit(login)} className="mt-8">
            <div className="space-y-5">
              {/* Input field for email */}
              <Input
                label="Email :"
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be valid address",
                  },
                })}
              />

              {/* Input field for password */}
              <Input
                label="Password :"
                type="password"
                {...register("password", {
                  required: true,
                })}
              />

              <div className="text-center">
                <Button
                  children="Log in"
                  type="submit"
                  className="w-full text-center p-5"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
