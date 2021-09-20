import Moment from "react-moment";
import "../blogCard.scss";
import React from "react";
import "../App.css";

const BlogCard = (props) => {
  let { blog, handleClick, blogs } = props;
  const index = blogs.indexOf(blog);

  return (
    <>
      {index % 2 === 0 ? (
        <div className="blog-card">
          <div className="meta">
            <img
              alt="blog"
              className="photo"
              // className="ImageEventSingle"
              variant="top"
              src={
                blog?.images
                  ? blog.images[0]
                  : "https://via.placeholder.com/160x100"
              }
            />
            <ul className="details">
              <li className="author">
                <h4>{blog?.author?.name}</h4>
              </li>
              <li className="date">
                {" "}
                <Moment fromNow>{blog.createdAt}</Moment>
              </li>
              {/* <li className="tags">
              <ul>
                <li>
                  <a href="#">Learn</a>
                </li>
                <li>
                  <a href="#">Code</a>
                </li>
                <li>
                  <a href="#">HTML</a>
                </li>
                <li>
                  <a href="#">CSS</a>
                </li>
              </ul>
            </li> */}
            </ul>
          </div>
          <div className="description">
            <h2>
              {" "}
              {blog.title.length <= 50
                ? blog.title
                : blog.title.slice(0, 30) + "..."}
            </h2>
            <p>
              {blog.content.length <= 99
                ? blog.content
                : blog.content.slice(0, 200) + "..."}
            </p>
            <div onClick={() => handleClick(blog._id)} className="read-more">
              <p>Read More</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="blog-card alt">
          <div className="meta">
            <img
              alt="blog"
              className="photo"
              variant="top"
              src={
                blog?.images
                  ? blog.images[0]
                  : "https://via.placeholder.com/160x100"
              }
            />
            <ul className="details">
              <li className="author">
                <h4>{blog?.author?.name}</h4>
              </li>
              <li className="date">
                <Moment fromNow>{blog.createdAt}</Moment>
              </li>
              {/* <li className="tags">
              <ul>
                <li>
                  <a href="#">Learn</a>
                </li>
                <li>
                  <a href="#">Code</a>
                </li>
                <li>
                  <a href="#">HTML</a>
                </li>
                <li>
                  <a href="#">CSS</a>
                </li>
              </ul>
            </li> */}
            </ul>
          </div>
          <div className="description">
            <h2>
              {" "}
              {blog.title.length <= 50
                ? blog.title
                : blog.title.slice(0, 30) + "..."}
            </h2>
            <p>
              {blog.content.length <= 99
                ? blog.content
                : blog.content.slice(0, 200) + "..."}
            </p>
            <div onClick={() => handleClick(blog._id)} className="read-more">
              <p>Read More</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogCard;
