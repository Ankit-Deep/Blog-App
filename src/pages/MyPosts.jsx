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

  if (allPosts.length === 0) {
    return (
      <div className=" py-5 mt-14 sm:mt-16 text-center bg-white">
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
      <div className="w-full py-5 mt-14 sm:mt-16 bg-white">
        <Container>
          <h2 className="sm:px-3 py-2 text-2xl font-bold  my-2 rounded-sm shadow-slate-900 inline-block">
            My Posts
          </h2>
          <div className=" flex sm:flex-row flex-wrap flex-col">
            {allPosts.map((post) => (
              <div key={post.$id} className="sm:p-2 py-2 sm:w-2/4 md:w-2/6">
                {/* {console.log("Current post",post)} */}
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
