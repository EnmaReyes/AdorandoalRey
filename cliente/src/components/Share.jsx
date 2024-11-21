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
import "./Share.scss";
import { FRONT_URL } from "../config";


const URL = FRONT_URL;

const Share = ({ post }) => {
  const location = useLocation();
  const url = `${URL}${location.pathname}`;
  const [share, setShare] = useState(false);

  const sharePlatforms = [
    { component: FacebookShareButton, icon: FacebookIcon, name: "Facebook" },
    { component: TwitterShareButton, icon: TwitterIcon, name: "Twitter" },
    { component: WhatsappShareButton, icon: WhatsappIcon, name: "Whatsapp" },
    { component: EmailShareButton, icon: EmailIcon, name: "Email" },
    { component: TelegramShareButton, icon: TelegramIcon, name: "Telegram" },
    { component: LinkedinShareButton, icon: LinkedinIcon, name: "Linkedin" },
  ];

  return (
    <div className="custom-select-share">
      <button className="dropselector-share" onClick={() => setShare(!share)}>
        <FontAwesomeIcon className={!share ? "icon" : "share"} icon={faShare} />
      </button>
      {share && (
        <ul className="dropdown-menu-share">
          {sharePlatforms.map(
            ({ component: ShareButton, icon: ShareIcon, name }, index) => (
              <li key={index} className={`dropdown-item${index + 1}`}>
                <ShareButton
                  url={url}
                  quote={post?.title}
                  hashtag="#AdorandoAlRey"
                >
                  <ShareIcon className="iconShare" />
                </ShareButton>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default Share;
