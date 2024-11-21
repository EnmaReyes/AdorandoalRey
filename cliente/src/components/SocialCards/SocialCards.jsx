import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Socialcards.scss";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { faSpotify, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { API_URL } from "../../config.js";

const URL = API_URL;
const SocialCards = () => {
  const [posts, setPosts] = useState([]);
  const [hoveredPostId, setHoveredPostId] = useState(null);
  const location = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${URL}/api/posts/${location}`);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [location]);

  const handleMouseEnter = (id) => {
    setHoveredPostId(id);
  };

  const handleMouseLeave = () => {
    setHoveredPostId(null);
  };

  const nuevosPosts = posts.slice(0, 8).map((post) => {
    // Si 'links' es una cadena JSON, la transformamos; si ya es un objeto, lo dejamos igual
    const parsedLinks =
      typeof post.links === "string" ? JSON.parse(post.links) : post.links;

    return {
      ...post, // Copiamos todos los campos del post original
      links: parsedLinks, // Sobrescribimos solo el campo 'links'
    };
  });
  return (
    <div className="social-conteiner">
      <div className="social-box">
        <Swiper
          cssMode={true}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper"
        >
          {nuevosPosts.map((blog) => (
            <div key={blog.id} className="post">
              <SwiperSlide>
                <div className="info">
                  <h1>{blog.title}</h1>
                  <div
                    className="image-container"
                    onMouseEnter={() => handleMouseEnter(blog.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <img
                      src={blog.img}
                      alt={blog.title}
                      className={hoveredPostId === blog.id ? "darkened" : ""}
                    />
                    {hoveredPostId === blog.id && (
                      <div className="hover">
                        {blog.links?.spotify && (
                          <a
                            href={blog.links?.spotify}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="spotifi-icon"
                          >
                            <FontAwesomeIcon icon={faSpotify} />
                          </a>
                        )}
                        {blog.links?.youtobe && (
                          <>
                            <a
                              href={blog.links?.youtobe || blog.links?.spotify}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="play-icon"
                            >
                              <FontAwesomeIcon icon={faPlayCircle} />
                            </a>
                            <a
                              href={blog.links?.youtobe}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="youtobe-icon"
                            >
                              <FontAwesomeIcon icon={faYoutube} />
                            </a>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SocialCards;
