import {
  CREATEUSER_REQUEST,
  GET_ROLE_REQUEST,
  // GET_LOCATION_REQUEST,
} from "./actionType";

export function createUserRequest(payload) {
  return {
    type: CREATEUSER_REQUEST,
    payload,
  };
}

export function getRoleRequest() {
  return {
    type: GET_ROLE_REQUEST,
  };
}

// export function getLocationRequest() {
//   return {
//     type: GET_LOCATION_REQUEST,
//   };
// }
