import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Menu.scss";
const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const Menu = () => {
  const [posts, setPosts] = useState([]);
  const location = useLocation().search;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${URL}/api/posts/`);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const selectedPosts = useMemo(() => {
    const shuffledPosts = posts.sort(() => Math.random() - 0.5);
    return shuffledPosts.slice(0, 6);
  }, [posts]);

  return (
    <div className="menu">
      <h1>Temas Relacionados</h1>
    <div className="blogs">
      {selectedPosts.map((post) => (
        <div className="blog" key={post?.id}>
        <Link className="link" to={`/post/${post?.id}`}>
          <div className="post">
            <img src={post?.img} alt="img" />
            <h2 className="hiden">{post?.title}</h2>
          </div>
        </Link>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Menu;
