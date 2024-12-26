import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import service from "../appwrite/config";
import NoPost from "../components/NoPost";
import { Query } from "appwrite";
import { useSelector } from "react-redux";

function MyPosts() {
  const [allPosts, setAllPosts] = useState([]);
  // console.log("All posts : ", allPosts);

  const userData = useSelector((state) => state.auth.userData);
  // console.log("My data : ", userData);
  

  useEffect(() => {
    service.getAllPosts([Query.equal("userId", userData.$id)]).then((posts) => {
      if (posts) {
        setAllPosts(posts.documents);
      }
    });
  }, []);

  // Note : maybe this code will come in the above useEffect
  // service.getAllPosts([]).then((posts) => {
  //   if (posts) {
  //     setPosts(posts.documents);
  //   }
  // });

  if (allPosts.length === 0) {
    return (
      <div className="w-full h-full py-5 text-center bg-[#6b7a8f]">
        <Container>
          <div className=" h-full">
            <div className="sm:w-1/4 w-full">
              <NoPost />
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <>
      <div className="w-full py-5 h-full bg-[#6b7a8f]">
        <Container>
          <h2 className="px-4 py-2 text-xl font-medium underline m-2 shadow-2xl rounded-full shadow-slate-900 inline-block">
            My Posts
          </h2>
          <div className="flex flex-wrap rounded-lg">
            {allPosts.map((post) => (
              <div key={post.$id} className="p-2 sm:w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}

export default MyPosts;