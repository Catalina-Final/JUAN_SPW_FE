import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PaginationItem from "../components/PaginationItem";
import { Col, Container, Row } from "react-bootstrap";
import { eventActions } from "../redux/actions";
import ClipLoader from "react-spinners/ClipLoader";
// import SingleEvent from "../components/SingleEvent";
import "../App.css";

// import moment from "moment";

import "../App.css";

const EventsAdmin = () => {
  const [pageNum, setPageNum] = useState(1);
  const totalPageNum = useSelector((state) => state.event.totalPageNum);
  const events = useSelector((state) => state.event.events);
  const loading = useSelector((state) => state.event.loading);
  const currentUser = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleClickOnEvent = (id) => {
    history.push(`/events/${id}`);
  };

  useEffect(() => {
    dispatch(eventActions.getEventsByUser(currentUser.id, pageNum));
  }, [dispatch, pageNum]);

  return (
    <div>
      <Container>
        <h2>Events Hosting</h2>
        <Row>
          {loading ? (
            <ClipLoader color="#f86c6b" size={150} loading={loading} />
          ) : (
            <>
              {events.length ? (
                <div>
                  {events.map((event) => (
                    // <SingleEvent
                    //   event={event}
                    //   key={event._id}
                    //   handleClick={handleClickOnEvent}
                    // />

                    <Col
                      className="ImageEventsAdmin OnHover"
                      md={6}
                      style={{
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundImage: `url(${event.images[0]})`,
                      }}
                    >
                      <h4>
                        {event.title.length <= 50
                          ? event.title
                          : event.title.slice(0, 30) + "..."}
                      </h4>
                      <p>
                        {event.content.length <= 100
                          ? event.content
                          : event.content.slice(0, 80) + "..."}
                      </p>
                    </Col>
                  ))}
                </div>
              ) : (
                <p>There are no events </p>
              )}
            </>
          )}
        </Row>
      </Container>
      <PaginationItem
        style={{ marginTop: "20px" }}
        pageNum={pageNum}
        setPageNum={setPageNum}
        totalPageNum={totalPageNum}
        loading={loading}
      />
    </div>
  );
};

export default EventsAdmin;
