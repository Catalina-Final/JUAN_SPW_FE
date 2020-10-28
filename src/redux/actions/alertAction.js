import { SET_ALERT, CLEAR_ALERT, REMOVE_ALERTS } from "./types";
import { v4 as uuidv4 } from "uuid";

export const setAlert = (message, type, timeout = 2000) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: {
      message,
      id,
      type,
    },
  });

  setTimeout(() => {
    dispatch({
      type: CLEAR_ALERT,
      payload: id,
    });
  }, timeout);
};

export const removeAlerts = () => {
  return {
    type: REMOVE_ALERTS,
  };
};
