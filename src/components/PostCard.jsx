import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import service from "../appwrite/config";
import authService from "../appwrite/auth";
import parse from "html-react-parser";
import { Query } from "appwrite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

// import { getPostsSlice } from "../store/postSlice";

// $id is basically slug & document id too
function PostCard({
  $id,
  userId,
  title,
  featuredImage,
  content,
  userName,
  likes,
  likedBy,
}) {
  // const { $id, title, featuredImage, content, userName, likes } = post;
  // console.log('$id ', $id);
  // console.log('username', userName);


  const [like, setLike] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);
  const [users, setUsers] = useState([]);

  // console.log("users : ", users);
  const userData = useSelector((state) => state.auth.userData);
  // console.log("Userdata ", userData);

  const likeButton = async (e) => {
    setUsers(likedBy);

    if (like === true) {
      setLikesCount((like) => like - 1);

      let decreaseLike = likes - 1;

      const updateLikes = await service.updatePost($id, {
        likes: decreaseLike,
        // likesStatus: false,
        likedBy: users.includes(userData.$id)
          ? users.filter((user) => user !== userData.$id)
          : users,
        title,
        featuredImage,
        content,
        userName,
      });

      setLike(false);
    } else {
      setLike(true);
      setLikesCount((like) => like + 1);

      let increaseLike = likes + 1;

      await service.updatePost($id, {
        likes: increaseLike,
        // likesStatus: true,
        likedBy: users.includes(userData.$id)
          ? users
          : [...users, userData.$id],
        title,
        featuredImage,
        content,
        userName,
      });
    }
  };

  useEffect(() => {
    async function fetchPost() {
      try {
        const post = await service.getPost($id);
        // console.log("post", post);

        if (post) {
          setLikesCount(post.likes);
          // setLike(post.likesStatus);
          setUsers(post.likedBy);

          // users.includes(userData.$id) ? setLike(true) : setLike(false);
          post.likedBy.forEach((user) => {
            if (userData.$id === user) {
              setLike(true);
            } else {
              setLike(false);
            }
          });
          // console.log("post", post);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchPost();
  }, [$id]);

  return (
    <>
      <Link to={`/post/${$id}`} className="">
        <div className=" w-full h-full bg-[#8191a7] rounded-lg shadow-gray-700 shadow-2xl hover:shadow-2xl hover:shadow-gray-950 flex flex-col gap-3 p-4 hover:p-[20px] duration-200 ">

          {/* User profile starts */}
          <div className=" flex items-center gap-2">
            <span className="w-6 h-6 rounded-full ">
              <img src="/assets/userIcon2.png" alt="Profile icon" />
            </span>
            <h3
              className="font-medium text-sm hover:underline"
              title={userName}
            >
              {userName}{" "}
            </h3>
          </div>
          {/* User profile ends */}

          <div className=" w-full h-full">
            <img
              src={
                service.getFilePreview(featuredImage) 
              }              
              alt={title}
              className="rounded-md w-full h-[90%]"
            />
          </div>

          <div className=" flex flex-col gap-3 sm:px-1 px-[2px] h-full">
            <h2 className="text-xl  font-semibold">{title}</h2>

            <p className="">{parse(content)}</p>
          </div>

          <div className=" h-8 object-center flex items-center justify-between sm:px-[5px] px-[3px] ">
            <div className="flex gap-2">
              <button
                type="button"
                className=""
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  likeButton(e);
                }}
              >
                {like === true ? (
                  <img
                    src="/assets/likedIconPink.png"
                    className="w-5 h-5"
                    alt=""
                  />
                ) : (
                  <img
                    src="/assets/likeIcon.png"
                    className="w-5 h-5 "
                    alt=""
                  />
                )}
              </button>
              <p>{likesCount}</p>
            </div>

            {/* Save blogs starts */}

            <div className="">
              <button
                type="button"
                className=""
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  saveBlog(e);
                }}
              >
                <img
                  src="/assets/bookmark_icon.png"
                  className="w-5 h-5"
                  alt=""
                />
              </button>
            </div>
            {/* Save blogs ends */}
          </div>
        </div>
      </Link>
    </>
  );
}

export default PostCard;
