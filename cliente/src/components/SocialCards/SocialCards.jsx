import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  EffectFade,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade"; // Importante para transiciones suaves si quisieras

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faSpotify, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { API_URL } from "../../config.js";
import "./Socialcards.scss";

const SocialCards = () => {
  const [posts, setPosts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation().search;
  const [swiperRef, setSwiperRef] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/posts/${location}`);
        setPosts(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, [location]);

  const stripHtml = (html) => {
    if (!html) return "";
    return html.replace(/<[^>]*>?/gm, "").trim();
  };

  const slides = posts.slice(0, 8).map((post) => {
    const links =
      typeof post.links === "string" ? JSON.parse(post.links) : post.links;

    return { ...post, links };
  });

  const activePost = slides[activeIndex];

  return (
    <section className="hero-slider">
      {/* 1. CAPA DE FONDO (Background) */}
      <div className="hero-slider__background">
        {slides.map((post, index) => (
          <img
            key={post.id}
            src={post.img}
            alt={post.title}
            className={`bg-image ${index === activeIndex ? "active" : ""}`}
          />
        ))}
        <div className="overlay-gradient"></div>
      </div>

      {/* 2. CONTENIDO PRINCIPAL (Izquierda) */}
      <div className="hero-slider__content">
        <div className="content-wrapper">
          <span className="subtitle">Escucha los Blogs</span>
          <h1 className="main-title" key={activePost?.id}>
            {activePost?.title}
          </h1>
          <p className="description" key={`desc-${activePost?.id}`}>
            {stripHtml(activePost?.desc) ||
              "Explora este increíble articulo y sumérgete en el audio Blog."}
          </p>

          <div className="action-buttons">
            <Link to={`/post/${activePost?.id}`}>
              <button className="btn-discover">
                Leer <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </Link>
            {/* Tus iconos sociales originales */}
            <div className="social-links">
              {activePost?.links?.spotify && (
                <a
                  href={activePost.links.spotify}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faSpotify} />
                </a>
              )}
              {activePost?.links?.youtobe && (
                <a
                  href={activePost.links.youtobe}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
              )}
              {activePost?.links?.podimo && (
                <a
                  href={activePost.links.podimo}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="icon-podimo"></span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. EL SLIDER (Derecha/Abajo) */}
      <div className="hero-slider__swiper-container">
        <Swiper
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          spaceBetween={24}
          slidesPerView={1.5}
          centeredSlides
          grabCursor
          initialSlide={0}
          breakpoints={{
            640: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3.5 },
          }}
          navigation
          mousewheel
          keyboard
          onSwiper={setSwiperRef}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="social__swiper"
        >
          {slides.map((post, index) => (
            <SwiperSlide key={post.id}>
              <div
                className={`slide-card ${
                  index === activeIndex ? "is-active" : ""
                }`}
                onClick={() => {
                  swiperRef?.slideTo(index);
                  setActiveIndex(index);
                }}
              >
                <img src={post.img} alt={post.title} loading="lazy" />
                <div className="slide-info">
                  <h3>{post.title}</h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SocialCards;
