import React from "react";
import { Card } from "react-bootstrap";
import Moment from "react-moment";

const BlogCard = ({ blog, handleClick }) => {
  return (
    <Card md={6} onClick={() => handleClick(blog._id)}>
      <Card.Img variant="top" src="https://via.placeholder.com/160x100" />
      <Card.Body>
        <Card.Title>
          {blog.title.length <= 50
            ? blog.title
            : blog.title.slice(0, 30) + "..."}
        </Card.Title>
        <Card.Text>
          {blog.content.length <= 99
            ? blog.content
            : blog.content.slice(0, 40) + "..."}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">
          <span className="text-muted">
            @{blog?.author?.name} wrote{" "}
            <Moment fromNow>{blog.createdAt}</Moment>
            <p>
              {blog.reactions.like}
              {blog.reactions.sad}
            </p>
          </span>
        </small>
      </Card.Footer>
    </Card>
  );
};

export default BlogCard;
