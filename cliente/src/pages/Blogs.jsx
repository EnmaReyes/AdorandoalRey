import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import Share from '../components/Share';
import "./Blogs.scss"
const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8800";

const Blogs = () => {
    const [posts, setPosts] = useState([]);
    const location = useLocation().search;
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(
            `${URL}/api/posts/${location}`,
            { withCredentials: true }
          );
          setPosts(res.data);
          window.scrollTo(0, 0);
        } catch (error) {}
      };
      fetchData();
    }, [location]);

    const getText = (html) => {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = html;
        const clonedElement = tempElement.cloneNode(true);
     // Obtener el texto y truncarlo a 200 caracteres
     const truncatedText = clonedElement.innerText.slice(0, 500);

     // Devolver el contenido HTML con el texto truncado
     return truncatedText;
      };
    console.log(posts);
  return (
    <div className='blogs'>
        <div className="posts">
        {posts.map((post) =>(
            <div className="post" key={post.id}>
                
                <div className="img">
                <Link className="link" to={`/post/${post.id}`}> 
                <img src={`../public/upload/${post.img}`} alt="img" />
                </Link>
                </div>
                <div className="content">
                <h1>{post.title}</h1>
                <p  dangerouslySetInnerHTML={{ __html: getText(post.desc)}}></p>
                <p className='likes'>
                    {post?.hearts.length + " "}
                    <FontAwesomeIcon className='icon' icon={faHeart}/> 
                </p>
              </div>
              
            </div>
        ))}
        </div>
    </div>
  )
}

export default Blogs