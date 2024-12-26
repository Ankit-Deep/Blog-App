import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Container, PostForm } from "../components";

function EditPost() {
  const [post, setPost] = useState();
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="sm:py-5 py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
