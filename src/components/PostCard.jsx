import React from "react";
import { Link } from "react-router-dom";
import service from "../appwrite/config";
// import { getPostsSlice } from "../store/postSlice";

function PostCard({ $id, title, featuredImage }) {
  return (
    <>
      <Link to={`/post/${$id}`} className="">
        <div className="w-full h-[100%] rounded-xl p-1 bg-[#a2b4ce] shadow-md  shadow-gray-700 hover:shadow-2xl hover:shadow-slate-700 flex flex-col justify-between hover:p-[2px]">
          <div className="w-full  mb-4">
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
