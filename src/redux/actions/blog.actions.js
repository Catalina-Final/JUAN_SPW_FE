import * as types from "../constants/blog.constants";
import api from "../api";
import { alertActions } from "./alert.actions";

const blogsRequest =
  (pageNum = 1, limit = 8, query = null, ownerId = null, sortBy = null) =>
  async (dispatch) => {
    dispatch({ type: types.BLOG_REQUEST, payload: null });
    try {
      let queryString = "";
      if (query) {
        queryString = `&title[$regex]=${query}&title[$options]=i`;
      }
      if (ownerId) {
        queryString = `${queryString}&author=${ownerId}`;
      }
      let sortByString = "";
      if (sortBy?.key) {
        sortByString = `&sortBy[${sortBy.key}]=${sortBy.ascending}`;
      }
      const res = await api.get(
        `/blogs?page=${pageNum}&limit=${limit}${queryString}${sortByString}`
      );
      dispatch({
        type: types.BLOG_REQUEST_SUCCESS,
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({ type: types.BLOG_REQUEST_FAILURE, payload: error });
    }
  };

// Get Blogs By user
const getBlogsByUser =
  (userId, pageNum = 1, limit = 5, query = null, sortBy = null) =>
  async (dispatch) => {
    dispatch({ type: types.GET_BLOGS_OF_USER_REQUEST, payload: null });
    try {
      let queryString = "";
      if (query) {
        queryString = `&title[$regex]=${query}&title[$options]=i`;
      }
      let sortByString = "";
      if (sortBy?.key) {
        sortByString = `&sortBy[${sortBy.key}]=${sortBy.ascending}`;
      }
      const res = await api.get(
        `/blogs/user/${userId}?page=${pageNum}&limit=${limit}${queryString}${sortByString}`
      );
      dispatch({
        type: types.GET_BLOGS_OF_USER_SUCCESS,
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({ type: types.GET_BLOGS_OF_USER_FAILURE, payload: error });
    }
  };

const getSingleBlog = (blogId) => async (dispatch) => {
  dispatch({ type: types.GET_SINGLE_BLOG_REQUEST, payload: null });
  try {
    const res = await api.get(`/blogs/${blogId}`);
    dispatch({
      type: types.GET_SINGLE_BLOG_REQUEST_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_SINGLE_BLOG_REQUEST_FAILURE, payload: error });
  }
};

const createReview = (blogId, reviewText) => async (dispatch) => {
  dispatch({ type: types.CREATE_REVIEW_REQUEST, payload: null });
  try {
    const res = await api.post(`/reviews/blogs/${blogId}`, {
      content: reviewText,
    });
    dispatch({
      type: types.CREATE_REVIEW_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.CREATE_REVIEW_FAILURE, payload: error });
  }
};

const getReviewsOfBlog = (blogId) => async (dispatch) => {
  dispatch({ type: types.GET_REVIEWS_OF_BLOG_REQUEST, payload: null });
  try {
    const res = await api.get(`/reviews/blogs/${blogId}`);
    dispatch({
      type: types.GET_REVIEWS_OF_BLOG_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_REVIEWS_OF_BLOG_FAILURE, payload: error });
  }
};

const createNewBlog = (title, content, images) => async (dispatch) => {
  dispatch({ type: types.CREATE_BLOG_REQUEST, payload: null });
  try {
    // const formData = new FormData();
    // formData.append("title", title);
    // formData.append("content", content);
    // if (images && images.lenth) {
    //   for (let index = 0; index < images.length; index++) {
    //     formData.append("imagesUpload", images[index]);
    //   }
    // }
    const res = await api.post("/blogs", { title, content, images });

    dispatch({
      type: types.CREATE_BLOG_SUCCESS,
      payload: res.data.data,
    });
    dispatch(alertActions.setAlert("New blog has been created!", "success"));
  } catch (error) {
    dispatch({ type: types.CREATE_BLOG_FAILURE, payload: error });
  }
};

const updateBlog = (blogId, title, content) => async (dispatch) => {
  dispatch({ type: types.UPDATE_BLOG_REQUEST, payload: null });
  try {
    console.log(`res`, blogId);
    // let formData = new FormData();
    // formData.set("title", title);
    // formData.set("content", content);
    const res = await api.put(`/blogs/edit/${blogId}`, { title, content });

    dispatch({
      type: types.UPDATE_BLOG_SUCCESS,
      payload: res.data.data,
    });
    dispatch(alertActions.setAlert("The blog has been updated!", "success"));
  } catch (error) {
    dispatch({ type: types.UPDATE_BLOG_FAILURE, payload: error });
  }
};

const deleteBlog = (blogId) => async (dispatch) => {
  dispatch({ type: types.DELETE_BLOG_REQUEST, payload: null });
  try {
    const res = await api.delete(`/blogs/${blogId}`);

    dispatch({
      type: types.DELETE_BLOG_SUCCESS,
      payload: res.data,
    });
    dispatch(alertActions.setAlert("The blog has been deleted!", "success"));
  } catch (error) {
    dispatch({ type: types.DELETE_BLOG_FAILURE, payload: error });
  }
};

const setRedirectTo = (redirectTo) => ({
  type: types.SET_REDIRECT_TO,
  payload: redirectTo,
});

const sendEmojiReaction = (targetType, target, emoji) => async (dispatch) => {
  dispatch({ type: types.SEND_REACTION_REQUEST, payload: null });
  try {
    const res = await api.post(`/reactions`, { targetType, target, emoji });
    if (targetType === "Blog") {
      dispatch({
        type: types.BLOG_REACTION_SUCCESS,
        payload: res.data.data,
      });
    }
    if (targetType === "Review") {
      dispatch({
        type: types.REVIEW_REACTION_SUCCESS,
        payload: { reactions: res.data.data, reviewId: target },
      });
    }
  } catch (error) {
    dispatch({ type: types.SEND_REACTION_FAILURE, payload: error });
  }
};

export const blogActions = {
  blogsRequest,
  getSingleBlog,
  createReview,
  createNewBlog,
  updateBlog,
  deleteBlog,
  setRedirectTo,
  getReviewsOfBlog,
  sendEmojiReaction,
  getBlogsByUser,
};
