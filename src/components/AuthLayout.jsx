import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);
  // console.log(authStatus);

  useEffect(() => {
    if (authentication && authStatus === false) {
      navigate("/");
    } else if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }

    setLoader(false);

    // Upper syntax in easy way :--
    // if (authStatus === true) {
    //     navigate("/")
    // } else if (authStatus === false) {
    //     navigate("/login")
    // }
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
