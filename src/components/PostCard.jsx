import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import service from "../appwrite/config";
import authService from "../appwrite/auth";
import { Query } from "appwrite";
// import { getPostsSlice } from "../store/postSlice";

function PostCard(post) {
  const { $id, title, featuredImage, content } = post;
  // console.log("Current post", post);


  // useEffect(() => {
  async function newFunction() {
    try {
      const userIdentity = await authService.getPreference();

      console.log("user prefs: ", userIdentity);
    } catch (error) {
      console.log(error);
    }
  }
  // },[])

  // if (post) {
  //   newFunction();
  // }

  return (
    <>
      <Link to={`/post/${$id}`} className="">
        <div className="w-full h-[100%] bg-[#6b7a8f] rounded-md shadow-gray-700 shadow-2xl hover:shadow-2xl hover:shadow-slate-900 flex flex-col justify-between hover:p-[2px] p-2 duration-200">
          <div className="w-full align-text-top">
            {/* <h3>{userData.name} </h3> */}
            <img
              src={service.getFilePreview(featuredImage)}
              alt={title}
              className="rounded-md w-full h-[90%]"
            />
          </div>

          <h2 className="text-xl px-2 my-6 font-semibold">{title}</h2>
        </div>
      </Link>
    </>
  );
}

export default PostCard;
