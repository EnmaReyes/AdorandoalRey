import React, { useContext, useEffect, useRef} from "react";
import "./SearchResults.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const SearchResults = ({ searchResult }) => {
  const { showUserEdit, setShowUserEdit } = useContext(AuthContext);
  const inputRef = useRef(null);

useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && inputRef.current.contains(event.target)) {
        // Click occurred inside the input, do not change setShowUserEdit
        return;
      }
      setShowUserEdit(false);
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div id={!showUserEdit && "hidden"} className="results-list">
      {searchResult.length > 0 &&
        searchResult.map((result) => (
          <Link className="link" to={`/post/${result.id}`}>
            <div className="search-result" key={result.id}>
              {result.title}
            </div>
          </Link>
        ))}
    </div>
  );
};

export default SearchResults;
