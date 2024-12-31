import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import service from "../appwrite/config";
import authService from "../appwrite/auth";
import parse from "html-react-parser";
import { Query } from "appwrite";
// import { getPostsSlice } from "../store/postSlice";

function PostCard({ $id, title, featuredImage, content }) {
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
        <div className="w-full h-full bg-[#8191a7] rounded-lg shadow-gray-700 shadow-2xl hover:shadow-2xl hover:shadow-gray-900 flex flex-col justify-between hover:p-[3px] p-2 duration-200 ">
          {/* <div className="w-full align-text-top">
            <h3>{userData.name} </h3>

            <img
              src={
                service.getFilePreview(featuredImage) 
              }
              alt={title}
              className="rounded-md w-full h-[90%]"
            />

          </div> */}

          <div className="px-2 flex flex-col h-full">
            <h2 className="text-xl my-6 font-semibold">{title}</h2>

            <p className="">{parse(content)}</p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default PostCard;
