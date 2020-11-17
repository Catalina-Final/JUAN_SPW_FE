import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import Moment from "react-moment";

const singleBlogAdmin = ({ blog, handleClick }) => {
  console.log("BBBLOOOOOGGGG", blog);
  return (
    <Card
      className="text-center  SingleEvent "
      onClick={() => handleClick(blog._id)}
    >
      <Row>
        <Col sm={12} lg={6}>
          <Card.Img
            className="ImageblogSingle OnHover"
            variant="top"
            src={
              blog?.images?.length
                ? blog.images[0]
                : "https://via.placeholder.com/160x100"
            }
          />{" "}
        </Col>

        <Col sm={12} lg={6} className="d-flex align-items-center">
          <Card.Body className="textsingleevent">
            <Card.Title>
              {blog.title.length <= 50
                ? blog.title
                : blog.title.slice(0, 100) + "..."}
            </Card.Title>
            <Card.Text className="text-justify">
              {blog.content.length <= 99
                ? blog.content
                : blog.content.slice(0, 200) + "..."}
            </Card.Text>

            <small className="text-muted">
              <span className="text-muted">By {blog?.author?.name} </span>
              <Moment className="textsingleblog" fromNow>
                {blog.createdAt}
              </Moment>
            </small>
          </Card.Body>{" "}
        </Col>
      </Row>
    </Card>
  );
};

export default singleBlogAdmin;
