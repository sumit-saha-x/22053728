import React, { useEffect, useState } from "react";
import { getUsers, getUserPosts, getPostComments } from "../api";

const TrendingPosts = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const users = await getUsers();
      let postComments = [];

      for (let userId in users) {
        const posts = await getUserPosts(userId);
        for (let post of posts) {
          const comments = await getPostComments(post.id);
          postComments.push({ content: post.content, commentCount: comments.length });
        }
      }

      const maxComments = Math.max(...postComments.map((p) => p.commentCount));
      setTrendingPosts(postComments.filter((p) => p.commentCount === maxComments));
    };

    fetchData();
  }, []);

  return (
    <div className="p-5 bg-blue-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Trending Posts</h2>
      {trendingPosts.map((post, index) => (
        <div key={index} className="p-3 mb-3 bg-white rounded-lg shadow-sm">
          <p>{post.content}</p>
          <span className="text-sm text-gray-600">{post.commentCount} comments</span>
        </div>
      ))}
    </div>
  );
};

export default TrendingPosts;
