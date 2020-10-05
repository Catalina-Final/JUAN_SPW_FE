import React from "react";
import { Card } from "react-bootstrap";
import Moment from "react-moment";
import "../App.css";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BlogCard = ({ blog, handleClick }) => {
  return (
    <Card className="text-center " onClick={() => handleClick(blog._id)}>
      <div>
        <Card.Img
          // className="ImageEventSingle"
          variant="top"
          src={
            blog?.images?.length
              ? blog.images[0]
              : "https://via.placeholder.com/160x100"
          }
        />
      </div>

      <Card.Body className="textsingleevent">
        <Card.Title>
          {blog.title.length <= 50
            ? blog.title
            : blog.title.slice(0, 30) + "..."}
        </Card.Title>
        <Card.Text className="text-justify text-blog-card">
          {blog.content.length <= 99
            ? blog.content
            : blog.content.slice(0, 70) + "..."}
        </Card.Text>

        <small className="text-muted">
          <span className="text-muted">
            @{blog?.author?.name} wrote <br></br>
            <Moment fromNow>{blog.createdAt}</Moment>
            <div className="justify-content-end">
              <FontAwesomeIcon
                className="reactionsIcons"
                icon={faCommentAlt}
                size="sm"
              />
              {blog.reviewCount}
            </div>
          </span>
        </small>
      </Card.Body>
    </Card>
  );
};

export default BlogCard;
