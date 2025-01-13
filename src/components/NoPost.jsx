import React from "react";
import { Link } from "react-router-dom";
import Container from "./container/Container";

function NoPost() {
  return (
    <>
        <Link to={`/add-post`} className="mx-auto">
          <div className="w-full mx-auto sm:mx-4 my-2 bg-[#dbe2eb] h-2/4 border-slate-600 rounded-xl p-20">
            <h1 className="text-center">+ Create New Blog</h1>
          </div>
        </Link>
    </>
  );
}

export default NoPost;
