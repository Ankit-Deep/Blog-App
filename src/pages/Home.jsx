import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import { Container, PostCard } from "../components";
// import { getPostsSlice } from "../store/postSlice";
import { useSelector } from "react-redux";
import NoPost from "../components/NoPost";
import { Query } from "appwrite";

function Home() {
  const [allPosts, setAllPosts] = useState([]);
  // const userData = useSelector((state) => state.auth.userData);
  const userStatus = useSelector((state) => state.auth.status);

  console.log("user's status : ", userStatus);

  if (userStatus === true) {
    useEffect(() => {
      service.getAllPosts([]).then((posts) => {
        if (posts) {
          setAllPosts(posts.documents);
        }
      });
    }, [userStatus]);
  }

  if (allPosts.length === 0) {
    return (
      <div className="w-full py-5 text-center bg-[#6b7a8f] h-full">
        <Container>
          <div className="w-full h-full">
            <div className="w-full sm:w-1/4">
              <NoPost />
            </div>
          </div>
        </Container>
      </div>
    );
  } else {
    return (
      <div className="w-full h-full py-5 bg-[#6b7a8f]">
        <Container>
          <h2 className="px-4 py-1 text-xl font-medium underline my-2">Home</h2>
          <div className="flex flex-wrap">
            {allPosts.map((post) => (
              <div key={post.$id} className="p-2 sm:w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }
}

export default Home;
