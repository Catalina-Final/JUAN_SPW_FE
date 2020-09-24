import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { eventActions } from "../../redux/actions";
import Moment from "react-moment";
import Markdown from "react-markdown";
import ClipLoader from "react-spinners/ClipLoader";
import ShowImages from "../../components/ShowImages";
import MessengerPage from "../MessengerPage";
import { Badge, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EventDetailPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.event.loading);
  const params = useParams();
  const event = useSelector((state) => state.event.selectedEvent);
  const history = useHistory();
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (params?.id) {
      console.log(params?.id);
      dispatch(eventActions.getSingleEvent(params.id));
    }
  }, [dispatch, params]);
  // console.log("BADGE", event.eventType.type);
  const handleGoBackClick = (e) => {
    history.goBack();
  };

  if (!event) return loading;

  return (
    <>
      <div className="d-flex justify-content-between">
        <Button onClick={handleGoBackClick}>
          <FontAwesomeIcon icon="chevron-left" size="1x" /> Back
        </Button>
        {currentUser?._id === event?.author._id ? (
          <Link to={`/event/edit/${event?._id}`}>
            <Button variant="danger">
              <FontAwesomeIcon icon="edit" size="1x" /> Edit
            </Button>
          </Link>
        ) : (
          <></>
        )}
      </div>

      {loading ? (
        <ClipLoader color="#f86c6b" size={350} loading={loading} />
      ) : (
        <>
          {event && (
            <>
              <div className="mb-5">
                <h1>{event?.title}</h1>
                <span className="text-muted">
                  @{event?.author.name} wrote{" "}
                  <Moment fromNow>{event.createdAt}</Moment>
                </span>
                <hr />
                <Markdown source={event.content} />
                <ShowImages
                  imagesGallery={
                    Array.isArray(event.images)
                      ? event.images
                      : ["https://via.placeholder.com/160x100"]
                  }
                />

                <h3>Category</h3>

                <Badge variant="danger" style={{ fontWeight: "300" }}>
                  {event.eventType?.type}
                </Badge>

                <div>
                  <MessengerPage roomId={event._id} />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default EventDetailPage;
