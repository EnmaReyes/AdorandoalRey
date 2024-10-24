import React, { useContext, useState } from "react";
import "./Responses.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { toastComments } from "../toastConfig/toastconfigs";
import { toast } from "react-toastify";
import { API_URL } from "../../config";


const URL = API_URL;

const Responses = ({ postId, selectedCommentId, setComments, comments }) => {
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
      toast.success(
        "Enviado Correctamente",
        toastComments // estilo del toast
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
          <textarea
            className="textarea"
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Escribir..."
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
