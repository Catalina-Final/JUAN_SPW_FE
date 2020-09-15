import React, { useEffect } from "react";
import { Container, CardColumns, Jumbotron, Button } from "react-bootstrap";
import SingleEvent from "../../components/SingleEvent";
import { useSelector, useDispatch } from "react-redux";
import { eventActions } from "../../redux/actions";
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory, Link } from "react-router-dom";
import ReviewList from "../../components/ReviewList";

const PageEvents = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.event.loading);
  const events = useSelector((state) => state.event.events);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    dispatch(eventActions.eventsRequest());
  }, [dispatch]);

  const handleClickOnEvent = (id) => {
    history.push(`/events/${id}`);
  };

  return (
    <div>
      <Container>
        {" "}
        <h1>Photography Events</h1>
        <Container>
          <Jumbotron className="text-center">
            <h1>Events</h1>
            <p>Start planning your event.</p>
            {isAuthenticated && (
              <Link to="/event/add">
                <Button variant="primary">Write now</Button>
              </Link>
            )}
          </Jumbotron>
          <CardColumns
            style={{ flexWrap: "wrap", flexDirection: "row" }}
            className="d-flex text-center"
          >
            {loading ? (
              <ClipLoader color="#f86c6b" size={150} loading={loading} />
            ) : (
              <>
                {events.length ? (
                  <CardColumns>
                    {events.map((event) => (
                      <SingleEvent
                        event={event}
                        key={event._id}
                        handleClick={handleClickOnEvent}
                      />
                    ))}
                  </CardColumns>
                ) : (
                  <ReviewList />
                )}
              </>
            )}
          </CardColumns>
        </Container>
      </Container>
    </div>
  );
};

export default PageEvents;
