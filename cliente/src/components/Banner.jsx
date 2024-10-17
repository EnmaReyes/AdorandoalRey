import React, { useState, useEffect } from "react";
import "./Banner.scss"; // Asegúrate de importar tu archivo de estilos
import img1 from "../assets/BANNERS_E_IMAGENES/banner_02.png";
import img2 from "../assets/BANNERS_E_IMAGENES/banner_01.png";
import img3 from "../assets/BANNERS_E_IMAGENES/003.png";

const banerImg = [img1, img2, img3];

const Banner = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % banerImg.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="banner">
      {banerImg.map((img, index) => (
        <img
          key={index}
          src={img}
          className={index === currentImage ? "active" : ""}
          alt={`banner-img-${index}`}
        />
      ))}
    </div>
  );
};

export default Banner;
