import * as types from "../constants/auth.constants";
import setAuthorizationToken from "./setAuthorizationToken";
import axios from "axios";
import api from "../api";
import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_DETAIL,
  CLEAR_CURRENT_USER_DETAIL,
  FORGOT_PASSWORD,
} from "./types";

import { alertActions } from "./alert.actions";
import { clearProfile } from "./profileActions";
import { setAlert } from "./alertAction";

// const loginRequest = (email, password) => async (dispatch) => {
//   dispatch({ type: types.LOGIN_REQUEST, payload: null });
//   try {
//     const res = await api.post("/auth/login", { email, password });
//     dispatch({ type: types.LOGIN_SUCCESS, payload: res.data });
//     api.defaults.headers.common["authorization"] =
//       "Bearer " + res.data.data.accessToken;
//     localStorage.setItem("accessToken", res.data.data.accessToken);

//     let name = res.data.data.user.name;
//     dispatch(alertActions.setAlert(`Welcome back, ${name}`, "success"));
//   } catch (error) {
//     dispatch({ type: types.LOGIN_FAILURE, payload: error });
//   }
// };

const loginWithFacebook = (token) => async (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST, payload: null });
  try {
    const res = await api.get("/auth/login/facebook/" + token);
    dispatch({ type: types.LOGIN_SUCCESS, payload: res.data });
    api.defaults.headers.common["authorization"] =
      "Bearer " + res.data.data.accessToken;
    localStorage.setItem("accessToken", res.data.data.accessToken);
    console.log("FACEBOOKLOOOGIN", res.data);

    const name = res.data.data.user.name;
    dispatch(alertActions.setAlert(`Welcome back, ${name}`, "success"));
  } catch (error) {
    dispatch({ type: types.LOGIN_FAILURE, payload: error });
  }
};

const loginWithGoogle = (token) => async (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST, payload: null });
  try {
    const res = await api.get("/auth/login/google/" + token);

    dispatch({ type: types.LOGIN_SUCCESS, payload: res.data });
    api.defaults.headers.common["authorization"] =
      "Bearer " + res.data.data.accessToken;
    localStorage.setItem("accessToken", res.data.data.accessToken);
    const name = res.data.data.user.name;
    console.log("Full name", name);
    dispatch(alertActions.setAlert(`Welcome back, ${name}`, "success"));
  } catch (error) {
    dispatch({ type: types.LOGIN_FAILURE, payload: error });
  }
};

const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: types.REGISTER_REQUEST, payload: null });
  try {
    const res = await api.post("/users", { name, email, password });
    dispatch({ type: types.REGISTER_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.REGISTER_FAILURE, payload: error });
  }
};

const getCurrentUser = (accessToken) => async (dispatch) => {
  dispatch({ type: types.GET_CURRENT_USER_REQUEST, payload: null });
  console.log(accessToken);
  if (accessToken) {
    const bearerToken = "Bearer " + accessToken;
    api.defaults.headers.common["authorization"] = bearerToken;
  }
  try {
    const res = await api.get("/users/me");
    dispatch({
      type: types.GET_CURRENT_USER_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_CURRENT_USER_FAILURE, payload: error });
  }
};

const updateProfile = (name, avatarUrl) => async (dispatch) => {
  dispatch({ type: types.UPDATE_PROFILE_REQUEST, payload: null });
  try {
    const res = await api.put("/users", { name, avatarUrl });
    dispatch({ type: types.UPDATE_PROFILE_SUCCESS, payload: res.data.data });
    dispatch(
      alertActions.setAlert(`Your profile has been updated.`, "success")
    );
  } catch (error) {
    dispatch({ type: types.UPDATE_PROFILE_FAILURE, payload: error });
  }
};

// const logout = () => (dispatch) => {
//   delete api.defaults.headers.common["authorization"];
//   localStorage.setItem("accessToken", "");
//   dispatch({ type: types.LOGOUT, payload: null });
// };

// NEW PROFILE SECTION

export const logout = () => async (dispatch) => {
  try {
    const response = await axios.post("/api/users/logout");
    if (response.data.status === "Success") {
      localStorage.removeItem("jwtToken");
      setAuthorizationToken(false);
      dispatch(setCurrentUser(null));
      dispatch(clearCurrentUserDetail());
      dispatch(clearProfile());

      window.location.href = "/login";
      // dispatch(setAlert(response.data.message, 'success', 5000));
    }
  } catch (error) {
    dispatch(setAlert(error.response.data.message, "danger", 3000));
  }
};

export const setCurrentUser = (decodedToken) => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedToken,
  };
};

export const setCurrentUserDetail = (user) => {
  return {
    type: SET_CURRENT_USER_DETAIL,
    payload: user,
  };
};

export const clearCurrentUserDetail = () => {
  return {
    type: CLEAR_CURRENT_USER_DETAIL,
  };
};

export const fetchCurrentUserDetail = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/users/me");
    dispatch(setCurrentUserDetail(response.data.data.user));
  } catch (error) {
    if (error.response.data.message === "Please authenticate") {
      localStorage.removeItem("jwtToken");
      window.location.href = "/login";
    }
  }
};

export const authActions = {
  // loginRequest,
  register,
  getCurrentUser,
  logout,
  loginWithFacebook,
  loginWithGoogle,
  updateProfile,
  clearCurrentUserDetail,
  fetchCurrentUserDetail,
  setCurrentUser,
};
