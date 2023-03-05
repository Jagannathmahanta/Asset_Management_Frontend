import {
  CREATEUSER_SUCCESS,
  CREATEUSER_FAILED,
  GET_ROLE_SUCCESS,
  GET_ROLE_FAILED,
  CLEAR_DELETED_MESSAGE
  // GET_LOCATION_SUCCESS,
  // GET_LOCATION_FAILED,
} from "../actions/actionType";

//createuser
export const createUser = (state = { createUser: [] }, action) => {
  switch (action.type) {
    case CREATEUSER_SUCCESS:
      return {
        ...state,
        createUser: action.userDetails,
      };
      case CLEAR_DELETED_MESSAGE:
      return{
      ...state,
      createUser:[]
      }
    case CREATEUSER_FAILED:
      return {
        ...state,
        createUser: state.userDetails,
      };
    default:
      return state;
  }
};

//role
export const role = (state = { roleDetails: [] }, action) => {
  switch (action.type) {
    case GET_ROLE_SUCCESS:
      return {
        ...state,
        roleDetails: action.roleDetails,
      };
    case GET_ROLE_FAILED:
      return {
        ...state,
        roleDetails: action.roleDetails,
      };
    default:
      return state;
  }
};

