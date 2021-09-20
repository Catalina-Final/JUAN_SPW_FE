import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import PaginationItem from "../components/PaginationItem";
import { Button, Container, Row } from "react-bootstrap";
import { blogActions } from "../redux/actions";
import ClipLoader from "react-spinners/ClipLoader";
import SingleBlogAdmin from "./SingleBlogAdmin";
import "../App.css";

const BlogsAdmin = () => {
  const [pageNum, setPageNum] = useState(1);
  const totalPageNum = useSelector((state) => state.blog.totalPageNum);
  const blogs = useSelector((state) => state.blog.blogs);
  console.log(`blogs`, blogs);

  const loading = useSelector((state) => state.blog.loading);
  const currentUser = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleClickOnBlog = (id) => {
    history.push(`/blogs/${id}`);
  };

  useEffect(() => {
    dispatch(blogActions.getBlogsByUser(currentUser?.id, pageNum));
  }, [dispatch, pageNum, currentUser.id]);

  return (
    <div>
      <Container>
        <h2>Blogs Published</h2>
        <Row>
          {loading ? (
            <ClipLoader color="#f86c6b" size={150} loading={loading} />
          ) : (
            <>
              {blogs.length ? (
                <div>
                  {blogs.map((blog) => (
                    <SingleBlogAdmin
                      // className="BlogCardImages"
                      blog={blog}
                      key={blog._id}
                      handleClick={handleClickOnBlog}
                    />
                  ))}
                </div>
              ) : (
                <div>
                  <h1>There are no blogs </h1>
                  <Link to="/blog/add">
                    <Button variant="dark">Start sharing your stories</Button>
                  </Link>
                </div>
              )}
            </>
          )}
        </Row>
      </Container>
      <div className="textEventTitle">
        <PaginationItem
          style={{ marginTop: "20px" }}
          pageNum={pageNum}
          setPageNum={setPageNum}
          totalPageNum={totalPageNum}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default BlogsAdmin;
