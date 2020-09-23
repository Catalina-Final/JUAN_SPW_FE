import * as types from "../constants/event.constants";

const initialState = {
  events: [],
  eventDates: [],
  totalResults: 0,
  totalPages: 0,
  currentPage: 0,
  loading: false,
  selectedEvent: null,
};

const eventReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.EVENT_REQUEST:
    case types.GET_SINGLE_EVENT_REQUEST:
    case types.CREATE_EVENT_REQUEST:
    case types.UPDATE_EVENT_REQUEST:
    case types.DELETE_EVENT_REQUEST:
      return { ...state, loading: true };

    case types.EVENT_REQUEST_SUCCESS:
      return {
        ...state,
        events: payload.events,
        loading: false,
        totalPageNum: payload.totalPages,
        eventDates: payload.eventDates,
      };

    case types.GET_SINGLE_EVENT_REQUEST_SUCCESS:
      return { ...state, selectedEvent: payload, loading: false };

    case types.UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        selectedEvent: payload,
        loading: false,
        redirectTo: "__GO_BACK__",
      };

    case types.EVENT_REQUEST_FAILURE:
    case types.GET_SINGLE_EVENT_REQUEST_FAILURE:
    case types.CREATE_EVENT_FAILURE:
    case types.UPDATE_EVENT_FAILURE:
    case types.DELETE_EVENT_FAILURE:
      return { ...state, loading: false };

    case types.CREATE_EVENT_SUCCESS:
      return { ...state, loading: false, redirectTo: "/" };

    case types.DELETE_EVENT_SUCCESS:
      return { ...state, loading: false, selectedEvent: {}, redirectTo: "/" };

    case types.CREATE_REVIEW_REQUEST:
      return { ...state, submitReviewLoading: true };

    case types.CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        submitReviewLoading: false,
        selectedEvent: {
          ...state.selectedEvent,
          reviews: [...state.selectedEvent.reviews, payload],
        },
      };

    case types.CREATE_REVIEW_FAILURE:
      return { ...state, submitReviewLoading: false };
    case types.SET_REDIRECT_TO:
      return { ...state, redirectTo: payload };

    case types.GET_EVENT_TYPES_REQUEST:
      return { ...state, loading: true };
    case types.GET_EVENT_TYPES_SUCCESS:
      return { ...state, loading: false, eventTypes: payload };
    case types.GET_EVENT_TYPES_FAILURE:
      return { ...state, loading: false };

    case types.GET_EVENTS_OF_USER_REQUEST:
      return { ...state, loading: true };
    case types.GET_EVENTS_OF_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        events: payload.events,
        totalPageNum: payload.totalPages,
      };
    case types.GET_EVENTS_OF_USER_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default eventReducer;
