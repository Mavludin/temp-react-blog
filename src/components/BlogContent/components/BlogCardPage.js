import "./BlogCard.css";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { postsAPI } from "../../../shared/projectData";

export const BlogCardPage = ({
  title,
  description,
  liked,
  likePost,
  deletePost,
  handleEditFormShow
}) => {
  const heartFill = liked ? "crimson" : "black";

  const params = useParams();

  const [blogPost, setBlogPost] = useState({})

  useEffect(() => {
    axios.get(`${postsAPI}${params.postId}`)
      .then((response) => {
        setBlogPost(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [params.postId])

  return (
    <div className="post">
      <div className="postContent">
        <h2>{blogPost.title}</h2>
        <p>{blogPost.description}</p>
        <div>
          <button onClick={likePost}>
            <FavoriteIcon style={{ fill: heartFill }} />
          </button>
        </div>
      </div>
      <div className="postControl">
        <button className="editBtn" onClick={handleEditFormShow}>
          <EditIcon />
        </button>
        <button className="deleteBtn" onClick={deletePost}>
          <DeleteForeverIcon />
        </button>
      </div>
    </div>
  );
};
