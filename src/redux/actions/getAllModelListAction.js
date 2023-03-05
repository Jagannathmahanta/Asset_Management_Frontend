
import { ALL_MODEL_LIST_REQUEST, DELETE_MODEL_VERSION_REQUEST, GET_MODEL_VERSIONS_REQUEST } from "./actionType";

export const getAllModelListRequest = () => {
    return {
      type: ALL_MODEL_LIST_REQUEST,
    };
  };
  export const getModelVersionsRequest = (payload) => {
    return {
      type: GET_MODEL_VERSIONS_REQUEST,
      payload
    };
  };

  export const deleteModelVersionRequest = (payload) => {
    return {
      type: DELETE_MODEL_VERSION_REQUEST,
      payload
    };
  };
