import React, { useEffect, useState } from "react";
import { Jumbotron, Button } from "react-bootstrap";
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
      <div>
        {" "}
        <div>
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
          <div>
            {loading ? (
              <ClipLoader color="#f86c6b" size={150} loading={loading} />
            ) : (
              <>
                {blogs.length ? (
                  <div>
                    {blogs.map((blog) => (
                      <BlogCard
                        blog={blog}
                        handleClick={handleClickOnBlog}
                        key={blog._id}
                        blogs={blogs}
                      />
                    ))}
                  </div>
                ) : (
                  <p>There are no blogs </p>
                )}
              </>
            )}
          </div>
        </div>
        <PaginationItem
          pageNum={pageNum}
          setPageNum={setPageNum}
          totalPageNum={totalPageNum}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default HomePageBlogs;
