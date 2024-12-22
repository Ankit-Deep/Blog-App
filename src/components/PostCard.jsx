import React from "react";
// import fileService from "../appwrite/file";
import { Link } from "react-router-dom";
import service from "../appwrite/config";

function PostCard({ $id, title, featuredImage }) {
  return (
    <>
      <Link to={`/post/${$id}`} className="">
        <div className="w-full rounded-xl p-2 bg-gray-300 ">
          <div className="w-full justify-center mb-4">
            <img
              src={service.getFilePreview(featuredImage)}
              alt={title}
              className="rounded-xl  overflow-hidden"
            />
          </div>
          <h2 className="text-xl font-medium">{title}</h2>
        </div>
      </Link>
    </>
  );
}

export default PostCard;
