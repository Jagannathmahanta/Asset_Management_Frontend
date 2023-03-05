import { GET_ASSETLIST_SUCCESS,
    
        GET_ASSETLIST_FAILED,
        
       
} from "../actions/actionType";



export const getAssetlistData=(state={assetListData:[]},action)=>{
    switch(action.type){
        case GET_ASSETLIST_SUCCESS:
            return{
                ...state,
                assetListData:action.assetData,
            }
        case GET_ASSETLIST_FAILED:
        return{
            ...state,
            assetListData:state.initialState
        }    
        default:
            return state;
    }

}







