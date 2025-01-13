import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import conf from "../conf/conf";
// import fileService from "../appwrite/file";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  const [imgUrl, setImgUrl] = useState();

  useEffect(() => {
    if (slug) {
      // TODO : Only call getpost when there is a active user
      service.getPost(slug).then((post) => {
        if (post) {
          setPost(post);

          const url = service.getFileImagePreview(post.featuredImage);

          setImgUrl(url);
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);


  const deleteThisPost = () => {
    console.log("Delete func called : ");
    service.deletePost(post.$id).then((status) => {

      if (status) {
        service.deleteFile(post.featuredImage);
        navigate("/my-posts");
      }
    });
  };

  return post ? (
    <div className="  bg-white sm:my-16 mt-16 w-screen ">
      <Container>
        <div className="  md:max-w-3xl sm:p-5 bg-white  shadow-slate-800 items-center mx-auto">
          {/* Title & Blog's author name */}
          <div className="flex flex-col gap-6 py-2">
            <h1 className="text-3xl font-bold mt-5 sm:mt-2">{post.title}</h1>

            <div className="w-full ">
              {/* User profile starts */}
              <div
                className="w-fit flex items-center gap-2 cursor-pointer"
                title={post.userName}
              >
                <span className="w-7 h-7 rounded-full ">
                  <img src="/assets/userIcon2.png" alt="" />
                </span>
                <h3 className="font-medium text-base hover:underline ">
                  {post.userName}
                </h3>
              </div>
              {/* User profile ends */}
            </div>
          </div>
          {/* Title & Blog's author name */}

          <div className="my-4">
            {post.featuredImage ? (
              <img
                src={imgUrl}
                alt={post.title}
                className="rounded w-full h-full"
              />
            ) : // <p className="text-sm px-5">
            //   *Sorry the images are not being previewed yet !*
            // </p>
            null}
          </div>

          <div className="flex flex-col justify-between  w-full h-64 sm:h-96 ">
            <div className=" ">
              <div className=" ">{parse(post.content)}</div>
            </div>

            {/* like, bookmark , edit and delete */}
            <div className="flex items-center">
              <div className=" h-full w-full">
                {/* like button & count  */}
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
                    {/* {like === true ? (
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
                    )} */}
                  </button>
                  {/* <p>{likesCount}</p> */}
                </div>
                {/* like button & count  */}

                {/* bookmark button starts */}
                <div className="">
                  {/* <button
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
                    </button> */}
                </div>
                {/* bookmark button starts */}
              </div>

              {isAuthor && (
                <div className=" w-fit float-right flex justify-end gap-3 m-1">
                  <Link to={`/edit-post/${post.$id}`} className="">
                    <Button bgColor="bg-blue-500" className="text-white">
                      Edit
                    </Button>
                  </Link>

                  <div className="" onClick={deleteThisPost}>
                    <Button bgColor="bg-red-600" className="text-white">
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </div>
            {/* like, bookmark , edit and delete */}
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}
