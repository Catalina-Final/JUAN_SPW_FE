import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import PaginationItem from "../components/PaginationItem";
import { Button, Container, Row } from "react-bootstrap";
import { eventActions } from "../redux/actions";
import ClipLoader from "react-spinners/ClipLoader";
import SingleEvent from "../components/SingleEvent";
import "../App.css";
// import moment from "moment";

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
    dispatch(eventActions.getEventsByUser(currentUser?.id, pageNum));
    // eslint-disable-next-line
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
                    <SingleEvent
                      event={event}
                      key={event._id}
                      handleClick={handleClickOnEvent}
                    />
                  ))}
                </div>
              ) : (
                <div>
                  <p>There are no events </p>
                  <Link to="/event/add">
                    <Button variant="dark">Start sharing your stories</Button>
                  </Link>
                </div>
              )}
            </>
          )}
        </Row>
      </Container>
      <div className="textEventTitle">
        <PaginationItem
          style={{ marginTop: "20px" }}
          pageNum={pageNum}
          setPageNum={setPageNum}
          totalPageNum={totalPageNum}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default EventsAdmin;
