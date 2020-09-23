import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PaginationItem from "../components/PaginationItem";
import { Carousel, Container, Row } from "react-bootstrap";
import { blogActions } from "../redux/actions";
import ClipLoader from "react-spinners/ClipLoader";
import SingleBlog from "../components/BlogCard";

import "../App.css";
import BlogCard from "../components/BlogCard";

const BlogsAdmin = () => {
  const [pageNum, setPageNum] = useState(1);
  const totalPageNum = useSelector((state) => state.blog.totalPageNum);
  const blogs = useSelector((state) => state.blog.blogs);
  const loading = useSelector((state) => state.blog.loading);
  const currentUser = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleClickOnBlog = (id) => {
    history.push(`/blogs/${id}`);
  };

  useEffect(() => {
    dispatch(blogActions.getBlogsByUser(currentUser.id, pageNum));
  }, [dispatch, pageNum]);

  return (
    <div>
      <h2>Blogs Published</h2>
      <Container>
        <Row>
          {loading ? (
            <ClipLoader color="#f86c6b" size={150} loading={loading} />
          ) : (
            <>
              {blogs.length ? (
                <Container fluid className="carouselCover">
                  <Carousel>
                    {blogs.map((blog) => (
                      <Carousel.Item>
                        <div>
                          <img
                            className="d-block  w-100 "
                            src={blog.images}
                            alt="First slide"
                          />
                        </div>
                        <Carousel.Caption onClick={handleClickOnBlog}>
                          <h2>{blog.title}</h2>
                          <h4>{blog.content}</h4>
                        </Carousel.Caption>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </Container>
              ) : (
                <p>There are no events </p>
              )}{" "}
            </>
          )}
        </Row>
      </Container>
      <PaginationItem
        style={{ marginTop: "20px" }}
        pageNum={pageNum}
        setPageNum={setPageNum}
        totalPageNum={totalPageNum}
        loading={loading}
      />
    </div>
  );
};

// <BlogCard
//   blog={blog}
//   key={blog._id}
//   handleClick={handleClickOnBlog}
// />
export default BlogsAdmin;
