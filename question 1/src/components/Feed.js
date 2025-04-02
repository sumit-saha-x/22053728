import React, { useEffect, useState } from "react";
import { getUsers, getUserPosts } from "../api";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const users = await getUsers();
      let allPosts = [];

      for (let userId in users) {
        const posts = await getUserPosts(userId);
        allPosts = [...allPosts, ...posts];
      }

      allPosts.sort((a, b) => b.id - a.id);
      setPosts(allPosts);
    };

    fetchData();
  }, []);

  return (
    <div className="p-5 bg-yellow-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Live Feed</h2>
      {posts.map((post) => (
        <div key={post.id} className="p-3 mb-3 bg-white rounded-lg shadow-sm">
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Feed;
