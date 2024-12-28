import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import service from "../appwrite/config";
import authService from "../appwrite/auth";
import { Query } from "appwrite";
// import { getPostsSlice } from "../store/postSlice";

function PostCard(post) {
  const { $id, title, featuredImage } = post;
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
        <div className="w-full h-[100%] rounded-xl p-1 bg-[#a2b4ce] shadow-md  shadow-gray-700 hover:shadow-2xl hover:shadow-slate-700 flex flex-col justify-between hover:p-[2px]">
          <div className="w-full  mb-4">
            {/* <h3>{userData.name} </h3> */}

            <img
              src={service.getFilePreview(featuredImage)}
              alt={title}
              className="rounded-xl overflow-hidden"
            />
          </div>
          <h2 className="text-xl font-normal p-2">{title}</h2>
        </div>
      </Link>
    </>
  );
}

export default PostCard;
