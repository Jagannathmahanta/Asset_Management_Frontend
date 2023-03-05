import { IS_USER_IDLE } from "./actionType";

export const isUserIdle=(payload)=>{
    return {
        type:IS_USER_IDLE,
        payload
    }
}