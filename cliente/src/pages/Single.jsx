import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import Comment from "../components/Comments/Comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faTrash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

import { faSpotify, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { parseISO, formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import Share from "../components/Share";
import "./Single.scss";
import Loading from "../components/Loading";
import Likes from "../components/Likes/Likes";
import { toast } from "react-toastify";
import { toastComments } from "../components/toastConfig/toastconfigs";

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const Single = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const postid = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);
  const [showCommentField, setShowCommentField] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isLoadidng, setIsLoading] = useState(true);

  // scroll del navbar
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${URL}/api/posts/${postid}`);
        setPost(res.data);
        setIsLoading(false);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Error al obtener el post:", error);
      }
    };
    fetchData();
  }, [postid]);

  // delete post
  const handleDelete = async () => {
    try {
      await axios.delete(`${URL}/api/posts/${postid}`, {
        withCredentials: true,
      });
      toast.success(
        "Eliminado con Exito",
        toastComments // estilo del toast
      );
      navigate("/");
    } catch (error) {
      console.error("Error al eliminar el post:", error);
    }
  };

  // Comentarios
  const toggleCommentField = () => {
    setShowCommentField(!showCommentField);
  };

  const getText = (html) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    const clonedElement = tempElement.cloneNode(true);

    return clonedElement.innerHTML;
  };

  return (
    <div className="sinlge-contain">
      {isLoadidng && (
        <div className="loading">
          <Loading />
        </div>
      )}
      <img id="postImg" className={scrolled ? "scroll" : ""} src={post?.img} />
      <div className="single">
        <div className="content">
          <h1 className="titulo">{post.title}</h1>

          <div className="box-parrafo">
            <p
              id="parafos"
              dangerouslySetInnerHTML={{ __html: getText(post.desc) }}
            ></p>
          </div>

          <div className="barra-contain">
            <div className="barra-data">
              <div className="user">
                {post?.user?.image && (
                  <img
                    className="imgUser"
                    src={post.user?.image}
                    alt={post?.user.username}
                  />
                )}
                <div className="info">
                  <span className="name"> {post.user?.username}</span>
                  <p className="p">
                    {post.date &&
                      formatDistanceToNow(parseISO(post.date), {
                        addSuffix: true,
                        locale: es,
                      })}
                  </p>
                </div>

                {currentUser?.admin === true && (
                  <div className="edit">
                    <Link className="link" to={`/write?edit=2`} state={post}>
                      <div className="editar">
                        <FontAwesomeIcon
                          className="fonticon"
                          icon={faPenToSquare}
                        />
                      </div>
                    </Link>
                    <div onClick={handleDelete} className="delete">
                      <FontAwesomeIcon className="fonticon" icon={faTrash} />
                    </div>
                  </div>
                )}
              </div>

              <div className="social-icon">
                <div className="icons">
                  <ul>
                    <li>
                      <Likes postid={postid} currentUser={currentUser} />
                    </li>
                    <li onClick={toggleCommentField}>
                      <a>
                        <FontAwesomeIcon
                          className={!showCommentField ? "icon-chat" : "chat"}
                          icon={faComment}
                        />
                      </a>
                    </li>
                    <li>
                      <Share post={post} />
                    </li>
                  </ul>
                </div>
              </div>

              <div className="icon">
                <ul>
                  {post.links?.spotify?.length > 0 && (
                    <li>
                      <a href={post.links?.spotify} target="blanket">
                        <i className="icon">
                          <FontAwesomeIcon icon={faSpotify} />
                        </i>
                      </a>
                    </li>
                  )}

                  {post.links?.youtobe?.length > 0 && (
                    <li>
                      <a href={post.links?.youtobe} target="blanket">
                        <i className="icon">
                          <FontAwesomeIcon icon={faYoutube} />
                        </i>
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <Comment
            setShowCommentField={setShowCommentField}
            showCommentField={showCommentField}
          />
        </div>
        <div className="menu">
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default Single;
