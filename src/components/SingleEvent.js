import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import Moment from "react-moment";

const SingleEvent = ({ event, handleClick }) => {
  return (
    <Card
      className="text-center d-flex SingleEvent"
      onClick={() => handleClick(event._id)}
    >
      <Row>
        <Col sm={12} lg={6}>
          <Card.Img
            className="ImageEventSingle"
            variant="top"
            src={
              event?.images?.length
                ? event.images[0]
                : "https://via.placeholder.com/160x100"
            }
          />{" "}
        </Col>
        <Col sm={12} lg={6}>
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
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">
              <span className="text-muted">
                @{event?.author?.name} wrote{" "}
                <Moment fromNow>{event.createdAt}</Moment>
                <p>
                  {/* {event.reactions.like}
              {event.reactions.sad} */}
                </p>
              </span>
            </small>
          </Card.Footer>
        </Col>
      </Row>
    </Card>
  );
};

export default SingleEvent;
