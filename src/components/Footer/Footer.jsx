import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <>
      <div className="w-screen bg-slate-900 text-white p-5 text-center">
        <h2>
          Build by <i>Ankit Deep</i>{" "}
        </h2>

        <div>
          <code >Code</code> :{" "}
          <Link className="hover:underline" to={`https://github.com/Ankit-Deep/Blog-App`} target="_blank" >Github</Link>
        </div>
      </div>
    </>
  );
}

export default Footer;
