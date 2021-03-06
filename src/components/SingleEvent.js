import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import Moment from "react-moment";

const SingleEvent = ({ event, handleClick }) => {
  return (
    <Card
      className="text-center  SingleEvent "
      onClick={() => handleClick(event._id)}
    >
      <Row>
        <Col sm={12} lg={6}>
          <Card.Img
            className="ImageEventSingle OnHover"
            variant="top"
            src={
              event?.images?.length
                ? event.images[0]
                : "https://via.placeholder.com/160x100"
            }
          />{" "}
        </Col>

        <Col sm={12} lg={6} className="d-flex align-items-center">
          <Card.Body className="textsingleevent">
            <Card.Title>
              {event.title.length <= 50
                ? event.title
                : event.title.slice(0, 100) + "..."}
            </Card.Title>
            <Card.Text className="text-justify">
              {event.content.length <= 99
                ? event.content
                : event.content.slice(0, 200) + "..."}
            </Card.Text>

            <small className="text-muted">
              <span className="text-muted">By{event?.author?.name} </span>
              <Moment className="textsingleevent" fromNow>
                {event.createdAt}
              </Moment>
            </small>
          </Card.Body>{" "}
        </Col>
      </Row>
    </Card>
  );
};

export default SingleEvent;
