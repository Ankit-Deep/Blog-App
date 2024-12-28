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
    <div className="h-full py-10 sm:py-8 ">
      <Container>
        <div className="min-h-96 bg-slate-400 shadow-2xl shadow-slate-800 sm:w-4/5 flex flex-col sm:flex-row items-center p-2 sm:p-3 gap-3 rounded-xl mx-auto ">
          <div className="w-full sm:w-3/4 flex  justify-center rounded-xl h-64 sm:h-96 border border-slate-600">
            {post.featuredImage ? (
              <img
                src={service.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-xl"
              />
            ) : (
              <Link to={`/edit-post/${post.$id}`}>
                <h2 className="">+ Add Image</h2>
              </Link>
            )}
          </div>

          <div className="flex flex-col justify-between  w-full p-2 sm:p-0 h-64 sm:h-96 ">
            <div className="sm:px-1">
              <div className="w-full">
                <h1 className="text-2xl font-bold underline">{post.title}</h1>
              </div>
              <div className="browser-css sm:px-1 py-2">{parse(post.content)}</div>
            </div>

            {isAuthor && (
              <div className="flex justify-end gap-3">
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
