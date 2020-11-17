import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { blogActions } from "../../redux/actions";
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";
import ClipLoader from "react-spinners/ClipLoader";
import ReviewList from "../../components/ReviewList";
import { useState } from "react";
import ReviewBlog from "../../components/ReviewBlog";
import ShowImages from "../../components/ShowImages";
import { Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Linkify from "react-linkify";

const BlogDetailPage = () => {
  const loading = useSelector((state) => state.blog.loading);
  const blog = useSelector((state) => state.blog.selectedBlog);
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const currentUser = useSelector((state) => state.auth.user);
  const submitReviewLoading = useSelector(
    (state) => state.blog.submitReviewLoading
  );
  const [reviewText, setReviewText] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const handleInputChange = (e) => {
    setReviewText(e.target.value);
  };
  const linkProperties = {
    target: "_new",
    rel: "nofollow noopener noreferrer",
  };

  // console.log("Current User", currentUser._id);
  // console.log("Current Blog", blog._id);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    dispatch(blogActions.createReview(blog._id, reviewText));
    setReviewText("");
  };

  useEffect(() => {
    if (params?.id) {
      dispatch(blogActions.getSingleBlog(params.id));
      dispatch(blogActions.getReviewsOfBlog(params.id));
    }
  }, [dispatch, params]);

  const handleGoBackClick = (e) => {
    history.goBack();
  };

  return (
    <Container>
      <div className="d-flex justify-content-between">
        <Button onClick={handleGoBackClick}>
          <FontAwesomeIcon icon="chevron-left" size="1x" /> Back
        </Button>
        {currentUser._id === blog?.author._id ? (
          <Link to={`/blog/edit/${blog?._id}`}>
            <Button variant="danger">
              <FontAwesomeIcon icon="edit" size="1x" /> Edit
            </Button>
          </Link>
        ) : (
          <></>
        )}
      </div>

      {loading ? (
        <ClipLoader color="#f86c6b" size={150} loading={loading} />
      ) : (
        <>
          {blog && (
            <div className="mb-5">
              <h1>{blog?.title}</h1>
              <span className="text-muted">
                @ {blog?.author.name} wrote{" "}
                <Moment fromNow>{blog.createdAt}</Moment>
              </span>
              <hr />
              <ReactMarkdown
                source={blog.content}
                renderers={{
                  paragraph: (props) => (
                    <Linkify properties={linkProperties}>
                      <p>{props.children}</p>
                    </Linkify>
                  ),
                }}
              />
              <ShowImages
                imagesGallery={
                  Array.isArray(blog.images)
                    ? blog.images
                    : ["https://via.placeholder.com/160x100"]
                }
              />
              <hr />
              <ReviewList reviews={blog.reviews} />
            </div>
          )}
          {isAuthenticated && (
            <ReviewBlog
              reviewText={reviewText}
              handleInputChange={handleInputChange}
              handleSubmitReview={handleSubmitReview}
              loading={submitReviewLoading}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default BlogDetailPage;
