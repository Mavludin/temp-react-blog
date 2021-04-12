import axios from "axios";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { postsAPI } from "../../shared/projectData";
import "./BlogContent.css";
import { AddPostForm } from "./components/AddPostForm";
import { EditPostForm } from "./components/EditPostForm";

import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { fetchData } from "../../shared/projectLogic";

export class BlogContent extends Component {
  state = {
    showAddForm: false,
    showEditForm: false,
    selectedPost: {},
    blogArr: [],
    isPending: false,
  };

  fetchPosts = () => {
    fetchData(postsAPI).then(data => {
      console.log(data)
      this.setState({
        blogArr: data,
        isPending: false,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  };

  componentDidMount() {
    this.fetchPosts();
  }

  likePost = (blogPost) => {
    const temp = { ...blogPost };
    temp.liked = !temp.liked;

    axios
      .put(`${postsAPI}${blogPost.id}`,temp)
      .then((response) => {
        console.log("Пост изменен => ", response.data);
        this.fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deletePost = (blogPost) => {
    if (window.confirm(`Удалить ${blogPost.title}?`)) {
      this.setState({
        isPending: true,
      });
      axios
        .delete(
          `${postsAPI}${blogPost.id}`
        )
        .then((response) => {
          console.log("Пост удален => ", response.data);
          this.fetchPosts();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  addNewBlogPost = (blogPost) => {
    this.setState({
      isPending: true,
    });
    axios
      .post(postsAPI, blogPost)
      .then((response) => {
        console.log("Пост создан =>", response.data);
        this.fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };


  editBlogPost = (updatedBlogPost) => {
    this.setState({
      isPending: true,
    });
    axios.put(`${postsAPI}${updatedBlogPost.id}`, updatedBlogPost)
    .then((response) => {
      console.log("Пост отредактирован =>", response.data);
      this.fetchPosts();
    })
    .catch((err) => {
      console.log(err);
    });

  }

  handleAddFormShow = () => {
    this.setState({
      showAddForm: true,
    });
  };

  handleAddFormHide = () => {
    this.setState({
      showAddForm: false,
    });
  };

  handleEditFormShow = (post) => {
    console.log(post)
    this.setState({
      showEditForm: true,
      selectedPost: post,
    });
  };

  handleEditFormHide = () => {
    this.setState({
      showEditForm: false,
    });
  };

  render() {
    const blogPosts = this.state.blogArr.map((item, pos) => {
      const heartFill = item.liked ? "crimson" : "black";
      return (
        <div className="post" key={item.id}>
          <div className="postContent">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <div>
              <button onClick={()=>this.likePost(item)}>
                <FavoriteIcon style={{ fill: heartFill }} />
              </button>
            </div>
          </div>
          <div className="postControl">
            <button className="editBtn" onClick={()=>this.handleEditFormShow(item)}>
              <EditIcon />
            </button>
            <button className="deleteBtn" onClick={()=>this.deletePost(item)}>
              <DeleteForeverIcon />
            </button>
          </div>
          <div>
            <NavLink exact to={`blog/${item.id}`}>Gooo</NavLink>
          </div>
        </div>
      );
    });

    if (this.state.blogArr.length === 0) return <h1>Загружаю данные...</h1>;
    return (
      <div className="blogPage">
        {this.state.showAddForm && (
          <AddPostForm
            blogArr={this.state.blogArr}
            addNewBlogPost={this.addNewBlogPost}
            handleAddFormHide={this.handleAddFormHide}
          />
        )}

        {this.state.showEditForm && (
          <EditPostForm
            handleEditFormHide={this.handleEditFormHide}
            selectedPost={this.state.selectedPost}
            editBlogPost={this.editBlogPost}
          />
        )}

        <>
          <h1>Блог</h1>
          <div className="addNewPost">
            <button className="blackBtn" onClick={this.handleAddFormShow}>
              Создать новый пост
            </button>
          </div>
          <div className="posts">{blogPosts}</div>
        </>
      </div>
    );
  }
}
