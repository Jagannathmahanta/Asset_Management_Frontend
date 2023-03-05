import { GET_ASSETMODEL_SUCCESS,
    GET_ASSETMODEL_FAILED ,
    CREATE_MODEL_SUCCESS,
    CREATE_MODEL_FAILED,
    GET_VERSIONTYPE_SUCCESS,
    GET_VERSIONTYPE_FAILED,
    GET_ASSETBYTYPE_SUCCESS,
    GET_ASSETBYTYPE_FAILED,
    CLEAR_DELETED_MESSAGE,
    GET_MANUFACTURER_SUCCESS,
    GET_MANUFACTURER_FAILED

} from "../actions/actionType";



export const getAssetType=(state={assetDetails:[]},action)=>{
    switch(action.type){
        case GET_ASSETBYTYPE_SUCCESS:
            return{
                ...state,
                assetDetails:action.assetType,
            }
        case GET_ASSETBYTYPE_FAILED:
        return{
            ...state,
            assetDetails:state.initialState
        }    
        default:
            return state;
    }

}

export const getModelDetails=(state={modelDetails:[]},action)=>{
    switch(action.type){
        case GET_ASSETMODEL_SUCCESS:
            return{
                ...state,
                modelDetails:action.modelData,
            }
        case GET_ASSETMODEL_FAILED:
        return{
            ...state,
            modelDetails:state.initialState
        }    
        default:
            return state;
    }

}


export const createModel=(state={modelDetails:[]},action)=>{
    switch(action.type){
        case CREATE_MODEL_SUCCESS:
            return{
                ...state,
                modelDetails:action.model,
            }
            case CLEAR_DELETED_MESSAGE:
      return{
      ...state,
      modelDetails:[]
      }
        case CREATE_MODEL_FAILED:
        return{
            ...state,
            modelDetails:state.initialState
        }    
        default:
            return state;
    }
}



export const getVersionType=(state={versionDetails:[]},action)=>{
    switch(action.type){
        case GET_VERSIONTYPE_SUCCESS:
            return{
                ...state,
                versionDetails:action.versionData,
            }
        case GET_VERSIONTYPE_FAILED:
        return{
            ...state,
            versionDetails:state.initialState
        }    
        default:
            return state;
    }

}

export const getManufacturerName=(state={manufacturerDetails:[]},action)=>{
    console.log("manufacturerDetails",state)  
      switch(action.type){
        case  GET_MANUFACTURER_SUCCESS:
            return{
                ...state,
                manufacturerDetails:action.manufacturerData,
            }
        case GET_MANUFACTURER_FAILED:
        return{
            ...state,
            manufacturerDetails:action.initialState
        }    
        default:
            return state;
    }

}