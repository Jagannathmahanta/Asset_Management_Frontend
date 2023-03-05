import { LOGIN_AUTHENTICATION_REQUEST ,LOGOUT_AUTHENTICATION_REQUEST} from "./actionType";

export const loginRequiest=(payload)=>{
    return {
        type:LOGIN_AUTHENTICATION_REQUEST,
        payload
    }
}

export const logoutRequiest=(payload)=>{
    return {
        type:LOGOUT_AUTHENTICATION_REQUEST,
        payload
    }
}