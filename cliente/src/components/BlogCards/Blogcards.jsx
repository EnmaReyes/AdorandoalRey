import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import "./Blogcards.scss";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faHeartCircleBolt,
  faHeartPulse,
  faShieldHeart,
} from "@fortawesome/free-solid-svg-icons";

const URL = import.meta.env.VITE_BACKEND_URL;
const Blogcards = () => {
  const [posts, setPosts] = useState([]);
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
  const nuevosPosts = posts.slice(0, 8);

  return (
    <div className="card-container">
      <h1 className="section-name">
        {" "}
        <Link to="/blogs" className="link">
          Blogs{" "}
        </Link>{" "}
      </h1>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        navigation={true}
        slidesPerView={"auto"}
        breakpoints={{
          // Definir diferentes cantidad de slides para diferentes tamaños de pantalla
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="mySwiper"
      >
        {nuevosPosts.map((post) => (
          <div key={post.id} className="card">
            <SwiperSlide>
              <Link className="link" to={`/post/${post.id}`}>
                <div className="img-card">
                  <img src={post.img} alt={post.title} />
                </div>
                <div className="data">
                  <h1 className="text-card">{post.title}</h1>
                  <div className="counter">{post.hearts.length >= 1 && <p className="count">{post.hearts?.length}</p>}</div>
                  <span>
                    <FontAwesomeIcon icon={faHeart} />
                  </span>
                </div>
              </Link>
            </SwiperSlide>
          </div>
        ))}
      </Swiper>
    </div>
  );
};

export default Blogcards;
