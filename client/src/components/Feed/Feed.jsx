import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
export default function Feed({ username }) {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = user?.username
        ? await axios.get(
            `https://sociobackend-6w0t.onrender.com/api/posts/profile/` +
              user.username
          )
        : await axios.get(
            `https://sociobackend-6w0t.onrender.com/api/posts/timeline/` +
              user._id
          );
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [user.username, user?._id]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
