import React from "react";
import { Card } from "react-bootstrap";
import Moment from "react-moment";

const BlogCard = ({ blog, handleClick }) => {
  return (
    <Card onClick={() => handleClick(blog._id)}>
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
              {/* {blog.reactions.like}
              {blog.reactions.sad} */}
              {blog.reviewCount}
            </p>
          </span>
        </small>
      </Card.Footer>
    </Card>
  );
};

export default BlogCard;
