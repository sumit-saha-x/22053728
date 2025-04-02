import React, { useEffect, useState } from "react";
import { getUsers, getUserPosts } from "../api";

const TopUsers = () => {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const users = await getUsers();
      const postCounts = [];

      for (let userId in users) {
        const posts = await getUserPosts(userId);
        postCounts.push({ name: users[userId], postCount: posts.length });
      }

      postCounts.sort((a, b) => b.postCount - a.postCount);
      setTopUsers(postCounts.slice(0, 5)); // Top 5 users
    };

    fetchData();
  }, []);

  return (
    <div className="p-5 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Top Users</h2>
      <ul>
        {topUsers.map((user, index) => (
          <li key={index} className="mb-2">
            {user.name} - {user.postCount} posts
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopUsers;
