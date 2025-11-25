import React from "react";
import "./Burguer.scss";

const Burguer = ({ handleClick, clicked }) => {
  return (
    <div
      onClick={handleClick}
      className={`burger-premium ${clicked ? "open" : ""}`}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default Burguer;
