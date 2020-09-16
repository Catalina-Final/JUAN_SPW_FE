import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { eventActions } from "../../redux/actions";
import Moment from "react-moment";
import Markdown from "react-markdown";
import ClipLoader from "react-spinners/ClipLoader";
import ReviewList from "../../components/ReviewList";
import { useState } from "react";
import ReviewEvent from "../../components/ReviewEvent";
import ShowImages from "../../components/ShowImages";

const EventDetailPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.event.loading);
  const params = useParams();
  const event = useSelector((state) => state.event.selectedEvent);
  console.log("Event", event);
  const submitReviewLoading = useSelector(
    (state) => state.event.submitReviewLoading
  );
  const [reviewText, setReviewText] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const handleInputChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    dispatch(eventActions.createReview(event._id, reviewText));
    setReviewText("");
  };

  useEffect(() => {
    if (params?.id) {
      console.log(params?.id);
      dispatch(eventActions.getSingleEvent(params.id));
    }
  }, [dispatch, params]);

  return (
    <>
      {loading ? (
        <ClipLoader color="#f86c6b" size={150} loading={loading} />
      ) : (
        <>
          {event && (
            <div className="mb-5">
              <h1>{event.title}</h1>
              <span className="text-muted">
                @{event?.user?.name} wrote{" "}
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
              <hr />
              <ReviewList reviews={event.reviews} />
              <h3>Category</h3>
              <h5>{event.eventType.type}</h5>
            </div>
          )}
          {isAuthenticated && (
            <ReviewEvent
              reviewText={reviewText}
              handleInputChange={handleInputChange}
              handleSubmitReview={handleSubmitReview}
              loading={submitReviewLoading}
            />
          )}
        </>
      )}
    </>
  );
};

export default EventDetailPage;
