import {
  faChevronLeft,
  faChevronRight,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Share from "../components/Share";
import "./Blogs.scss";
import img from "../assets/background/006.png";
import ReactPaginate from "react-paginate";

const URL = import.meta.env.VITE_BACKEND_URL;
const POSTS_PER_PAGE = 1;

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const location = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${URL}/api/posts/${location}`, {
          withCredentials: true,
        });
        setPosts(res.data);
        window.scrollTo(0, 0);
      } catch (error) {}
    };
    fetchData();
  }, [location]);

  const getText = (html) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    const clonedElement = tempElement.cloneNode(true);
    // Obtener el texto y truncarlo a 200 caracteres
    const truncatedText = clonedElement.innerText.slice(0, 500);

    // Devolver el contenido HTML con el texto truncado
    return truncatedText;
  };
  // Indice del inicio
  const indexLastPost = (currentPage + 1) * POSTS_PER_PAGE;
  const indexFirstPost = indexLastPost - POSTS_PER_PAGE;
  const currentPosts = posts.slice(indexFirstPost, indexLastPost);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
  return (
    <div className="blogs">
      <div className="img-inicio">
        <img src={img} alt="" />
      </div>
      <div className="blogs-container">
        <h1>Blogs</h1>
        <div className="blogs-box">
          {currentPosts.map((post) => (
            <div className="blog" key={post.id}>
              <div className="img-blog">
                <Link className="link" to={`/post/${post.id}`}>
                  <img src={post.img} alt="img" />
                </Link>
              </div>
              <div className="blog-info">
                <h1 className="blog-titulo">{post.title}</h1>
                <p
                  className="parrafo"
                  dangerouslySetInnerHTML={{ __html: getText(post.desc) }}
                ></p>
              </div>
            </div>
          ))}
        </div>
        {/* Paginación */}
        <ReactPaginate
          previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
          nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
          breakLabel={"..."}
          pageCount={Math.ceil(posts.length / POSTS_PER_PAGE)} // Número total de páginas
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          className="paginacion"
          previousClassName={"prev-button"}
          nextClassName={"next-button"}
          pageClassName={"page-item"} // Clase para cada número de página
          pageLinkClassName={"page-link"} // Clase para el enlace del número de página
          disabledClassName={"disabled"} // Clase para los botones deshabilitados
        />
      </div>
    </div>
  );
};

export default Blogs;
