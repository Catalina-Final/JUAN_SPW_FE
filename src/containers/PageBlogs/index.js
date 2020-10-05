import React, { useEffect, useState } from "react";
import { Container, CardColumns, Jumbotron, Button } from "react-bootstrap";
import BlogCard from "../../components/BlogCard";
import { useSelector, useDispatch } from "react-redux";
import { blogActions } from "../../redux/actions";
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory, Link } from "react-router-dom";
import PaginationItem from "../../components/PaginationItem";
import pageBlogsCover from "../HomePage/imagesCover/pageBlogsCover.jpg";
import "../../App.css";

const HomePageBlogs = () => {
  const [pageNum, setPageNum] = useState(1);
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.blog.loading);
  const blogs = useSelector((state) => state.blog.blogs);
  const totalPageNum = useSelector((state) => state.blog.totalPageNum);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const sortBy = {
      key: "reviewCount",
      ascending: -1,
    };
    dispatch(blogActions.blogsRequest(pageNum, 8, null, null, sortBy));
  }, [dispatch, pageNum]);

  const handleClickOnBlog = (id) => {
    history.push(`/blogs/${id}`);
  };

  return (
    <div>
      <Container>
        {" "}
        <Container>
          <Jumbotron
            style={{
              backgroundImage: `url(${pageBlogsCover})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              height: "50vh",
            }}
            className="text-center whiteTextBlackBackground"
          >
            <div
              style={{
                fontWeight: "200",
              }}
              className="BlogPageText"
            >
              Share your experiences with the community.
            </div>
            {isAuthenticated && (
              <Link to="/blog/add">
                <Button variant="warning">Write now</Button>
              </Link>
            )}
          </Jumbotron>
          <CardColumns
            style={{ flexWrap: "wrap", flexDirection: "row" }}
            className="d-flex text-center "
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
