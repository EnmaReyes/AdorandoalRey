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
import img3 from "../assets/BANNERS_E_IMAGENES/003.png";
import Blogcards from "../components/BlogCards/Blogcards";
const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const Home = () => {
  // const [posts, setPosts] = useState([]);
  // const location = useLocation().search;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get(`${URL}/api/posts/${location}`);
  //       setPosts(res.data);
  //       window.scrollTo(0, 0);
  //     } catch (error) {}
  //   };

  //   fetchData();
  // }, [location]);
  // const nuevosPosts = posts.slice(0, 8);

  // carrusel
  const banerImg = [img1, img2, img3];

  const [currentImage, setCurrentImage] = useState(banerImg[0]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => {
        if (prevImage === banerImg[0]) {
          return banerImg[1];
        } else if (prevImage === banerImg[1]){
          return banerImg[2];
        }else if (prevImage === banerImg[2]){
          return banerImg[0]
        }
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // // los mas gutados\\
  // const postsOrdenados = [...posts].sort(
  //   (a, b) => b.hearts.length - a.hearts.length
  // );
  // const primeros8Posts = postsOrdenados.slice(0, 8);

  return (
    <div className="home">
      <div
        className="wellcome"
        style={{ backgroundImage: `url(${currentImage})` }}
      >
        <Banner />
      </div>

     {/* BLOGS  */}
     <div className="blogs-container">
     <Blogcards/>
     </div>
    </div>
  );
};

export default Home;
