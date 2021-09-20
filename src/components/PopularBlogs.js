import React, { useState } from "react";

import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ClipLoader } from "react-spinners";
// import { blogActions } from "../redux/actions";
import "../App.css";
import "../../src/styles/popularBlogsStyle.sass";
import Moment from "react-moment";

const PopularBlogs = () => {
  // eslint-disable-next-line
  const [pageNum, setPageNum] = useState(1);
  const blogs = useSelector((state) => state.blog.blogs);
  console.log(`blogs`, blogs);
  const history = useHistory();
  // const dispatch = useDispatch();
  const loading = useSelector((state) => state.blog.loading);
  console.log(`loading`, loading);
  // const sortBy = {
  //   key: "reviewCount",
  //   ascending: -1,
  // };

  // useEffect(() => {
  //   dispatch(blogActions.blogsRequest(pageNum, 4, null, null, sortBy));
  // }, []);

  const handleClickOnBlog = (id) => {
    history.push(`/blogs/${id}`);
  };

  return (
    <div className="MarginPopular">
      <h1 className="PopularBlogsText">Popular Blogs</h1>
      <div>
        {loading ? (
          <div className="MarginPopular">
            <ClipLoader
              className="loaderSpinner"
              color="#f86c6b"
              size={350}
              loading={loading}
            />
          </div>
        ) : (
          <>
            {blogs.length ? (
              <>
                <div className="popular-blogs-container">
                  <div
                    className="post-card-container"
                    onClick={() => handleClickOnBlog(blogs[0]?._id)}
                  >
                    <div className="post-img-container">
                      <img
                        alt="blog 1"
                        src={
                          blogs[0]?.images
                            ? blogs[0].images[0]
                            : "https://via.placeholder.com/160x100"
                        }
                      />
                    </div>

                    <div className="post-card-content">
                      <div className="post-date">
                        {" "}
                        <Moment fromNow>{blogs[0]?.createdAt}</Moment>
                      </div>
                      <div className="post-title">
                        <h4>
                          {" "}
                          {blogs[0].title.length <= 50
                            ? blogs[0].title
                            : blogs[0].title.slice(0, 30) + "..."}
                        </h4>
                        <p>
                          {blogs[0].content.length <= 99
                            ? blogs[0].content
                            : blogs[0].content.slice(0, 50) + "..."}
                        </p>
                      </div>
                      <div className="post-category">
                        {blogs[0]?.author?.name}
                      </div>
                    </div>
                  </div>
                  <div
                    className="post-card-container "
                    onClick={() => handleClickOnBlog(blogs[1]?._id)}
                  >
                    <div className="post-img-container">
                      <img
                        alt="blog 2"
                        src={
                          blogs[1]?.images
                            ? blogs[1].images[1]
                            : "https://via.placeholder.com/160x100"
                        }
                      />
                    </div>

                    <div className="post-card-content">
                      <div className="post-date">
                        {" "}
                        <Moment fromNow>{blogs[1]?.createdAt}</Moment>
                      </div>
                      <div className="post-title">
                        <h4>
                          {" "}
                          {blogs[1]?.title.length <= 50
                            ? blogs[1].title
                            : blogs[1].title.slice(0, 30) + "..."}
                        </h4>
                        <p>
                          {blogs[1]?.content.length <= 99
                            ? blogs[1].content
                            : blogs[1].content.slice(0, 50) + "..."}
                        </p>
                      </div>
                      <div className="post-category">
                        {blogs[1]?.author?.name}
                      </div>
                    </div>
                  </div>
                  <div
                    className="post-card-container"
                    onClick={() => handleClickOnBlog(blogs[2]?._id)}
                  >
                    <div className="post-img-container">
                      <img
                        alt="blog 3"
                        src={
                          blogs[2]?.images
                            ? blogs[2].images[1]
                            : "https://via.placeholder.com/160x100"
                        }
                      />
                    </div>

                    <div className="post-card-content">
                      <div className="post-date">
                        {" "}
                        <Moment fromNow>{blogs[2]?.createdAt}</Moment>
                      </div>
                      <div className="post-title">
                        <h4>
                          {" "}
                          {blogs[2]?.title.length <= 50
                            ? blogs[2].title
                            : blogs[2].title.slice(0, 30) + "..."}
                        </h4>
                        <p>
                          {blogs[2].content.length <= 99
                            ? blogs[2].content
                            : blogs[2].content.slice(0, 50) + "..."}
                        </p>
                      </div>
                      <div className="post-category">
                        {blogs[2]?.author?.name}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <p>There are no blogs </p>
            )}
          </>
        )}
      </div>

      {/* <Col className="text-center PopularBlogs " lg={7}>
            <Col className=" responsivePopularBlogs secondBlogPopular MarginPopular OnHover">
              {blogs.length ? (
                <div
                  className="d-flex responsivePopularBlogs"
                  style={{ border: "none" }}
                >
                  <div onClick={() => handleClickOnBlog(blogs[1]._id)}>
                    <h5 className="textContentBlog">
                      {blogs[1].title.length <= 99
                        ? blogs[1].title
                        : blogs[1].title.slice(0, 80) + "..."}
                    </h5>
                    <p className="textContentBlog">
                      {blogs[1].content.length <= 99
                        ? blogs[1].content
                        : blogs[1].content.slice(0, 200) + "..."}
                    </p>
                    <Badge variant="secondary">By {blogs[1].author.name}</Badge>
                  </div>
                  <img
                    style={{ margin: "20px" }}
                    width="150px"
                    onClick={() => handleClickOnBlog(blogs[1]._id)}
                    height="100px"
                    alt="Popular Blogs Second "
                    src={blogs[1].images[0]}
                    className="ImagePopularBlogs"
                  />
                </div>
              ) : (
                <p>There are no blogs </p>
              )}
            </Col>
            <Col className="responsivePopularBlogs thirdBlogPopular MarginPopular OnHover">
              {blogs.length ? (
                <div className="d-flex responsivePopularBlogs">
                  <div onClick={() => handleClickOnBlog(blogs[2]._id)}>
                    <h5 className="textContentBlog">
                      {blogs[2].title.length <= 99
                        ? blogs[2].title
                        : blogs[2].title.slice(0, 80) + "..."}
                    </h5>
                    <p className="textContentBlog">
                      {blogs[2].content.length <= 99
                        ? blogs[2].content
                        : blogs[2].content.slice(0, 200) + "..."}
                    </p>
                    <Badge variant="secondary">By {blogs[2].author.name}</Badge>
                  </div>
                  <img
                    onClick={() => handleClickOnBlog(blogs[2]._id)}
                    style={{ margin: "20px" }}
                    width="150px"
                    height="100px"
                    alt="Popular Blogs Second "
                    src={
                      // blogs[2]
                      //   ? blogs[2].images[0]
                      //   :
                      "https://via.placeholder.com/150"
                    }
                    className="ImagePopularBlogs"
                  />
                </div>
              ) : (
                <p>There are no blogs </p>
              )}
            </Col>
            <Col className="fourthBlogPopular MarginPopular OnHover">
              {blogs.length ? (
                <div
                  className="d-flex responsivePopularBlogs"
                  style={{ border: "none" }}
                >
                  <div onClick={() => handleClickOnBlog(blogs[3]._id)}>
                    <h5 className="textContentBlog">
                      {blogs[3].title?.length <= 99
                        ? blogs[3].title
                        : blogs[3].title.slice(0, 80) + "..."}
                    </h5>
                    <p className="textContentBlog">
                      {blogs[3].content.length <= 99
                        ? blogs[3].content
                        : blogs[3].content.slice(0, 200) + "..."}
                    </p>
                    <Badge
                      className="badge badge-secondary"
                      variant="secondary"
                    >
                      {" "}
                      By {blogs[3].author.name}
                    </Badge>
                  </div>

                  <img
                    onClick={() => handleClickOnBlog(blogs[3]._id)}
                    style={{ margin: "20px" }}
                    width="150px"
                    height="100px"
                    alt="Popular Blogs Second "
                    src={blogs[3]?.images?.length > 0 ? blogs[3].images[0] : ""}
                    className="ImagePopularBlogs"
                  />
                </div>
              ) : (
                <p>There are no blogs </p>
              )}
            </Col>
          </Col> */}
    </div>
  );
};

export default PopularBlogs;
