import React, { Children, useEffect, useState } from "react";
import { Container, Button, Row } from "react-bootstrap";
import SingleEvent from "../../components/SingleEvent";
import { useSelector, useDispatch } from "react-redux";
import { eventActions } from "../../redux/actions";
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory, Link } from "react-router-dom";
import PaginationItem from "../../components/PaginationItem";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const PageEvents = () => {
  const [pageNum, setPageNum] = useState(1);
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.event.loading);
  const totalPageNum = useSelector((state) => state.event.totalPageNum);
  const CURRENT_DATE = moment().toDate();
  const localizer = momentLocalizer(moment);
  const events = useSelector((state) => state.event.events);
  const eventDates = useSelector((state) => state.event.eventDates);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const handleClickOnEvent = (id) => {
    history.push(`/events/${id}`);
  };
  window.yyy = events;

  const ColoredDateCellWrapper = ({ children, value }) =>
    React.cloneElement(Children.only(children), {
      style: {
        ...children.style,
        backgroundColor: value < CURRENT_DATE ? "lightgray" : "white",
      },
    });

  useEffect(() => {
    dispatch(eventActions.eventsRequest(pageNum));
  }, [dispatch, pageNum]);

  return (
    <div>
      {" "}
      <Container>
        <div className="text-center">
          <h1>Events</h1>
          <p>Start planning your event.</p>
          {isAuthenticated && (
            <Link to="/event/add">
              <Button variant="primary">Write now</Button>
            </Link>
          )}
        </div>

        <>
          {events.length ? (
            <div>
              <Calendar
                className="calendar"
                localizer={localizer}
                events={eventDates.map((e) => ({
                  ...e,
                  start: new Date(e.start),
                  end: new Date(e.end),
                }))}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={(event) => handleClickOnEvent(event._id)}
                components={{
                  dateCellWrapper: ColoredDateCellWrapper,
                }}
                style={{ height: 500 }}
              />
              <PaginationItem
                pageNum={pageNum}
                setPageNum={setPageNum}
                totalPageNum={totalPageNum}
                loading={loading}
              />
            </div>
          ) : (
            <p>There are no events</p>
          )}
        </>
        <Row
          style={{
            flexWrap: "wrap",
            flexDirection: "column",
          }}
          className="text-center"
        >
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
                <p>There are no events </p>
              )}
            </>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default PageEvents;
