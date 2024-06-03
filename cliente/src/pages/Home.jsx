import { React, useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

import "./Home.scss";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, FreeMode } from "swiper/modules";

import "../App.css";
import Banner from "../components/Banner";

import img1 from "../assets/BANNERS_E_IMAGENES/banner_01.gif";
import img2 from "../assets/BANNERS_E_IMAGENES/banner_02.gif";

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
const imgBlog = require.context(`${URL}/upload/`, true)

const Home = () => {
  const [posts, setPosts] = useState([]);
  const location = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${URL}/api/posts/${location}`);
        setPosts(res.data);
        window.scrollTo(0, 0);
      } catch (error) {}
    };
    console.log(URL);
    fetchData();
  }, [location]);
  const nuevosPosts = posts.slice(0, 8);

  // carrusel
  const banerImg = [img1, img2];

  const [currentImage, setCurrentImage] = useState(banerImg[0]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => {
        if (prevImage === banerImg[0]) {
          return banerImg[1];
        } else {
          return banerImg[0];
        }
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // los mas gutados\\
  const postsOrdenados = [...posts].sort(
    (a, b) => b.hearts.length - a.hearts.length
  );
  const primeros8Posts = postsOrdenados.slice(0, 8);

  return (
    <div className="home">
      <div
        className="wellcome"
        style={{ backgroundImage: `url(${currentImage})` }}
      >
        <Banner />
      </div>
      <h1>Nuevos Posts</h1>
      <Swiper
        slidesPerView={3}
        spaceBetween={80}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        <div className="cards">
          {nuevosPosts.map((post) => (
            <SwiperSlide key={post.id}>
              <Link className="link" to={`/post/${post.id}`}>
                <div className="img">
                  <img
                    src={
                      `${imgBlog}${post.img}`
                    }
                    alt={post.img}
                    onError={(e) => { e.target.src = `../public/upload/${post.img}` }}
                  />
                </div>
              </Link>
              <div className="content">
                <h1>{post.title}</h1>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>

      <h1>Posts mas Gustados</h1>
      <Swiper
        slidesPerView={3}
        spaceBetween={80}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        <div className="cards">
          {primeros8Posts.map((post) => (
            <SwiperSlide key={post.id}>
              <Link className="link" to={`/post/${post.id}`}>
                <div className="img">
                  <img
                    src={
                      `${imgBlog}${post.img}`
                    }
                    onError={(e) => { e.target.src = `../public/upload/${post.img}` }}
                    alt="img"
                  />
                </div>
              </Link>
              <div className="content">
                <h1>{post.title}</h1>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};

export default Home;
