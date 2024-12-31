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
    console.log("Slug : ", slug);

    if (slug) {
      // TODO : Only call getpost when there is a active user
      service.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
          // console.log("post : ", post);
        } else navigate("/");
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

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
    <div className=" w-full md:py-8 sm:py-5 ">
      <Container>
        <div className="sm:min-h-96 sm:w-full bg-slate-400 shadow-2xl shadow-slate-800  flex flex-col md:flex-row  items-center p-2  gap-3 sm:rounded-xl mx-auto ">
          <div className="w-full  flex  justify-center rounded-xl h-64 sm:h-96 border border-slate-600">
            {post.featuredImage ? (
              (console.log("Current post: ", post),
              (
                <img
                  src={
                    service.getFilePreview(post.featuredImage) || 
                      <i className="fa-solid fa-image"></i>
                    
                  }
                  alt={post.title}
                  className="rounded-xl w-full"
                />
              ))
            ) : (
              <Link to={`/edit-post/${post.$id}`}>
                <h2 className="my-32">+ Add Image</h2>
              </Link>
            )}
          </div>

          <div className="flex flex-col justify-between  w-full p-2 sm:p-0 h-64 sm:h-96 ">
            <div className="sm:px-1 sm:py-3">
              <div className="w-full">
                <h1 className="text-2xl font-bold ">{post.title}</h1>
              </div>
              <hr className="text-black border my-2 border-slate-600" />
              <div className="browser-css sm:px-1 ">{parse(post.content)}</div>
            </div>

            {isAuthor && (
              <div className="flex justify-end gap-3 m-1">
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
        </div>
      </Container>
    </div>
  ) : null;
}
