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
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const blog = useSelector((state) => state.blog.selectedBlog);
  console.log(`blog`, blog);
  const currentUser = useSelector((state) => state.auth.user);
  console.log(`currentUser`, currentUser);
  const loading = useSelector((state) => state.blog.loading);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  console.log(`params`, params);
  const submitReviewLoading = useSelector(
    (state) => state.blog.submitReviewLoading
  );
  const [reviewText, setReviewText] = useState("");

  const handleInputChange = (e) => {
    setReviewText(e.target.value);
  };

  const linkProperties = {
    target: "_new",
    rel: "nofollow noopener noreferrer",
  };

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
    e.preventDefault();
    history.goBack();
  };

  return (
    <Container>
      <div className="d-flex justify-content-center"></div>

      <div className="d-flex justify-content-between">
        <Button onClick={handleGoBackClick}>
          <div> Back </div>
        </Button>

        {currentUser?._id === blog?.author._id ? (
          <Link to={`/blog/edit/${blog?._id}`}>
            <Button variant="danger">
              <FontAwesomeIcon icon="edit" size="1x" /> Edit
            </Button>
          </Link>
        ) : (
          <div></div>
        )}
      </div>

      {loading ? (
        <Container>
          <ClipLoader color="#f86c6b" size={150} loading={loading} />
        </Container>
      ) : (
        <>
          {blog && (
            <div className="mb-5">
              <h1>{blog?.title}</h1>
              <img
                className="avatar-mini-icon"
                alt="avatar-img"
                src={blog.author?.avatarUrl}
              />

              <span className="">
                @ {blog?.author.name} wrote{" "}
                <Moment fromNow>{blog.createdAt}</Moment>
              </span>
              <hr />
              <ReactMarkdown
                skipHtml={false}
                source={blog?.content}
                renderers={{
                  paragraph: (props) => (
                    <Linkify properties={linkProperties}>
                      <p>{props.children}</p>
                    </Linkify>
                  ),
                }}
              />
              {blog.content}
              <ShowImages
                imagesGallery={
                  Array.isArray(blog?.images)
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
