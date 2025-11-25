import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import logoblanco from "../assets/logoblanco.png";
import { AuthContext } from "../context/authContext";
import Search from "../components/SearchBar/Search.jsx";
import SearchResults from "../components/SearchBar/SearchResults.jsx";
import "./NavBar.scss";
import DropDown from "./DropDownProfile/DropDown.jsx";
import Burguer from "./Burgericon/Burguer.jsx";

const NavBar = () => {
  const { currentUser } = useContext(AuthContext);

  const [searchResult, setSearchResult] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Handler universal para cerrar menú al navegar
  const handleNavClick = () => setMenuOpen(false);

  // Links públicos
  const publicLinks = [
    { to: "/", label: "Inicio" },
    { to: "/blogs", label: "Blogs" },
    { to: "/Aboutme", label: "Sobre mí" },
  ];

  // Links cuando NO hay usuario logueado
  const authLinks = [
    { to: "/login", label: "Iniciar sesión" },
    { to: "/register", label: "Registrate" },
  ];

  return (
    <div id="navbar">
      <div className="container-navbar">
        {/* Botón hamburguesa */}
        <div className="burguer">
          <Burguer
            clicked={menuOpen}
            handleClick={() => setMenuOpen(!menuOpen)}
          />
        </div>

        {/* Logo */}
        <div className="logo">
          <Link to="/" className="link">
            <img src={logoblanco} alt="logo" />
          </Link>
        </div>

        {/* Buscador */}
        <div className="search-bar">
          <Search setSearchResult={setSearchResult} />
          <SearchResults searchResult={searchResult} />
        </div>

        {/* Links */}
        <div className={`links ${menuOpen ? "active" : ""}`}>
          {/* Link solo para admin */}
          {currentUser?.admin && (
            <Link className="link" to="/write" onClick={handleNavClick}>
              Escribir
            </Link>
          )}

          {/* Links públicos */}
          {publicLinks.map(({ to, label }) => (
            <Link key={to} className="link" to={to} onClick={handleNavClick}>
              {label}
            </Link>
          ))}

          {/* Si no hay usuario → login + registro */}
          {!currentUser &&
            authLinks.map(({ to, label }) => (
              <Link key={to} className="link" to={to} onClick={handleNavClick}>
                {label}
              </Link>
            ))}
        </div>

        {/* Dropdown usuario */}
        {currentUser && (
          <div
            className="custom-select-navbar"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span>{currentUser.username}</span>

            {currentUser.image && (
              <img className="imgUSer" src={currentUser.image} alt="user" />
            )}

            {dropdownOpen && <DropDown />}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
