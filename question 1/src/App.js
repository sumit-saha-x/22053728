import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TopUsers from "./components/TopUsers";
import TrendingPosts from "./components/TrendingPosts";
import Feed from "./components/Feed";

const App = () => {
  return (
    <Router>
      <div className="container mx-auto p-5">
        <h1 className="text-2xl font-bold mb-4">Social Media Analytics</h1>
        <nav className="mb-4">
          <Link className="mr-4 text-blue-500" to="/">Home</Link>
          <Link className="mr-4 text-blue-500" to="/top-users">Top Users</Link>
          <Link className="mr-4 text-blue-500" to="/trending">Trending Posts</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/top-users" element={<TopUsers />} />
          <Route path="/trending" element={<TrendingPosts />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
