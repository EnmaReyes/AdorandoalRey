import { React, useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoblanco from "../assets/logoblanco.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/authContext";
import Home from "../pages/Home";
import axios from "axios";
import Search from "../components/SearchBar/Search.jsx";
import SearchResults from "../components/SearchBar/SearchResults.jsx";
import "./NavBar.scss";
import { notify } from "./toastConfig/toastconfigs.jsx";
import { text } from "@fortawesome/fontawesome-svg-core";

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const NavBar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [selectedOption, setSelectedOption] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const navegate = useNavigate();

  // scroll del navbar\\
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 400) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div id="navbar" className={scrolled ? "scrolled" : "noscrolled"}>
      <div className="container-navbar">
        <div className="logo">
          <Link to="/" className="link">
            <img src={logoblanco} alt="logo" />
          </Link>
        </div>
        
        <div className="search-bar">
          <Search setSearchResult={setSearchResult} />
          <SearchResults searchResult={searchResult} />
        </div>

        <div className="links">
          {currentUser?.admin === true && (
            <addEventListener>
              <Link className="link" to="/write">
                Escribir
              </Link>
            </addEventListener>
          )}
          <Link className="link" to="/blogs">
            <a>Blogs</a>
          </Link>
          <Link className="link" to="/Aboutme">
            <a>Sobre mi</a>
          </Link>

          {currentUser ? (
            <div className="custom-select-navbar">
              <button className="dropselector">{currentUser?.username}</button>
              <ul className="dropdown-menu-navbar">
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => navegate("/edit")}
                  >
                    Editar
                  </a>
                </li>
                <li>
                  <a 
                    onClick={() => notify(logout, "¿Está seguro en salir?")}
                  >
                    Salir
                  </a>
                </li>
              </ul>
              {currentUser?.image && (
                <img className="imgUSer" src={currentUser?.image} />
              )}
            </div>
          ) : (
            <> 
            <Link className="link" to="/login">
              Inisiar sesion
            </Link>

             <Link className="link" to="/register">
             Registrate
           </Link>
           </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
