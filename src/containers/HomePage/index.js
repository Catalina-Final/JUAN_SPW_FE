import React, { useEffect } from "react";
import { Container, CardColumns, Jumbotron } from "react-bootstrap";
import BlogCard from "../../components/BlogCard";
import { useSelector, useDispatch } from "react-redux";
import { blogActions } from "../../redux/actions";
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.blog.loading);
  const blogs = useSelector((state) => state.blog.blogs);
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
          </Jumbotron>
          <CardColumns className="d-flex text-center" md={4}>
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
                  <p>There are no blogs</p>
                )}
              </>
            )}
          </CardColumns>
        </Container>
      </Container>
    </div>
  );
};

export default HomePage;
