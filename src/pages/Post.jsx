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
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="bg-slate-400 shadow-2xl shadow-slate-800 sm:w-full flex flex-col sm:flex-row p-2 sm:p-5 sm:gap-5 rounded-2xl">
          <div className="w-full sm:w-3/4 flex justify-center mb-4 rounded-xl">
            <img
              src={service.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-xl"
            />
          </div>

          <div className="flex flex-col justify-between pb-5 px-2 w-full">
            <div>
              <div className="w-full p-1">
                <h1 className="text-2xl font-bold underline">{post.title}</h1>
              </div>
              <div className="browser-css px-1">{parse(post.content)}</div>
            </div>

            {isAuthor && (
              <div className="flex justify-end gap-2 px-2">
                <Link to={`/edit-post/${post.$id}`} className="">
                  <Button bgColor="bg-blue-500" className="mr-3">
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
