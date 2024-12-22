import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import service from "../appwrite/config";

function AllPost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {}, []);

  // Note : maybe this code will come in the above useEffect
  service.getAllPosts([]).then((posts) => {
    if (posts) {
      setPosts(posts.documents);
    }
  });

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center bg-red-400">
        <Container>
          <div className="flex flex-wrap ">
            <div className="p-2 w-full ">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                You don't have any blogs to view.
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <>
      <div className="w-full py-5 bg-red-400">
        <Container>
          <div className="flex flex-wrap border-2 border-black rounded-lg">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}

export default AllPost;
