import React, { useEffect, useState } from "react";
import "./Aboutme.scss";
import YoutobePlayer from "react-player/youtube";
import img01 from "../assets/AboutMe/img1.jpg";
import img02 from "../assets/AboutMe/img2.jpg";
import img03 from "../assets/AboutMe/img3.jpg";
import Contactus from "../components/ContactUS/contactus";

const Aboutme = () => {
  const [onplay, setOnplay] = useState(true);

  const [inView, setInView] = useState({});

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
    <div className="about-container">
      {/* Hero Section with Video */}
      <section className="video-section">
        <div className="video-wrapper">
          <div className="video-container">
            <YoutobePlayer
              url="https://www.youtube.com/watch?v=5ZqRuP40UQ0"
              controls
              playing={onplay}
              width="100%"
              height="100%"
            />
          </div>
          <div className="video-overlay"></div>
        </div>
      </section>
      {/* Main Title */}
      <section className="hero-title">
        <h1 className="main-title">Yasmira Coronel Castillo</h1>
        <p className="subtitle">
          Pastora, Educadora y Predicadora del Evangelio
        </p>
        <div className="decorative-line"></div>
      </section>
      {/* Section 1: Introduction */}
      <section className="info-section">
        <div className="content-wrapper">
          <div className="text-content fade-in">
            <div className="section-label">Historia</div>
            <h2>Un Viaje de Fe y Servicio</h2>
            <p>
              Oriunda de Cabimas, Venezuela, ha tejido una vida de servicio y
              fe, marcada por su dedicación a la familia, la educación y la
              espiritualidad. Su viaje comenzó en 1999, un año definitorio donde
              su encuentro con la fe cristiana se convirtió en el faro que
              guiaría su camino a través de desafíos personales y profesionales.
            </p>
            <ul className="highlights">
              <li>Oriunda de Cabimas, Venezuela</li>
              <li>Dedicada al servicio comunitario</li>
              <li>Mujer de fe y convicción</li>
            </ul>
          </div>
          <div className="image-content">
            <div className="image-frame">
              <img src={img01} alt="Yasmira Coronel Castillo" />
              <div className="image-overlay"></div>
            </div>
          </div>
        </div>
      </section>
      {/* Section 2: Professional */}
      <section className="info-section alternate">
        <div className="content-wrapper">
          <div className="image-content">
            <div className="image-frame">
              <img src={img02} alt="Madre y Profesional" />
              <div className="image-overlay"></div>
            </div>
          </div>
          <div className="text-content fade-in">
            <div className="section-label">Profesionalismo</div>
            <h2>Madre, Educadora y Locutora</h2>
            <p>
              Yasmira ha equilibrado magistralmente la crianza de sus hijos con
              la búsqueda continua de conocimiento y excelencia. Su dedicación
              se refleja en sus múltiples títulos académicos y su experiencia
              profesional.
            </p>
            <ul className="highlights">
              <li>Licenciada en Administración de Empresas</li>
              <li>Estudios en Teología y Ministerio</li>
              <li>Experiencia como Locutora y Comunicadora</li>
              <li>Madre e inspiradora de generaciones</li>
            </ul>
          </div>
        </div>
      </section>
      {/* Section 3: Mission */}
      <section className="info-section">
        <div className="content-wrapper">
          <div className="text-content fade-in">
            <div className="section-label">Misión</div>
            <h2>Adorando al Rey - Mi Pasión</h2>
            <p>
              Su pasión por compartir el mensaje del Evangelio la llevó a crear
              un programa radial y una plataforma digital, ambos titulados
              "Adorando al Rey", que se han convertido en espacios
              transformadores para extender palabras de esperanza, liberación y
              fe.
            </p>
            <div className="mission-highlight">
              <strong>Pastora Consejera</strong> - Iglesia La Roca, Rancagua,
              Chile
            </div>
            <p>
              Su compromiso con su comunidad se refleja en su consagración como
              Pastora Consejera y en su labor continua. A pesar de los cambios y
              las transiciones, su misión permanece inalterable: difundir las
              buenas nuevas de salvación con orgullo y convicción.
            </p>
          </div>
          <div className="image-content">
            <div className="image-frame">
              <img src={img03} alt="Mi Pasión" />
              <div className="image-overlay"></div>
            </div>
          </div>
        </div>
      </section>
      {/* Values Section */}
      <section className="values-section">
        <h2>Valores que Definen su Vida</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">💡</div> <h3>Espiritualidad</h3>
            <p>Fe auténtica y relación profunda con Dios</p>
          </div>
          <div className="value-card">
            <div className="value-icon">👨‍👩‍👧‍👦</div> <h3>Familia</h3>
            <p>Núcleo fundamental en su vida y ministerio</p>
          </div>
          <div className="value-card">
            <div className="value-icon">📚</div> <h3>Educación</h3>
            <p>Compromiso con la enseñanza y el crecimiento</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🤝</div> <h3>Servicio</h3>
            <p>Dedicación al bienestar comunitario</p>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section className="contact-section">
        <Contactus />
      </section>
    </div>
  );
};

export default Aboutme;
