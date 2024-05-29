import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import Comment from "../components/Comments/Comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faTrash,
  faPaintbrush,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import moment from "moment-timezone";
import Share from "../components/Share";
import "./Single.scss";
import Loading from "../components/Loading";
const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const Single = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const postid = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);
  const [showCommentField, setShowCommentField] = useState(null);
  const [heart, setHeart] = useState(null);
  const hearts = 1;
  const [countHearts, setCountHearts] = useState();
  const [heartID, setHeartId] = useState("");
  const [isProcessingHeart, setIsProcessingHeart] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoadidng, setIsLoading] = useState(true);

  // scroll del navbar\\
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
        // Verificar si el usuario actual ya dio like al post
        const userLiked = res.data.hearts.some(
          (heart) => heart.userHearts.id === currentUser?.id
        );
        setHeart(userLiked);

        // Establecer el ID del corazón (si existe)
        if (userLiked) {
          setHeartId(
            res.data.hearts.find(
              (heart) => heart.userHearts.id === currentUser?.id
            )?.id
          );
        }
        setCountHearts(res.data.hearts?.length);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Error al obtener el post:", error);
      }
    };
    fetchData();
  }, [postid, currentUser]);

  //! delete post
  const handleDelete = async () => {
    try {
      await axios.delete(`${URL}/api/posts/${postid}`, {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {}
  };

  //! like Heart\\

  const handleHeart = async () => {
    try {
      setIsProcessingHeart(true);
      // Si heart es true, realiza la lógica de unlike (axios delete)
      if (heart) {
        // Hacer el axios.delete
        await axios.delete(`${URL}/api/posts/${postid}/${hearts}/${heartID}`, {
          withCredentials: true,
        });
        // Actualizar el estado local solo después de que el delete sea exitoso
        setCountHearts((prevCount) => prevCount - 1);
        setHeart(false);
      } else {
        // Si heart es false, realiza la lógica de like (axios post)
        await axios.post(
          `${URL}/api/posts/${postid}/${hearts}`,
          { heart: hearts, postid },
          { withCredentials: true }
        );
        const res = await axios.get(`${URL}/api/posts/${postid}`);
        setHeartId(
          res.data.hearts.find(
            (heart) => heart.userHearts.id === currentUser?.id
          )?.id
        );
        // Actualizar el estado local solo después de que el post sea exitoso
        setCountHearts((prevCount) => prevCount + 1);
        setHeart(true);
      }
    } catch (error) {
      console.error("Error al manejar el like/unlike:", error);
    } finally {
      setIsProcessingHeart(false);
    }
  };

  //! Comentarios\\
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
    <div>
      {isLoadidng && (
        <div className="loading">
          <Loading />
        </div>
      )}
      <img
        id="postImg"
        className={scrolled ? "scroll" : ""}
        src={`${URL}/upload/${post?.img}` || `../public/upload/${post?.img}`}
      />
      <div className="single">
        <div className="content">
          <h1>{post.title}</h1>

          <div className="social-icon">
            <div className="user">
              {post?.user?.image && (
                <img
                  src={ `${URL}/uploadUserImg/${post.user?.image}` || `../public/uploadUserImg/${post.user?.image}`}
                  alt={post?.user.username}
                />
              )}
              <div className="info">
                <span className="span">{post.user?.username}</span>
                <p className="p">
                  {moment(post.date).fromNow("DD-MM-YYYY HH:mm:")}
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

            <div className="icon">
              {post.links?.spotify?.length !== 0 &&
              post.links?.youtobe?.length !== 0 ? (
                <p>Escucha el Capitulo por</p>
              ) : null}
              <ul>
                {post.links?.spotify?.length > 0 && (
                  <li>
                    <a href={post.links?.spotify} target="blanket">
                      <i class="fab fa-spotify icon"></i>
                    </a>
                  </li>
                )}

                {post.links?.youtobe?.length > 0 && (
                  <li>
                    <a href={post.links?.youtobe} target="blanket">
                      <i class="fab fa-youtube icon"></i>
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="box-parrafo">
            <p
              id="parafos"
              dangerouslySetInnerHTML={{ __html: getText(post.desc) }}
            ></p>
          </div>

          <div className="box3">
            <div className="icons">
              <ul>
                {countHearts >= 1 && <p className="count">{countHearts}</p>}
                <li onClick={handleHeart}>
                  <a>
                    <FontAwesomeIcon
                      className={!heart ? "icon" : "heart"}
                      icon={faHeart}
                    />
                  </a>
                </li>
                <li onClick={toggleCommentField}>
                  <a>
                    <FontAwesomeIcon
                      className={!showCommentField ? "icon" : "chat"}
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

          <Comment
            setShowCommentField={setShowCommentField}
            showCommentField={showCommentField}
          />
        </div>

        <Menu />
      </div>
    </div>
  );
};

export default Single;
