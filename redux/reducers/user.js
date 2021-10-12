import {
  USER_STATE_CHANGE,
  USER_POSTS_STATE_CHANGE,
  USER_FOLLOWING_STATE_CHANGE,
  CLEAR_DATA,
  USER_CALENDAR_STATE_CHANGE,
} from "../constants";

const initialState = {
  currentUser: null,
  posts: [],
  follwing: [],
  eintrag: null,
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_STATE_CHANGE:
      return {
        ...state,
        currentUser: action.currentUser,
      };
    case USER_POSTS_STATE_CHANGE:
      return {
        ...state,
        posts: action.posts,
      };

    case USER_FOLLOWING_STATE_CHANGE:
      return {
        ...state,
        following: action.following,
      };
    case USER_CALENDAR_STATE_CHANGE:
      return {
        ...state,
        eintrag: action.eintrag,
      };
    case CLEAR_DATA:
      return {
        currentUser: null,
        posts: [],
        follwing: [],
        eintrag: null,
      };
    default:
      return state;
  }
};
