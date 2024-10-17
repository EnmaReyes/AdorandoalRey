import React, { useEffect, useState } from "react";
import "./Aboutme.scss";
import YoutobePlayer from "react-player/youtube";
import img01 from "../assets/AboutMe/yasmira-1.jpg"
const Aboutme = () => {
  const [onplay, setOnplay] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 350) {
        setOnplay(false);
      } else if (window.scrollY < 100) {
        setOnplay(true);
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="about-conteiner">
      <div className="video">
        <YoutobePlayer
          url="https://www.youtube.com/watch?v=5ZqRuP40UQ0"
          controls
          playing={onplay}
          width={820}
          height={500}
        />
      </div>
      <div className="info">
        <div className="data">
          <h1>Yasmira</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            quidem asperiores assumenda cum obcaecati fuga consequuntur? Error
            ipsa distinctio quas consectetur, placeat beatae autem repudiandae
            officiis numquam facere, esse consequatur.
          </p>
        </div>
        <div className="picture">
          <img src={img01} alt="" />
        </div>
      </div>
      <div className="info">
        <div className="picture">
          <img src={img01} alt="" />
        </div>
        <div className="data">
          <h1>Yasmira</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            quidem asperiores assumenda cum obcaecati fuga consequuntur? Error
            ipsa distinctio quas consectetur, placeat beatae autem repudiandae
            officiis numquam facere, esse consequatur.
          </p>
        </div>
      </div>
      <div className="info">
        <div className="data">
          <h1>Yasmira</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            quidem asperiores assumenda cum obcaecati fuga consequuntur? Error
            ipsa distinctio quas consectetur, placeat beatae autem repudiandae
            officiis numquam facere, esse consequatur.
          </p>
        </div>
        <div className="picture">
          <img src={img01} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Aboutme;
