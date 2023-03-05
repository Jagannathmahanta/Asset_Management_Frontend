import {
    CLEAR_DELETED_MESSAGE, 
  } from "./actionType";
  
  export const clearMessageRequest = () => {
    return {
      type: CLEAR_DELETED_MESSAGE,
    };
  };