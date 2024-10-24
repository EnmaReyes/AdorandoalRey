import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faReply,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { parseISO, formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import Responses from "./Responses";
import "./Comment.scss";
import { toast } from "react-toastify";
import { toastComments } from "../toastConfig/toastconfigs";
import {API_URL} from "../config.js";

const URL = API_URL;

const Comment = ({ setShowCommentField, showCommentField }) => {
  const [comments, setComments] = useState([]);
  const { currentUser, login } = useContext(AuthContext);
  const [commentText, setCommentText] = useState("");
  const location = useLocation();
  const [openViewRes, setOpenViewRes] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState();
  const [repliesData, setRepliesData] = useState();
  const postId = location.pathname.split("/")[2];

  //! post comments \\
  const submitComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${URL}/api/posts/${postId}`,
        { postId, text: commentText },
        { withCredentials: true }
      );
      toast.success(
        "Enviado Correctamente",
        toastComments // estilo del toast
      );
      const res = await axios.get(`${URL}/api/posts/${postId}`);
      setComments(res.data.comments);
      setCommentText("");
    } catch (error) {
      toast.error(`Ocurrrio un error ${error.message}`, toastComments);
      console.log("El comentario no se envió " + error);
    }
  };

  //! get comments \\
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${URL}/api/posts/${postId}`);
        setComments(res.data.comments);
        setRepliesData(res.data.comments.map((r) => r.replies));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [location, postId]);

  //! delete comments\\
  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`${URL}/api/posts/${postId}/${commentId}`, {
        withCredentials: true,
      });
      toast.success(
        "Eliminado con Exito",
        toastComments // estilo del toast
      );
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      toast.error(`Ocurrrio un error ${error.message}`, toastComments);
      console.log(error);
    }
  };

  //! delete repley\\
  const handleRepleyDelete = async (replyID) => {
    try {
      await axios.delete(`${URL}/api/posts/${postId}/response/${replyID}`, {
        withCredentials: true,
      });
      toast.success(
        "Eliminado con Exito",
        toastComments // estilo del toast
      );
      setComments((prevComments) => {
        return prevComments.map((comment) => {
          if (comment.replies && comment.replies.length > 0) {
            return {
              ...comment,
              replies: comment.replies.filter((reply) => reply.id !== replyID),
            };
          } else {
            return comment;
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenRes = (commentId) => {
    setOpenViewRes(commentId === selectedCommentId ? !openViewRes : true);
    setSelectedCommentId(commentId);
  };

  return (
    <div>
      {showCommentField && (
        <div className="commentContainer">
          {comments.map((comment) => (
            <div>
              <div key={comment?.id} className="commentsbox">
                <div className="user">
                  {comment.commenter?.image ? (
                    <img
                      src={comment?.commenter?.image}
                      alt={comment?.commenter.username}
                    />
                  ) : (
                    <FontAwesomeIcon className="icon" icon={faUser} />
                  )}
                </div>
                <div className="box">
                  <div className="data-box">
                    <p className="name">{comment.commenter?.username}</p>
                    <p className="estado">
                      {formatDistanceToNow(parseISO(comment.updatedAt), {
                        addSuffix: true,
                        locale: es,
                      })}
                    </p>
                  </div>
                  <div className="comments">
                    <p>{comment.comments}</p>
                    <div className="editIcon">
                      <span
                        className="responder"
                        onClick={() => handleOpenRes(comment.id)}
                      >
                        Responder
                        <FontAwesomeIcon
                          className="faReply"
                          icon={faReply}
                          flip="horizontal"
                        />
                      </span>
                      {currentUser?.admin === true ||
                      currentUser?.username === comment.commenter?.username ? (
                        <p onClick={() => handleDelete(comment.id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              {
                //! Respuestas de Comentarios
              }
              {openViewRes &&
                comment.id === selectedCommentId &&
                comment.replies.map((reply) => (
                  <div>
                    <div className="replies">
                      <div className="user-replies">
                        {reply.userComments?.image ? (
                          <img
                            src={reply.userComments?.image}
                            alt={reply.userComments?.username}
                          />
                        ) : (
                          <FontAwesomeIcon
                            className="icon-replies"
                            icon={faUser}
                          />
                        )}
                      </div>
                      <div className="box-replies">
                        <div className="name-replies">
                          <p>{reply.userComments?.username}</p>
                          <p>
                            {reply.updatedAt &&
                              formatDistanceToNow(parseISO(reply.updatedAt), {
                                addSuffix: true,
                                locale: es,
                              })}
                          </p>
                        </div>
                        <div className="comments-replies">
                          <p>{reply?.comments}</p>
                          {currentUser?.admin === true ||
                          currentUser?.username ===
                            reply.userComments?.username ? (
                            <div className="editIcon-replies">
                              <p onClick={() => handleRepleyDelete(reply.id)}>
                                <FontAwesomeIcon icon={faTrash} />
                              </p>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              {openViewRes && comment.id === selectedCommentId && (
                <div className="resposes">
                  <Responses
                    postId={postId}
                    selectedCommentId={selectedCommentId}
                    setComments={setComments}
                    comments={comments}
                  />
                </div>
              )}
            </div>
          ))}

          {currentUser ? (
            <div className="input">
              <textarea
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Escribir..."
                value={commentText}
              />
              <div className="barra-inferior">
                <button
                  onClick={submitComment}
                  disabled={!commentText.trim()}
                  className={commentText.trim() ? "button" : "disabled"}
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </div>
            </div>
          ) : (
            <div className="login">
              <span>Para comentar debes</span>
              <Link to="/login" className="link" onClick={login}>
                <b>Iniciar sesión</b>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Comment;
