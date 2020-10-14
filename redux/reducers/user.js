// import isEmpty from "../../validation/is-empty";
import { GET_USER, GET_ID, GET_DEPENDENTS } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
  dependent: {},
  id: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case GET_ID:
      return {
        ...state,
        id: action.payload,
      };
    case GET_DEPENDENTS:
      return {
        ...state,
        dependent: action.payload,
      };

    default:
      return state;
  }
}
