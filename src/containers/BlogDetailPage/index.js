import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { blogActions } from "../../redux/actions";

const BlogDetailPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blog.selectedBlog);
  // console.log("Blog data detail page", blog);
  console.log("in useEffect", params.id);
  useEffect(() => {
    if (params?.id) {
      console.log(params?.id);
      dispatch(blogActions.getSingleBlog(params.id));
    }
  }, [dispatch, params]);
  return (
    <div>
      <h1>{blog?.title}</h1>
      <p>{blog?.content}</p>
    </div>
  );
};

export default BlogDetailPage;
