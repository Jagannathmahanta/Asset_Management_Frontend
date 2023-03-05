import {
  GET_USERLIST_REQUEST,
  UPDATE_USER_REQUEST,
  DELETE_USER_REQUEST,
  GET_AVALABLEASSET_REQUEST,
  ADD_USERASSET_REQUEST,
  DELETE_USERASSET_REQUEST,
  GET_ASSIGNASSET_REQUEST,
} from "./actionType";

export const getUserListRequest = () => {
  return {
    type: GET_USERLIST_REQUEST,
  };
};

export const updateUserListRequest = (payload) => {
  return {
    type: UPDATE_USER_REQUEST,
    payload
  };
};

export const deleteUserRequest = (payload) => {
  return {
    type: DELETE_USER_REQUEST,
    payload,
  };
};

//for Add and delete asset to user

export const getAvalableAssetRequiest = () => {
  return {
    type: GET_AVALABLEASSET_REQUEST,
  };
};

export const addUseerAssetRequiest = (payload) => {
  return {
    type: ADD_USERASSET_REQUEST,
    payload,
  };
};

export const deleteUserAssetRequiest = (payload) => {
  return {
    type: DELETE_USERASSET_REQUEST,
    payload,
  };
};

export const getAssignAssetRequiest = (payload) => {
  return {
    type: GET_ASSIGNASSET_REQUEST,
    payload,
  };
};
