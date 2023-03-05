import {
    ADD_VENDOR_SUCCESS,
    ADD_VENDOR_FAILED,
    CLEAR_DELETED_MESSAGE
  } from "../actions/actionType";
  
  export const addVendorDetails = (state = { addVenderDetails: [] }, action) => {
    switch (action.type) {
      case ADD_VENDOR_SUCCESS:
        return {
          ...state,
          addVenderDetails: action.addVendorData,
        };
        case CLEAR_DELETED_MESSAGE:
      return{
      ...state,
      addVenderDetails:[]
      }
      case ADD_VENDOR_FAILED:
        return {
          ...state,
          addVenderDetails: state.initialState,
        };
      default:
        return state;
    }
  };
  

  