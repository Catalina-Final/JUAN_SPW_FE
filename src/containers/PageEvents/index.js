import React, { Children, useEffect, useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import SingleEvent from "../../components/SingleEvent";
import { useSelector, useDispatch } from "react-redux";
import { eventActions } from "../../redux/actions";
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory, Link } from "react-router-dom";
import PaginationItem from "../../components/PaginationItem";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "../../App.css";

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
        backgroundColor: value < CURRENT_DATE ? "darkgray" : "lightgray",
        width: "500",
      },
    });

  useEffect(() => {
    dispatch(eventActions.eventsRequest(pageNum));
  }, [dispatch, pageNum]);

  return (
    <div>
      {" "}
      <Col
        className=" align-items-center Buttonnewevent text-center textEventTitle"
        sm={12}
        md={12}
      >
        <h1>Events</h1>
        <h3>Start planning your NEXT event.</h3>
        {isAuthenticated && (
          <Link to="/event/add">
            <Button variant="dark">Write now</Button>
          </Link>
        )}
      </Col>
      <Container>
        <div>
          {events.length ? (
            <Col>
              <div className="CalendarMargin">
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
              </div>
            </Col>
          ) : (
            <> </>
          )}
        </div>
        <div className=" align-items-center Buttonnewevent text-center textEventTitle">
          <PaginationItem
            pageNum={pageNum}
            setPageNum={setPageNum}
            totalPageNum={totalPageNum}
            loading={loading}
          />
        </div>
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
                <div>
                  <h1>There are no events </h1>
                  <Link to="/">
                    <Button variant="dark">Go to homepage</Button>
                  </Link>
                </div>
              )}
            </>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default PageEvents;
