import { React, useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo1 from "../assets/logo1.png";
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
    <div id="navbar" className={scrolled ? "scrolled" : ""}>
      <div className="container-navbar">
        <div className="search-bar">
          <Search setSearchResult={setSearchResult} />
          <SearchResults searchResult={searchResult} />
        </div>
        <div className="logo">
          <Link to="/" className="link">
            <img src={logo1} alt="logo" />
          </Link>
        </div>

        <div className="links">
          {currentUser?.admin === true && (
            <span>
              <Link className="link" to="/write">
                Escribir
              </Link>
            </span>
          )}
          <Link className="link" to="/blogs">
            <span>Blogs</span>
          </Link>
          <Link className="link" to="/Aboutme">
            <span>Sobre mi</span>
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
            <Link className="link" to="/login">
              Inisiar sesion
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
