import * as types from "../constants/event.constants";
import api from "../api";
import { alertActions } from "./alert.actions";

const eventsRequest =
  (pageNum = 1, limit = 9, query = null, ownerId = null, sortBy = null) =>
  async (dispatch) => {
    dispatch({ type: types.EVENT_REQUEST, payload: null });
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
        `/events?page=${pageNum}&limit=${limit}${queryString}${sortByString}`
      );
      dispatch({
        type: types.EVENT_REQUEST_SUCCESS,
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({ type: types.EVENT_REQUEST_FAILURE, payload: error });
    }
  };

// Get events By user
const getEventsByUser =
  (userId, pageNum = 1, limit = 3, query = null, sortBy = null) =>
  async (dispatch) => {
    dispatch({ type: types.GET_EVENTS_OF_USER_REQUEST, payload: null });
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
        `/events/user/${userId}?page=${pageNum}&limit=${limit}${queryString}${sortByString}`
      );
      dispatch({
        type: types.GET_EVENTS_OF_USER_SUCCESS,
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({ type: types.GET_EVENTS_OF_USER_FAILURE, payload: error });
    }
  };

//

const getEventTypes = () => async (dispatch) => {
  dispatch({ type: types.GET_EVENT_TYPES_REQUEST, payload: null });
  try {
    const res = await api.get("/events/types");
    dispatch({ type: types.GET_EVENT_TYPES_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.GET_EVENT_TYPES_FAILURE, payload: error });
  }
};

const getSingleEvent = (eventId) => async (dispatch) => {
  dispatch({ type: types.GET_SINGLE_EVENT_REQUEST, payload: null });
  try {
    const res = await api.get(`/events/${eventId}`);
    dispatch({
      type: types.GET_SINGLE_EVENT_REQUEST_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_SINGLE_EVENT_REQUEST_FAILURE, payload: error });
  }
};

const createReview = (eventId, reviewText) => async (dispatch) => {
  dispatch({ type: types.CREATE_REVIEW_REQUEST, payload: null });
  try {
    const res = await api.post(`/events/${eventId}/reviews`, {
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

const createNewEvent = (formData) => async (dispatch) => {
  dispatch({ type: types.CREATE_EVENT_REQUEST, payload: null });
  try {
    // const formData = new FormData();
    // formData.append("title", title);
    // formData.append("content", content);
    // if (images && images.lenth) {
    //   for (let index = 0; index < images.length; index++) {
    //     formData.append("imagesUpload", images[index]);
    //   }
    // }
    const res = await api.post("/events", formData);

    dispatch({
      type: types.CREATE_EVENT_SUCCESS,
      payload: res.data.data,
    });
    dispatch(alertActions.setAlert("New event has been created!", "success"));
  } catch (error) {
    dispatch({ type: types.CREATE_EVENT_FAILURE, payload: error });
  }
};

const updateEvent = (eventId, formData) => async (dispatch) => {
  dispatch({ type: types.UPDATE_EVENT_REQUEST, payload: null });
  try {
    // let formData = new FormData();
    // formData.set("title", title);
    // formData.set("content", content);
    const res = await api.put(`/events/${eventId}`, formData);

    dispatch({
      type: types.UPDATE_EVENT_SUCCESS,
      payload: res.data.data,
    });
    dispatch(alertActions.setAlert("The event has been updated!", "success"));
  } catch (error) {
    dispatch({ type: types.UPDATE_EVENT_FAILURE, payload: error });
  }
};

const deleteEvent = (eventId) => async (dispatch) => {
  dispatch({ type: types.DELETE_EVENT_REQUEST, payload: null });
  try {
    const res = await api.delete(`/events/${eventId}`);

    dispatch({
      type: types.DELETE_EVENT_SUCCESS,
      payload: res.data,
    });
    dispatch(alertActions.setAlert("The event has been deleted!", "success"));
  } catch (error) {
    dispatch({ type: types.DELETE_EVENT_FAILURE, payload: error });
  }
};

const setRedirectTo = (redirectTo) => ({
  type: types.SET_REDIRECT_TO,
  payload: redirectTo,
});

export const eventActions = {
  eventsRequest,
  getSingleEvent,
  createReview,
  createNewEvent,
  updateEvent,
  deleteEvent,
  setRedirectTo,
  getEventTypes,
  getEventsByUser,
};
