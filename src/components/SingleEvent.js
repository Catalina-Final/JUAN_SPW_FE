import React from "react";
import { Card } from "react-bootstrap";
import Moment from "react-moment";

const SingleEvent = ({ event, handleClick }) => {
  return (
    <Card onClick={() => handleClick(event._id)}>
      <Card.Img
        variant="top"
        src={
          event?.images?.length
            ? event.images[0]
            : "https://via.placeholder.com/160x100"
        }
      />{" "}
      <Card.Body>
        <Card.Title>
          {event.title.length <= 50
            ? event.title
            : event.title.slice(0, 30) + "..."}
        </Card.Title>
        <Card.Text>
          {event.content.length <= 99
            ? event.content
            : event.content.slice(0, 40) + "..."}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">
          <span className="text-muted">
            @{event?.author?.name} wrote{" "}
            <Moment fromNow>{event.createdAt}</Moment>
            <p>
              {event.reactions.like}
              {event.reactions.sad}
            </p>
          </span>
        </small>
      </Card.Footer>
    </Card>
  );
};

export default SingleEvent;
