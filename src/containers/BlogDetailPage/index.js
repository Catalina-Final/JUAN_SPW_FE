import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { blogActions } from "../../redux/actions";
import Moment from "react-moment";
import Markdown from "react-markdown";
import ClipLoader from "react-spinners/ClipLoader";
import ReviewList from "../../components/ReviewList";
import { useState } from "react";
import ReviewBlog from "../../components/ReviewBlog";
import ShowImages from "../../components/ShowImages";

const BlogDetailPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.blog.loading);
  const params = useParams();
  const blog = useSelector((state) => state.blog.selectedBlog);
  console.log("Blogs", blog);
  const submitReviewLoading = useSelector(
    (state) => state.blog.submitReviewLoading
  );
  const [reviewText, setReviewText] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const handleInputChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    dispatch(blogActions.createReview(blog._id, reviewText));
    setReviewText("");
  };

  useEffect(() => {
    if (params?.id) {
      console.log(params?.id);
      dispatch(blogActions.getSingleBlog(params.id));
    }
  }, [dispatch, params]);

  return (
    <>
      {loading ? (
        <ClipLoader color="#f86c6b" size={150} loading={loading} />
      ) : (
        <>
          {blog && (
            <div className="mb-5">
              <h1>{blog.title}</h1>
              <span className="text-muted">
                @{blog?.user?.name} wrote{" "}
                <Moment fromNow>{blog.createdAt}</Moment>
              </span>
              <hr />
              <Markdown source={blog.content} />
              <ShowImages imagesGallery={blog.images} />
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
    </>
  );
};

export default BlogDetailPage;
