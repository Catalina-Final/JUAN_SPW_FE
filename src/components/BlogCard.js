import React from "react";
import { Card } from "react-bootstrap";
import Moment from "react-moment";
import "../App.css";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BlogCard = ({ blog, handleClick }) => {
  return (
    <Card className="CardStyles" onClick={() => handleClick(blog._id)}>
      <Card.Img
        variant="top"
        src={
          blog?.images?.length
            ? blog.images[0]
            : "https://via.placeholder.com/160x100"
        }
      />{" "}
      <Card.Body>
        <Card.Title>
          {blog.title.length <= 50
            ? blog.title
            : blog.title.slice(0, 30) + "..."}
        </Card.Title>
        <Card.Text className="text-justify">
          {blog.content.length <= 99
            ? blog.content
            : blog.content.slice(0, 150) + "..."}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">
          <span className="text-muted">
            @{blog?.author?.name} wrote{" "}
            <Moment fromNow>{blog.createdAt}</Moment>
          </span>
        </small>
      </Card.Footer>
      <FontAwesomeIcon
        className="reactionsIcons"
        icon={faCommentAlt}
        size="sm"
      />
      <div>{blog.reviewCount}</div>
    </Card>
  );
};

export default BlogCard;
