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

  // users.find(userData.$id) ? setLike(true) : setLike(false);
  // users.forEach((user) => {
  //   console.log(user);
  // })

  return (
    <>
      <Link to={`/post/${$id}`} className="">
        <div className="border-2 border-black w-full h-full bg-[#8191a7] rounded-lg shadow-gray-700 shadow-2xl hover:shadow-2xl hover:shadow-gray-950 flex flex-col p-4 hover:p-[20px] duration-200 ">

          {/* User profile starts */}
          <div className=" flex items-center gap-2">
            <span className="w-6 h-6 rounded-full ">

              <img src="/assets/userIcon2.png" alt="Profile icon" />

              {/* <img src="../../src/assets/userIcon2.png" alt="" /> */}
              {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
              </svg> */}
              
            </span>
            <h3
              className="font-medium text-sm hover:underline"
              title={userName}
            >
              {userName}{" "}
            </h3>
          </div>

          {/* User profile ends */}

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
          <div className=" h-8 object-center flex items-center justify-between gap-2 px-1 ">
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
                  // <img
                  //   srcSet="../../src/assets/LikedIcon.png"
                  //   className="w-5 h-5 "
                  //   alt=""
                  // />

                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                  </svg>
                ) : (
                  // <img
                  //   srcset="../../src/assets/likeIcon.png"
                  //   className="w-5 h-5 "
                  //   alt=""
                  // />

                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
                  </svg>
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

            {/* Save blogs */}

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
                <svg
                  className="w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path d="M0 48C0 21.5 21.5 0 48 0l0 48 0 393.4 130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4 336 48 48 48 48 0 336 0c26.5 0 48 21.5 48 48l0 440c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488L0 48z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default PostCard;
