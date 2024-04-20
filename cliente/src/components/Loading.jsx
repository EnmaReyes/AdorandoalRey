import React, { useEffect, useState } from 'react';
import "./Loading.scss"

const Loading = () => {
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowLoader(true);
      },);
  
      return () => clearTimeout(timer);
    }, []);
  
  return (
    <div>{showLoader? <div className ="custom-loader"></div>: <div></div> }</div>
  )
}

export default Loading