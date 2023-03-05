import { LOGIN_AUTHENTICATION_SUCCESS,LOGIN_AUTHENTICATION_FAILED,

    LOGOUT_AUTHENTICATION_SUCCESS,LOGOUT_AUTHENTICATION_FAILED,CLEAR_DELETED_MESSAGE

} from "../actions/actionType";



export const getLoginDetails=(state={userDetails:[]},action)=>{
    switch(action.type){
        case LOGIN_AUTHENTICATION_SUCCESS:
            return{
                ...state,
                userDetails:action.loginData,
            }
            case CLEAR_DELETED_MESSAGE:
                return{
                ...state,
                userDetails:[]
                }
        case LOGIN_AUTHENTICATION_FAILED: 
        return{
            ...state,
            userDetails:action.err,
        }    
        default:
            return state;
    }

}

export const getLogoutDetails=(state={userDetails:[]},action)=>{
    switch(action.type){
        case  LOGOUT_AUTHENTICATION_SUCCESS:
            return{
                ...state,
                userDetails:action.logoutData,
            }
        case LOGOUT_AUTHENTICATION_FAILED : 
        return{
            ...state,
            userDetails:state.err
        }    
        default:
            return state;
    }

}