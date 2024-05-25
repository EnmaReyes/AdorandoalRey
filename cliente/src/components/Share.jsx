import { faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import "./Share.scss" 
const URL = import.meta.env.VITE_BACKEND_URL;

const Share = ({ post }) => {
  const location = useLocation();
  const url = `https://www.youtube.com/watch?v=OPRJ7pRiV1E`;
  const [share, setShare] = useState(false)
 
  return (
    <div className="custom-select-share">
      <button class="dropselector-share"
       onClick={()=>{setShare(!share)}} >
      <FontAwesomeIcon
      className={!share ? "icon" : "share"}
      icon={faShare} />
      </button>
      {share && 
          <ul class="dropdown-menu-share">
          <li class="dropdown-item1">
            <FacebookShareButton
              url={URL}
              quote={post?.title}
              hashtag={`#Adorando al Rey`}
            >
              <FacebookIcon className="iconShare"/>
            </FacebookShareButton>
          </li>
  
          <li class="dropdown-item2">
            <TwitterShareButton
              url={URL}
              quote={post?.title}
              hashtag={`#Adorando al Rey`}
            >
              <TwitterIcon className="iconShare"/>
            </TwitterShareButton>
          </li>
  
          <li class="dropdown-item3">
            <WhatsappShareButton
              url={URL}
              quote={post?.title}
              hashtag={`#Adorando al Rey`}
            >
          <WhatsappIcon className="iconShare"/>
            </WhatsappShareButton>
          </li>
  
          <li class="dropdown-item4">
            <EmailShareButton
              url={URL}
              quote={post?.title}
              hashtag={`#Adorando al Rey`}
            >
              <EmailIcon className="iconShare"/>
            </EmailShareButton>
          </li>
  
          <li class="dropdown-item5">
            <TelegramShareButton
              url={URL}
              quote={post?.title}
              hashtag={`#Adorando al Rey`}
            >
              <TelegramIcon className="iconShare"/>
            </TelegramShareButton>
          </li>
          <li class="dropdown-item6">
            <LinkedinShareButton
              url={URL}
              quote={post?.title}
              hashtag={`#Adorando al Rey`}
            >
              <LinkedinIcon className="iconShare"/>
            </LinkedinShareButton>
          </li>
        </ul>}
  
    </div>
  );
};

export default Share;
