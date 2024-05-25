import React, { useContext, useEffect, useState } from "react";
import "./Comment.scss";
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
import moment from "moment-timezone";
import Responses from "./Responses";
const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8800";


const Comment = ({ setShowCommentField, showCommentField }) => {
  const [comments, setComments] = useState([]);
  const { currentUser, login } = useContext(AuthContext);
  const state = useLocation().state;
  const [commentText, setCommentText] = useState("");
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const [openViewRes, setOpenViewRes] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState();
  const [repliesData, setRepliesData] = useState();

  //! post comments \\
  const submitComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${URL}/api/posts/${postId}`,
        { postId, text: commentText },
        { withCredentials: true }
      );
      const res = await axios.get(`${URL}/api/posts/${postId}`);
      setComments(res.data.comments);
      setCommentText("");
    } catch (error) {
      console.log("El comentario no se envió " + error);
    }
  };

  //! get comments \\
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${URL}/api/posts/${postId}`
        );
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
      await axios.delete(
        `${URL}/api/posts/${postId}/${commentId}`,
        { withCredentials: true }
      );
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  //! delete repley\\

  const handleRepleyDelete = async (replyID) => {
    try {
      await axios.delete(
        `${URL}/api/posts/${postId}/response/${replyID}`,
        { withCredentials: true }
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
                      src={`../public/uploadUserImg/${comment?.commenter?.image}`}
                      alt={comment?.commenter.username}
                    />
                  ) : (
                    <FontAwesomeIcon className="icon" icon={faUser} />
                  )}
                </div>
                <div className="box">
                  <div className="name">
                    <p>{comment.commenter?.username}</p>
                    <p>
                      {"Send " +
                        moment(comment.updatedAt).fromNow("HH:mm: DD-MM-YYYY") +
                        " ago..."}
                    </p>
                  </div>
                  <div className="comments">
                    <p>{comment.comments}</p>
                      <div className="editIcon">
                        <span className="responder" onClick={() => handleOpenRes(comment.id)}>
                          Responder
                          <FontAwesomeIcon className="faReply" icon={faReply} flip="horizontal" />
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
                            src={`../public/uploadUserImg/${reply.userComments?.image}`}
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
                            {"Send " +
                              moment(reply?.updatedAt).fromNow(
                                "HH:mm: DD-MM-YYYY"
                              ) +
                              " ago..."}
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
                placeholder="Escribe tu comentario"
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
              <span>Para comentar debe </span>
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
