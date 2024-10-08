import React, { useEffect, useState } from "react";
import "./Loading.scss";

const Loading = () => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(true);
    });

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="loader-conteiner">
      {showLoader ? (
        <div class="bookshelf_wrapper">
          <ul class="books_list">
            <li class="book_item first"></li>
            <li class="book_item second"></li>
            <li class="book_item third"></li>
            <li class="book_item fourth"></li>
            <li class="book_item fifth"></li>
            <li class="book_item sixth"></li>
          </ul>
          <div class="shelf"></div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Loading;
