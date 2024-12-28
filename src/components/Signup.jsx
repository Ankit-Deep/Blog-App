import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Input, Button, Logo } from "./index.js";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const userStatus = useSelector((state) => state.auth.status);

  console.log("Current user status: ", userStatus);

  const create = async (data) => {
    console.log("Create account : ", data);
    setError("");

    if (userStatus === false) {
      try {
        // Check if there's a current session first
        // try {
        //   const currentUser = await authService.getCurrentState();
        //   if (currentUser) {
        //     await authService.logOut();
        //   }
        // } catch (error) {
        // // If getCurrentState fails, it means no user is logged in
        // // We can proceed with account creation
        //   console.log("No current session");
        // }

        const userAccount = await authService.createAccount(data);

        if (userAccount) {
          console.log("New userAccount details: ", userAccount);

          // Call the Log in function
          const userLoginData = await authService.logIn({
            email: data.email,
            password: data.password,
          });

          console.log("userLoginData : ", userLoginData);

          const userData = await authService.getCurrentState();

          console.log("User data just after signin (Database) : ", userData);

          if (userData) {
            // console.log("User data just after signin (Database) 2: ", userData);

            dispatch(login(userData));
            navigate("/");
            // console.log("successfully logged in to the store");
            
          }
        }
      } catch (error) {
        // console.log("Sign failed : ", error);
        setError(error.message);
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-full sm:py-10 h-full">
        <div
          className={`sm:mx-auto mx-3 w-full max-w-lg bg-gray-300 rounded-xl sm:p-10 px-5 py-10 border border-black/10 `}
        >
          <h2 className="text-center text-2xl font-bold leading-tight my-2">
            Sign up to create an account
          </h2>

          <p className="text-center my-1">
            Already have any account? &nbsp;
            <Link
              to="/login"
              className="font-medium hover:underline text-blue-700"
            >
              Sign in
            </Link>
          </p>

          {error && <p className="text-red-600 mt-8 text-center">{error} </p>}

          <form onSubmit={handleSubmit(create)}>
            <div className="space-y-5">
              {/* Input for Name */}
              <Input
                label="Full Name: "
                type="text"
                placeholder="Enter your full name"
                {...register("name", {
                  required: true,
                })}
              />

              {/* Input for Email */}
              <Input
                label="Email : "
                type="email"
                placeholder="Enter your email"
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

              {/* Input for Password */}
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password "
                {...register("password", {
                  required: true,
                })}
              />  

              {/* <Button children={"Create Account"} type="submit" /> */}

              <div className="text-center pt-2">
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
