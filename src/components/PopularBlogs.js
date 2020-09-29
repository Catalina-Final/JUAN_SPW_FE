import React, { useEffect, useState } from "react";
import { Badge, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { blogActions } from "../redux/actions";
import "../App.css";

const PopularBlogs = () => {
  // eslint-disable-next-line
  const [pageNum, setPageNum] = useState(1);
  const blogs = useSelector((state) => state.blog.blogs);
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.blog.loading);

  useEffect(() => {
    const sortBy = {
      key: "reviewCount",
      ascending: -1,
    };
    dispatch(blogActions.blogsRequest(pageNum, 5, null, null, sortBy));
  }, [dispatch, pageNum]);
  console.log("blooogs", blogs);

  const handleClickOnBlog = (id) => {
    history.push(`/blogs/${id}`);
  };
  console.log("RESULY", blogs);

  if (loading) {
    return (
      <ClipLoader
        animation="grow"
        variant="warning"
        color="#f86c6b"
        size={250}
        loading={loading}
      />
    );
  }

  return (
    <div className="MarginPopular">
      <Container className="ContainerPopularBlogs">
        <h1 className="PopularBlogsText">Popular Blogs</h1>
        <Row>
          <Col className="MAINPOPULARBLOG" md={6}>
            <div
              style={{ flexWrap: "wrap", flexDirection: "row" }}
              className="d-flex text-center OnHover mainPopularBlog responsivePopularBlogs"
            >
              {loading ? (
                <ClipLoader
                  className="loaderSpinner"
                  color="#f86c6b"
                  size={350}
                  loading={loading}
                />
              ) : (
                <>
                  {blogs.length ? (
                    <div className="MarginPopular">
                      <img
                        src={blogs[0].images[0]}
                        width="100%"
                        alt="Popular blog"
                        onClick={() => handleClickOnBlog(blogs[0]?._id)}
                      />
                      <h5 className="textContentBlog ">{blogs[0]?.title}</h5>
                      <p>
                        {blogs[0]?.content.length <= 99
                          ? blogs[0]?.content
                          : blogs[0]?.content.slice(0, 150) + "..."}
                      </p>
                      <Badge variant="secondary">
                        By {blogs[0]?.author.name}
                      </Badge>
                    </div>
                  ) : (
                    <p>There are no blogs </p>
                  )}
                </>
              )}
            </div>
          </Col>
          <Col className="text-center PopularBlogs " md={6}>
            <Col className=" responsivePopularBlogs secondBlogPopular MarginPopular OnHover">
              {blogs.length > 1 ? (
                <div
                  className="d-flex responsivePopularBlogs"
                  style={{ border: "none" }}
                >
                  <div>
                    <h5 className="textContentBlog">
                      {blogs[1].title.length <= 99
                        ? blogs[1].title
                        : blogs[1].title.slice(0, 80) + "..."}
                    </h5>
                    <p className="textContentBlog">
                      {blogs[1].content.length <= 99
                        ? blogs[1].content
                        : blogs[1].content.slice(0, 80) + "..."}
                    </p>
                    <Badge variant="secondary">By {blogs[1].author.name}</Badge>
                  </div>
                  <img
                    style={{ margin: "20px" }}
                    onClick={() => handleClickOnBlog(blogs[1]._id)}
                    width="150px"
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
              {blogs.length > 1 ? (
                <div className="d-flex responsivePopularBlogs">
                  <div>
                    <h5 className="textContentBlog">
                      {blogs[2].title.length <= 99
                        ? blogs[2]?.title
                        : blogs[2].title.slice(0, 80) + "..."}
                    </h5>
                    <p className="textContentBlog">
                      {blogs[2].content.length <= 99
                        ? blogs[2].content
                        : blogs[2].content.slice(0, 80) + "..."}
                    </p>
                    <Badge variant="secondary">By {blogs[2].author.name}</Badge>
                  </div>
                  <img
                    style={{ margin: "20px" }}
                    onClick={() => handleClickOnBlog(blogs[2]._id)}
                    width="150px"
                    height="100px"
                    alt="Popular Blogs Second "
                    src={blogs[2].images[0]}
                    className="ImagePopularBlogs"
                  />
                </div>
              ) : (
                loading
              )}
            </Col>
            <Col className="fourthBlogPopular MarginPopular OnHover">
              {blogs.length >= 1 ? (
                <div
                  className="d-flex responsivePopularBlogs"
                  style={{ border: "none" }}
                >
                  <div>
                    <h5 className="textContentBlog">
                      {blogs[3]?.title.length <= 99
                        ? blogs[3].title
                        : blogs[3].title.slice(0, 80) + "..."}
                    </h5>
                    <p className="textContentBlog">
                      {blogs[3].content.length <= 99
                        ? blogs[3].content
                        : blogs[3].content.slice(0, 80) + "..."}
                    </p>
                    <Badge class="badge badge-secondary" variant="secondary">
                      {" "}
                      By {blogs[3].author.name}
                    </Badge>
                  </div>

                  <img
                    style={{ margin: "20px" }}
                    onClick={() => handleClickOnBlog(blogs[3]._id)}
                    width="150px"
                    height="100px"
                    alt="Popular Blogs Second "
                    src={blogs[3]?.images?.length > 0 ? blogs[3].images[0] : ""}
                    className="ImagePopularBlogs"
                  />
                </div>
              ) : (
                <></>
              )}
            </Col>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PopularBlogs;
