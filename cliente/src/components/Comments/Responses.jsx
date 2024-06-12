import React, { useContext, useState } from "react";
import "./Responses.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8800";

const Responses = ({
  postId,
  selectedCommentId,
  setComments,
  comments,
}) => {
  const [commentText, setCommentText] = useState("");
  const { currentUser } = useContext(AuthContext);

  const submitReplies = async (e) => {
    e.preventDefault();
    try {
      // Enviar el nuevo comentario
      await axios.post(
        `${URL}/api/posts/${postId}/response`,
        { commentid: selectedCommentId, text: commentText },
        { withCredentials: true }
      );

      const res = await axios.get(`${URL}/api/posts/${postId}`);
      setComments(res.data.comments);
      setCommentText("");
    } catch (error) {
      console.log("El comentario no se envió " + error);
    }
  };

  return (
    <div>
      <div>
        <div className="input-replies">
          <textarea className="textarea"
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Escribe tu comentario"
            value={commentText}
          />
          <div className="barra-inferior-replies">
            <button
              onClick={submitReplies}
              disabled={!commentText.trim()}
              className={commentText.trim() ? "button-replies" : "disabled"}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Responses;
