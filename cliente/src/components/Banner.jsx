import React, { useEffect, useState } from "react";
import "./Banner.scss"


const Banner = () => {

 
  const toRotate = [
      "Volveos a mi reprensión; he aquí, yo derramaré mi espíritu sobre vosotros y os haré saber mis palabras",
      "El principio de la sabiduría es el temor al Señor",
      "Hijo mío, no te olvides de mis enseñanzas; más bien, guarda en tu corazón mis mandamientos.",
    ];
    const [words, setWords] = useState(toRotate[0])
    useEffect(()=>{
      const interval = setInterval(()=>{
        setWords((prevWord)=>{
          if(prevWord === toRotate[0]){
            return toRotate[1];
          }else if(prevWord === toRotate[1]){
            return toRotate[2]
          }else{
            return toRotate[0];
          }
        });
      }, 4000);
      return ()=> clearInterval(interval)
    },[])
  
    return (
      <div className="banner">
        <span className="wrap">{words}</span>
      </div>
    );
  };
  
  export default Banner;