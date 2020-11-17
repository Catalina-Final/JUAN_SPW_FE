import { combineReducers } from "redux";
import blogReducer from "./blog.reducer";
import authReducer from "./auth.reducer";
import alertReducer from "./alert.reducer";
import eventReducer from "./event.reducer";
import userReducer from "./user.reducer";

export default combineReducers({
  blog: blogReducer,
  auth: authReducer,
  alert: alertReducer,
  event: eventReducer,
  user: userReducer,
});
