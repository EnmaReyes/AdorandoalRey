import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./Likes.scss"
import { API_URL } from "../../config";


const URL = API_URL;
const Likes = ({ postid, currentUser }) => {
  const [heart, setHeart] = useState(false);
  const [countHearts, setCountHearts] = useState(0);
  const [heartID, setHeartId] = useState(null);
  const [isProcessingHeart, setIsProcessingHeart] = useState(false);
  const hearts = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${URL}/api/posts/${postid}`);
        const userLiked = res.data.hearts.some(
          (heart) => heart.userHearts.id === currentUser?.id
        );
        setHeart(userLiked);

        if (userLiked) {
          setHeartId(
            res.data.hearts.find(
              (heart) => heart.userHearts.id === currentUser?.id
            )?.id
          );
        }
        setCountHearts(res.data.hearts?.length);
      } catch (error) {
        console.error("Error al obtener el post:", error);
      }
    };
    fetchData();
  }, [postid, currentUser]);

  const handleHeart = async () => {
    if (isProcessingHeart) return;

    try {
      setIsProcessingHeart(true);
      if (heart) {
        await axios.delete(`${URL}/api/posts/${postid}/${hearts}/${heartID}`, {
          withCredentials: true,
        });
        setHeart(false);
        setHeartId(null);
        setCountHearts((prevCount) => prevCount - 1);
      }
      if (!heart) {
        const response = await axios.post(
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
        setHeart(true);
        setCountHearts((prevCount) => prevCount + 1);
      }
    } catch (error) {
      console.error("Error al manejar el like/unlike:", error);
      if (error.response) {
        console.error("Respuesta del servidor:", error.response.data);
      }
    } finally {
      setIsProcessingHeart(false);
    }
  };
  console.log();
  return (
    <div>
      <div  className="likes">
        <p className="counter"> {countHearts >= 1 && <p className="count">{countHearts}</p>}</p>
        <a onClick={currentUser && handleHeart}>
          <FontAwesomeIcon
            className={!heart ? "icon-chat" : "heart"}
            icon={faHeart}
          />
        </a>
      </div>
    </div>
  );
};

export default Likes;
