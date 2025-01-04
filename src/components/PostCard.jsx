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
        likesStatus: false,
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
        likesStatus: true,
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
          setLike(post.likesStatus);
          setUsers(post.likedBy);

          // users.includes(userData.$id) ? setLike(true) : setLike(false);
          post.likedBy.forEach(user => {
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

  // users.find(userData.$id) ? setLike(true) : setLike(false);
  // users.forEach((user) => {
  //   console.log(user);
  // })

  return (
    <>
      <Link to={`/post/${$id}`} className="">
        <div className="w-full h-full bg-[#8191a7] rounded-lg shadow-gray-700 shadow-2xl hover:shadow-2xl hover:shadow-gray-950 flex flex-col p-4 hover:p-[20px] duration-200 ">
          {/* User profile */}
          <div className=" flex items-center gap-2">
            <span className="w-6 h-6 rounded-full ">
              {/* <img srcset="../../src/assets/userIcon2.png" alt="" /> */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg>
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
              srcSet={
                service.getFilePreview(featuredImage) 
              }
              alt={title}
              className="rounded-md w-full h-[90%]"
            />
          </div> */}

          <div className=" flex flex-col px-1 mb-6 h-full">
            <h2 className="text-xl my-5 font-semibold">{title}</h2>

            <p className="">{parse(content)}</p>
          </div>
          <div className=" h-8 object-center flex items-center gap-2 px-1">
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
                  srcSet="../../src/assets/LikedIcon.png"
                  className="w-5 h-5 "
                  alt=""
                />
              ) : (
                <img
                  srcset="../../src/assets/likeIcon.png"
                  className="w-5 h-5 "
                  alt=""
                />
              )}

              {/* {like === false ? (
                <img
                  srcSet="../../src/assets/likeIcon.png"
                  className="w-5 h-5 "
                  alt=""
                />
              ) : (
                <img
                  srcset="../../src/assets/LikedIcon.png"
                  className="w-5 h-5 "
                  alt=""
                />
              )} */}
            </button>
            <p>{likesCount}</p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default PostCard;
