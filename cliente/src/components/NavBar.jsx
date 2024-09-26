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
import DropDown from "./DropDownProfile/DropDown.jsx";
import Burguer from "./Burgericon/Burguer.jsx";

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const NavBar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [selectedOption, setSelectedOption] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [open, setopen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const navegate = useNavigate();

  // scroll del navbar\\
  // useEffect(() => {
  //   const onScroll = () => {
  //     if (window.scrollY > 400) {
  //       setScrolled(true);
  //     } else {
  //       setScrolled(false);
  //     }
  //   };
  //   window.addEventListener("scroll", onScroll);

  //   return () => window.removeEventListener("scroll", onScroll);
  // }, []);

  const handleClick = () => {
    setClicked(!clicked);
  };
  return (
    <div id="navbar">
      <div className="container-navbar">
        <div className="burguer">
          <Burguer clicked={clicked} handleClick={handleClick} />
        </div>
        <div className="logo">
          <Link to="/" className="link">
            <img src={logoblanco} alt="logo" />
          </Link>
        </div>

        <div className="search-bar">
          <Search setSearchResult={setSearchResult} />
          <SearchResults searchResult={searchResult} />
        </div>

        <div className={`links ${clicked ? "active" : ""}`}>
          {currentUser?.admin === true && (
            <addEventListener>
              <Link className="link" to="/write" onClick={()=>{setClicked(!clicked)}}>
                <a>Escribir</a>
              </Link>
            </addEventListener>
          )}
          <Link className="link" to="/" onClick={()=>{setClicked(!clicked)}}>
            <a>Inicio</a>
          </Link>
          <Link className="link" to="/blogs" onClick={()=>{setClicked(!clicked)}}>
            <a>Blogs</a>
          </Link>
          <Link className="link" to="/Aboutme" onClick={()=>{setClicked(!clicked)}}>
            <a>Sobre mí</a>
          </Link>
          {!currentUser && (
            <>
              <Link className="link" to="/login" onClick={()=>{setClicked(!clicked)}}>
                <a>Iniciar sesión</a>
              </Link>

              <Link className="link" to="/register" onClick={()=>{setClicked(!clicked)}}>
                <a> Registrate</a>
              </Link>
            </>
          )}
        </div>
        {currentUser && (
          <div
            className="custom-select-navbar"
            onClick={() => {
              setopen(!open);
            }}
          >
            <a>{currentUser?.username}</a>
            {currentUser?.image && (
              <img className="imgUSer" src={currentUser?.image} />
            )}
            {open && <DropDown />}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
