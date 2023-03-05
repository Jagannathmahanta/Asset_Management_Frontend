import { CHANGE_PASSWORD_REQUEST } from './actionType';


export const passwordRequest = (payload) => {
    console.log("cahnge pass word action", payload);
    return {
      type: CHANGE_PASSWORD_REQUEST,
      payload,
    };
  }