import React, { useEffect, useState } from "react";
import { Container, CardColumns, Jumbotron, Button } from "react-bootstrap";
import BlogCard from "../../components/BlogCard";
import { useSelector, useDispatch } from "react-redux";
import { blogActions } from "../../redux/actions";
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory, Link } from "react-router-dom";
import PaginationItem from "../../components/PaginationItem";

const HomePageBlogs = () => {
  const [pageNum, setPageNum] = useState(1);
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.blog.loading);
  const blogs = useSelector((state) => state.blog.blogs);
  const totalPageNum = useSelector((state) => state.blog.totalPageNum);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(blogActions.blogsRequest(pageNum));
  }, [dispatch, pageNum]);

  const handleClickOnBlog = (id) => {
    history.push(`/blogs/${id}`);
  };

  return (
    <div>
      <Container>
        {" "}
        <Container>
          <Jumbotron className="text-center">
            <h1>Social Blog</h1>
            <p>Write about your amazing experiences.</p>
            {isAuthenticated && (
              <Link to="/blog/add">
                <Button variant="primary">Write now</Button>
              </Link>
            )}
          </Jumbotron>
          <CardColumns
            style={{ flexWrap: "wrap", flexDirection: "row" }}
            className="d-flex text-center"
          >
            {loading ? (
              <ClipLoader color="#f86c6b" size={150} loading={loading} />
            ) : (
              <>
                {blogs.length ? (
                  <CardColumns>
                    {blogs.map((blog) => (
                      <BlogCard
                        blog={blog}
                        key={blog._id}
                        handleClick={handleClickOnBlog}
                      />
                    ))}
                  </CardColumns>
                ) : (
                  <p>There are no blogs </p>
                )}
              </>
            )}
          </CardColumns>
        </Container>
        <PaginationItem
          pageNum={pageNum}
          setPageNum={setPageNum}
          totalPageNum={totalPageNum}
          loading={loading}
        />
      </Container>
    </div>
  );
};

export default HomePageBlogs;
