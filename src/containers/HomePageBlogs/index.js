import React, { useEffect } from "react";
import { Container, CardColumns, Jumbotron, Button } from "react-bootstrap";
import BlogCard from "../../components/BlogCard";
import { useSelector, useDispatch } from "react-redux";
import { blogActions } from "../../redux/actions";
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory, Link } from "react-router-dom";
import ReviewList from "../../components/ReviewList";

const HomePageBlogs = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.blog.loading);
  const blogs = useSelector((state) => state.blog.blogs);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    dispatch(blogActions.blogsRequest());
  }, [dispatch]);

  const handleClickOnBlog = (id) => {
    history.push(`/blogs/${id}`);
  };

  return (
    <div>
      <Container>
        {" "}
        <h1>Home Page</h1>
        <Container>
          <Jumbotron className="text-center">
            <h1>Social Blog</h1>
            <p>Write about your amazing experiences.</p>
            {isAuthenticated && (
              <Link to="/blogs/">
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
                  <ReviewList />
                )}
              </>
            )}
          </CardColumns>
        </Container>
      </Container>
    </div>
  );
};

export default HomePageBlogs;
