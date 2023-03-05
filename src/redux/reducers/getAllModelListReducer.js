import { ALL_MODEL_LIST_SUCCESS, ALL_MODEL_LIST_FAILED, GET_MODEL_VERSIONS_SUCCESS, GET_MODEL_VERSIONS_FAILED, DELETE_MODEL_VERSION_SUCCESS, DELETE_MODEL_VERSION_FAILED ,CLEAR_DELETED_MESSAGE} from "../actions/actionType";



export const getAllModelDetails=(state={allModelDetails:[]},action)=>{
    switch(action.type){
        case ALL_MODEL_LIST_SUCCESS:
            return{
                ...state,
                allModelDetails:action.allModelData,
            }
        case ALL_MODEL_LIST_FAILED: 
        return{
            ...state,
            allModelDetails:action.err
        }    
        default:
            return state;
    }

}

export const getModelVersionDetails=(state={ModelVersionDetails:[]},action)=>{
    switch(action.type){
        case GET_MODEL_VERSIONS_SUCCESS:
            return{
                ...state,
                ModelVersionDetails:action.ModelVersionData,
            }
        case GET_MODEL_VERSIONS_FAILED: 
        return{
            ...state,
            ModelVersionDetails:action.err
        }    
        default:
            return state;
    }

}

export const getDeletedModelVersionDetails=(state={deletedModelVersionDetails:[]},action)=>{
    switch(action.type){
        case DELETE_MODEL_VERSION_SUCCESS:
            return{
                ...state,
                deletedModelVersionDetails:action.DeletedModelVersionData,
            }
            case CLEAR_DELETED_MESSAGE:
          return{
          ...state,
          deletedModelVersionDetails:[]
          }
        case DELETE_MODEL_VERSION_FAILED: 
        return{
            ...state,
            deletedModelVersionDetails:action.err
        }    
        default:
            return state;
    }

}