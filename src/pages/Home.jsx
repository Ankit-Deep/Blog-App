import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import { Container, PostCard } from "../components";
// import { getPostsSlice } from "../store/postSlice";
import { useSelector } from "react-redux";
import NoPost from "../components/NoPost";
import { Query } from "appwrite";
import authService from "../appwrite/auth";

function Home() {
  const [allPosts, setAllPosts] = useState([]);
  // const userStatus = useSelector((state) => state.auth.status);
  // console.log("user's data : ", userData);

  // if (userStatus) {
    useEffect(() => {
      service.getAllPosts([Query.equal("status", "active")]).then((posts) => {
        if (posts) {
          setAllPosts(posts.documents);

          // all`Posts.map((post) => {
          //   if (post.userId) {
          //     try {
          //       const currentAuthor = authService.getCurrentState();
          //       post.userName = currentAuthor.name;

          //     } catch (error) {
          //       console.error("Error fetching author:", error);
          //     }

          //     setAllPosts(posts);
          //   }
          // })
        }
      });
    }, []);
  // }

  console.log("All posts = ", allPosts);

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
  }

  return (
    <div className="w-full h-full py-5 bg-[#6b7a8f]">
      <Container>
        <h2 className="px-3 py-2 text-2xl font-bold  m-2 rounded-sm shadow-slate-900 inline-block">
          Home
        </h2>
        <div className="flex flex-wrap">
          {allPosts.map((post) => (
            <div key={post.$id} className="p-3 sm:w-2/4 md:w-2/6">
              {console.log("Current post",post)}
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
