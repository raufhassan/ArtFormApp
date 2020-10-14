import { GET_USER, GET_ID, GET_DEPENDENTS } from "./types";

export const personalInfo = (userData) => {
  if (userData) {
    return {
      type: GET_USER,
      payload: userData,
    };
  } else {
    console.log("no data");
  }
};
export const DependentInfo = (data) => {
  if (data) {
    return {
      type: GET_DEPENDENTS,
      payload: data,
    };
  } else {
    console.log("no data");
  }
};

export const saveID = (id) => {
  /*  if (userData) {
    dispatch({
      type: GET_ID,
      payload: id,
    });
  } */
  return {
    type: GET_ID,
    payload: id,
  };
};
