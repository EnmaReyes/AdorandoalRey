import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "./Blogcards.scss";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import axios from "axios";
const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

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
  console.log(nuevosPosts);
  return (
    <div className="card-container">
      <h1 className="section-name">Blogs</h1>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {nuevosPosts.map((post) => (
            <div key={post.id} className="card"> 
          <SwiperSlide >
            <Link className="link" to={`/post/${post.id}`}>
              <div className="img-card">
                <img src={post.img} alt={post.title} />
              </div>
              <div className="data">
              <h1 className="text-card">{post.title}</h1>
            <p>{post.hearts?.length}</p>
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
