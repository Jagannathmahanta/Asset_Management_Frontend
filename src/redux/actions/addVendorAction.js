import {
  ADD_VENDOR_REQUEST, 
} from "./actionType";

export const addVendorRequest = (payload) => {
  return {
    type: ADD_VENDOR_REQUEST,
    payload
  };
};

