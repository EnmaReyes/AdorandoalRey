import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// Styles
import "./Blogcards.scss";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

// Config
import { API_URL } from "../../config";

const Blogcards = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const controller = new AbortController();

    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/posts/${search}`, {
          signal: controller.signal,
        });
        setPosts(data);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Error fetching posts:", error);
        }
      }
    };

    fetchPosts();

    return () => controller.abort();
  }, [search]);

  // Memoizamos para evitar recalcular en cada render
  const latestPosts = useMemo(() => posts.slice(0, 8), [posts]);

  return (
    <section className="card-container">
      <h1 className="section-name">
        <Link to="/blogs" className="link">
          Blogs
        </Link>
      </h1>

      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides
        navigation
        slidesPerView="auto"
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false ,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="mySwiper"
      >
        {latestPosts.map(({ id, img, title, hearts }) => (
          <SwiperSlide key={id}>
            <Link className="link card" to={`/post/${id}`}>
              <div className="img-card">
                <img src={img} alt={title} loading="lazy" />
              </div>

              <div className="data">
                <h2 className="text-card">{title}</h2>

                <div className="likes">
                  {hearts?.length > 0 && (
                    <span className="count">{hearts.length}</span>
                  )}
                  <FontAwesomeIcon icon={faHeart} />
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Blogcards;
