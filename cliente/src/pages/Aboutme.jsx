import React, { useEffect, useState } from "react";
import "./Aboutme.scss";
import YoutobePlayer from "react-player/youtube";
import img01 from "../assets/AboutMe/img1.jpg";
import img02 from "../assets/AboutMe/img2.jpg";
import img03 from "../assets/AboutMe/img3.jpg";
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
          <h1>Yasmira Coronel Castillo</h1>
          <p>
            Oriunda de Cabimas, Venezuela, ha tejido una vida de servicio y fe,
            marcada por su dedicación a la familia, la educación y la
            espiritualidad. Su viaje comenzó en 1999, un año definitorio donde
            su encuentro con la fe cristiana se convirtió en el faro que guiaría
            su camino a través de desafíos personales y profesionales.
          </p>
        </div>
        <div className="picture">
          <img src={img01} alt="" />
        </div>
      </div>
      <div className="info">
        <div className="picture">
          <img src={img02} alt="" />
        </div>
        <div className="data">
          <h1>Madre y Profesional</h1>
          <p>
            Yasmira ha equilibrado la crianza de sus hijos con la búsqueda de
            conocimiento, obteniendo títulos en Administración de Empresas y
            Teología, además de su trabajo como locutora.
          </p>
        </div>
      </div>
      <div className="info">
        <div className="data">
          <h1>Mi Pasión</h1>
          <p>
            Su pasión por compartir el mensaje del Evangelio la llevó a crear un
            programa radial y un blog, ambos titulados "Adorando al Rey", que se
            convirtieron en plataformas para extender palabras de esperanza y
            liberación. Su compromiso con su comunidad se refleja en su
            consagración como Pastora Consejera y en su labor continua en la
            Iglesia La Roca en Rancagua, Chile. A pesar de los cambios y las
            transiciones, su misión permanece inalterable: difundir las buenas
            nuevas de salvación, un mensaje que lleva con orgullo y convicción a
            dondequiera que la vida la lleve.
          </p>
        </div>
        <div className="picture">
          <img src={img03} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Aboutme;
