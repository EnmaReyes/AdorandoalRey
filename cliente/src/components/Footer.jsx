import React from "react";
import logo2 from "../assets/logoblanco.png";
import { Link } from "react-router-dom";
import "./Footer.scss";
const Footer = () => {
  return (
    <footer>
      <div className="grupo1">
        <div className="box">
          <img src={logo2} alt="logo2" />
        </div>

        <div className="box2">
          <h2>SIGUENOS</h2>
          <div className="icon">
            <ul>
              <li>
                <a
                  href="https://www.facebook.com/Adorandoalrey365/"
                  target="blanket"
                >
                  <i class="fab fa-facebook-f icon"></i>
                </a>
              </li>
              <li>
                <a href="#" target="blanket">
                  <i class="fab fa-twitter icon"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@adorandoalreyconyasmira1736"
                  target="blanket"
                >
                  <i class="fab fa-youtube icon"></i>
                </a>
              </li>
              <li>
                <a href="#" target="blanket">
                  <i class="fab fa-google icon"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/adorandoal_rey/"
                  target="blanket"
                >
                  <i class="fab fa-instagram icon"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://open.spotify.com/show/27rB0iFIKYLERvJYfCCRc3"
                  target="blanket"
                >
                  <i class="fab fa-spotify icon"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grupo2">
        <small>
          {" "}
          © 2023 <b>Adorando al rey</b>- Todos Los Derechos Reservados.
        </small>
      </div>
    </footer>
  );
};

export default Footer;
