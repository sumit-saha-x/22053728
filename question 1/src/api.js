import axios from "axios";

const BASE_URL = "http://20.244.56.144/evaluation-service";
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."; // Use your token

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data.users;
};

export const getUserPosts = async (userId) => {
  const res = await api.get(`/users/${userId}/posts`);
  return res.data.posts;
};

export const getPostComments = async (postId) => {
  const res = await api.get(`/posts/${postId}/comments`);
  return res.data.comments;
};
