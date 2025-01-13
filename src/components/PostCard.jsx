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
      let decreaseLikes;
      if (likesCount > 0) {
        setLikesCount((like) => like - 1);
        decreaseLikes = likes - 1;
        setLike(false);
      }

      const updateLikes = await service.updatePost($id, {
        likes: decreaseLikes,
        likedBy: users.includes(userData.$id)
          ? users.filter((user) => user !== userData.$id)
          : users,
        title,
        featuredImage,
        content,
        userName,
      });

    } else {
      setLike(true);
      setLikesCount((like) => like + 1);

      let increaseLikes = likes + 1;

      await service.updatePost($id, {
        likes: increaseLikes,
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

        if (post) {
          setLikesCount(post.likes);
          setUsers(post.likedBy);

          // users.includes(userData.$id) ? setLike(true) : setLike(false);
          post.likedBy.forEach((user) => {
            if (userData.$id === user && post.likes > 0) {
              // console.log('this user', user);
              // console.log('this userdata id ', userData.$id);

              setLike(true);
            } else {
              setLike(false);
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchPost();
  }, []);

  return (
    <>
      <Link to={`/post/${$id}`} className="">
        <div className=" w-full h-full px-4 py-5 bg-[#dbe2eb] rounded-lg hover:shadow-2xl hover:shadow-gray-500 flex flex-col gap-4 duration-300 ">
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

          <div className="top-0 w-full h-full">
            {featuredImage ? (
              <img
                src={service.getFileImagePreview(featuredImage)}
                alt={title}
                className="rounded w-full h-full"
              />
            ) : // <p className="text-sm px-5">
            //   *Sorry the images are not being previewed yet !*
            // </p>
            null}
          </div>

          <div className="top-0 flex flex-col gap-3 sm:px-1 px-[2px] h-full">
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
                  <img src="/assets/likeIcon.png" className="w-5 h-5 " alt="" />
                )}
              </button>
              <p>{likesCount}</p>
            </div>

            {/* Save blogs starts */}

            {/* <div className="">
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
            </div> */}

            {/* Save blogs ends */}
          </div>
        </div>
      </Link>
    </>
  );
}

export default PostCard;
