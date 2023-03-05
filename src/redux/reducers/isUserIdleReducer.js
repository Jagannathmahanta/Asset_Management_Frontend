import { IS_USER_IDLE } from "../actions/actionType"



export const getIsUserIdleState = (state={isUserIdle:false},action)=>{
    
    switch(action.type){
        case IS_USER_IDLE:
            return{
                ...state,
                isUserIdle:action.payload,
            }
            default:
                return state;   
    }
}