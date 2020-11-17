import * as types from "../constants/blog.constants";

const initialState = {
  blogs: [],
  totalResults: 0,
  totalPages: 0,
  currentPage: 0,
  loading: false,
  selectedBlog: null,
};

const blogReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.BLOG_REQUEST:
    case types.GET_SINGLE_BLOG_REQUEST:
    case types.CREATE_BLOG_REQUEST:
    case types.UPDATE_BLOG_REQUEST:
    case types.DELETE_BLOG_REQUEST:
      return { ...state, loading: true };

    case types.BLOG_REQUEST_SUCCESS:
      return {
        ...state,
        blogs: payload.blogs,
        loading: false,
        totalPageNum: payload.totalPages,
      };

    case types.GET_SINGLE_BLOG_REQUEST_SUCCESS:
      return {
        ...state,
        selectedBlog: payload,
        loading: false,
      };

    case types.UPDATE_BLOG_SUCCESS:
      return {
        ...state,
        selectedBlog: payload,
        loading: false,
        redirectTo: "__GO_BACK__",
      };
    case types.SEND_REACTION_REQUEST:
    case types.BLOG_REQUEST_FAILURE:
    case types.GET_SINGLE_BLOG_REQUEST_FAILURE:
    case types.CREATE_BLOG_FAILURE:
    case types.UPDATE_BLOG_FAILURE:
    case types.DELETE_BLOG_FAILURE:
      return { ...state, loading: false };

    case types.CREATE_BLOG_SUCCESS:
      return { ...state, loading: false, redirectTo: "/" };

    case types.DELETE_BLOG_SUCCESS:
      return { ...state, loading: false, selectedBlog: {}, redirectTo: "/" };

    case types.CREATE_REVIEW_REQUEST:
      return { ...state, submitReviewLoading: true };

    case types.CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        submitReviewLoading: false,
        selectedBlog: {
          ...state.selectedBlog,
          reviews: [...state.selectedBlog.reviews, payload],
        },
      };

    case types.BLOG_REACTION_SUCCESS:
      return {
        ...state,
        selectedBlog: { ...state.selectedBlog, reactions: payload },
        submitLoading: false,
      };

    case types.REVIEW_REACTION_SUCCESS:
      return {
        ...state,
        selectedBlog: {
          ...state.selectedBlog,
          reviews: [
            ...state.selectedBlog.reviews.map((review) => {
              if (review._id !== payload.reviewId) return review;
              return { ...review, reactions: payload.reactions };
            }),
          ],
        },
        submitLoading: false,
      };

    case types.SEND_REACTION_FAILURE:
    case types.CREATE_REVIEW_FAILURE:
      return { ...state, submitReviewLoading: false };
    case types.SET_REDIRECT_TO:
      return { ...state, redirectTo: payload };

    case types.GET_REVIEWS_OF_BLOG_REQUEST:
      return { ...state, loading: true };

    case types.GET_REVIEWS_OF_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedBlog: { ...state.selectedBlog, reviews: payload.reviews },
      };

    case types.GET_REVIEWS_OF_BLOG_FAILURE:
      return { ...state, submitReviewLoading: false };
    default:
      return state;
  }
};

export default blogReducer;
