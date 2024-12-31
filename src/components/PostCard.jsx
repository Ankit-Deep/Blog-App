import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import service from "../appwrite/config";
import authService from "../appwrite/auth";
import parse from "html-react-parser";
import { Query } from "appwrite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { getPostsSlice } from "../store/postSlice";

function PostCard({ $id, title, featuredImage, content, userName }) {
  async function newFunction() {
    try {
      const userIdentity = await authService.getPreference();

      console.log("user prefs: ", userIdentity);
    } catch (error) {
      console.log(error);
    }
  }
  // },[])

  return (
    <>
      <Link to={`/post/${$id}`} className="">
        <div className="w-full h-full bg-[#8191a7] rounded-lg shadow-gray-700 shadow-2xl hover:shadow-2xl hover:shadow-gray-950 flex flex-col p-4 hover:p-[20px] duration-200 ">
          {/* User profile */}
          <div className=" flex items-center gap-2">
            <span className="w-6 h-6 rounded-full ">
              <img srcset="../../src/assets/userIcon2.png" alt="" />
            </span>
            <h3
              className="font-medium text-sm hover:underline"
              title={userName}
            >
              {userName}{" "}
            </h3>
          </div>

          {/* <div className="w-full align-text-top">

            <img
              src={
                service.getFilePreview(featuredImage) 
              }
              alt={title}
              className="rounded-md w-full h-[90%]"
            />

          </div> */}

          <div className=" flex flex-col mb-6 h-full">
            <h2 className="text-xl my-5 font-semibold">{title}</h2>

            <p className="">{parse(content)}</p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default PostCard;
