import * as types from "../constants/auth.constants";
const initialState = {
  user: {},
  isAuthenticated: false,
  loading: false,
  accessToken: localStorage.getItem("accessToken"),
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.LOGIN_REQUEST:
    case types.REGISTER_REQUEST:
      return { ...state, loading: true };
    case types.LOGIN_SUCCESS:
      localStorage.setItem("accessToken", payload.accessToken);
      return {
        ...state,
        user: { ...payload.data.user },
        accessToken: payload.data.accessToken,
        loading: false,
        isAuthenticated: true,
      };
    case types.GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        user: payload.user,
        loading: false,
        isAuthenticated: true,
      };
    case types.LOGIN_FAILURE:
    case types.REGISTER_FAILURE:
    case types.GET_CURRENT_USER_FAILURE:
      return { ...state, loading: false };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.LOGOUT:
      return {
        ...state,
        accessToken: null,
        isAuthenticated: false,
        user: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
