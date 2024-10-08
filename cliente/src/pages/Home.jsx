import { React } from "react";
import "../style.scss";
import "./Home.scss";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../App.css";
import Banner from "../components/Banner";
import Blogcards from "../components/BlogCards/Blogcards";
import SocialCards from "../components/SocialCards/SocialCards";

const URL = import.meta.env.VITE_BACKEND_URL;

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
