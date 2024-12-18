import { React } from "react";
import "../style.scss";
import "./Home.scss";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import Banner from "../components/Banner";
import Blogcards from "../components/BlogCards/Blogcards";
import SocialCards from "../components/SocialCards/SocialCards";
import {API_URL} from "../config.js";

const URL = API_URL;

const Home = () => {
  
  // los mas gutados\\
  // const postsOrdenados = [...posts].sort(
  //   (a, b) => b.hearts.length - a.hearts.length
  // );
  // const primeros8Posts = postsOrdenados.slice(0, 8);

  return (
    <div className="home">
      
      <Banner />
      {/* BLOGS  */}
      <div className="blogs-container">
        <Blogcards />
      </div>

      <div className="socials-cards">
        <SocialCards />
      </div>
    </div>
  );
};

export default Home;
