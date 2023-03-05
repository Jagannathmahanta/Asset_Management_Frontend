import {
    GET_DEVICEOWNERSHIP_SUCCESS,
    GET_DEVICEOWNERSHIP_FAILED
  } from "../actions/actionType";
  
  export const getDeviceOwnershipDetails = (state = { getDeviceOwnershipDetails : [] }, action) => {
    console.log("getDeviceOwnershipDetailsss",action)

    switch (action.type) {
      case GET_DEVICEOWNERSHIP_SUCCESS:
        return {
          ...state,
          getDeviceOwnershipDetails : action. modelData,
        };
      case GET_DEVICEOWNERSHIP_FAILED:
        return {
          ...state,
          getDeviceOwnershipDetails : state.initialState,
        };
      default:
        return state;
    }

  };
  

  