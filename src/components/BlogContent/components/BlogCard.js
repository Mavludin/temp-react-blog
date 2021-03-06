import "./BlogCard.css";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { postsAPI } from "../../../shared/projectData";
import axios from "axios";

export const BlogCard = () => {

  const params = useParams();

  const [blogPost, setBlogPost] = useState({});

  useEffect(() => {
    axios
      .get(`${postsAPI}${params.postId}`)
      .then((response) => {
        setBlogPost(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.postId]);

  const heartFill = blogPost.liked ? "crimson" : "black";

  return (
    <div className="post">
      <div className="postContent">
        <h2>{blogPost.title}</h2>
        <p>{blogPost.description}</p>
        <div>
          <button>
            <FavoriteIcon style={{ fill: heartFill }} />
          </button>
        </div>
      </div>
      <div className="postControl">
        <button className="editBtn">
          <EditIcon />
        </button>
        <button className="deleteBtn">
          <DeleteForeverIcon />
        </button>
      </div>
    </div>
  );
};
