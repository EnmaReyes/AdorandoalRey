import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Share from "../components/Share";
import "./Blogs.scss";
import img from '../assets/background/006.png'
const URL = import.meta.env.VITE_BACKEND_URL;

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const location = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${URL}/api/posts/${location}`, {
          withCredentials: true,
        });
        setPosts(res.data);
        window.scrollTo(0, 0);
      } catch (error) {}
    };
    fetchData();
  }, [location]);

  const getText = (html) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    const clonedElement = tempElement.cloneNode(true);
    // Obtener el texto y truncarlo a 200 caracteres
    const truncatedText = clonedElement.innerText.slice(0, 500);

    // Devolver el contenido HTML con el texto truncado
    return truncatedText;
  };

  return (
    <div className="blogs">
      <div className="img-inicio">
        <img src={img} alt="" />
      </div>
      <div className="blogs-container">
        <h1>Blogs</h1>
        <div className="blogs-box">
          {posts.map((post) => (
            <div className="blog" key={post.id}>
              <div className="img-blog">
                <Link className="link" to={`/post/${post.id}`}>
                  <img src={post.img} alt="img" />
                </Link>
              </div>
              <div className="blog-info">
                <h1 className="blog-titulo">{post.title}</h1>
                <p className="parrafo" dangerouslySetInnerHTML={{ __html: getText(post.desc) }}></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
