import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
// import fileService from "../appwrite/file";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  // console.log("userdata :", userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    // console.log("Slug : ", slug);
    if (slug) {
      // TODO : Only call getpost when there is a active user
      service.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  console.log("Individual post : ", post);

  const deleteThisPost = () => {
    console.log("Delete func called : ");
    service.deletePost(post.$id).then((status) => {
      console.log(status);

      if (status) {
        service.deleteFile(post.featuredImage);
        navigate("/my-posts");
      }
    });
  };
  

  return post ? (
    <div className="min-h-96 w-full md:py-8 sm:py-5 ">
      <Container>
        <div className="` min-h-96 sm:w-full bg-slate-400 shadow-2xl shadow-slate-800  flex flex-col md:flex-row  items-center p-2  gap-3 sm:rounded-xl mx-auto ">
          <div className=" w-full flex flex-col  justify-start rounded-xl h-full sm:h-96  border-slate-500">
          
            {post.featuredImage ? (
              <img
                src={service.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-xl w-full h-full"
              />
            ) : (
              <p className="text-sm px-5">
                *Sorry the images are not being previewed yet !*
              </p>
            )}
          </div>

          <div className=" flex flex-col justify-between  w-full p-2 sm:p-0 h-64 sm:h-96 ">
            <div className="sm:px-1 sm:py-2 ">
              <div className="w-full">
                {/* User profile starts */}
                <div
                  className="w-fit flex items-center gap-2 cursor-pointer"
                  title={post.userName}
                >
                  <span className="w-6 h-6 rounded-full ">
                    <img srcset="/assets/userIcon2.png" alt="" />
                  </span>
                  <h3 className="font-medium text-base hover:underline ">
                    {post.userName}
                  </h3>
                </div>
                {/* User profile ends */}
              </div>

              <h1 className="text-2xl py-2 px-1 font-bold ">{post.title}</h1>
              {/* <hr className="text-black border my-2  border-slate-600" /> */}
              <div className="px-1 ">{parse(post.content)}</div>
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
                <div className="  w-fit float-right flex justify-end gap-3 m-1">
                  <Link to={`/edit-post/${post.$id}`} className="">
                    <Button bgColor="bg-blue-500" className="">
                      Edit
                    </Button>
                  </Link>

                  <div className="" onClick={deleteThisPost}>
                    <Button bgColor="bg-red-600" className="">
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
