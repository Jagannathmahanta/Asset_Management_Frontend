import {
  GET_USERLIST_SUCCESS,
  GET_USERLIST_FAILED,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  DELETE_USER_SUCCESS,
 DELETE_USER_FAILED,

  GET_AVALABLEASSET_SUCCESS,
  GET_AVALABLEASSET_FAILED,
  ADD_USERASSET_SUCCESS,
  ADD_USERASSET_FAILED,
  DELETE_USERASSET_SUCCESS,
  DELETE_USERASSET_FAILED,
  GET_ASSIGNASSET_SUCCESS,
  GET_ASSIGNASSET_FAILED,

  CLEAR_DELETED_MESSAGE

} from "../actions/actionType";

export const getUserDetails = (state = { userDetails: [] }, action) => {
  switch (action.type) { 
    case GET_USERLIST_SUCCESS:
      return {
        ...state,
        userDetails: action.userListData,
      };
    case GET_USERLIST_FAILED:
      return {
        ...state,
        userDetails: state.initialState,
      };
    default:
      return state;
  }
};


export const updateUserDetails = (state = { updatedDetails: [] }, action) => {
  switch (action.type) {
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        updatedDetails: action.updatedUserData,
      };
      case CLEAR_DELETED_MESSAGE:
        return{
        ...state,
        updatedDetails:[]
        }
    case UPDATE_USER_FAILED:
      return {
        ...state,
        updatedDetails: action.err,
      };
    default:
      return state;
  }
};

export const deleteUserDetails = (state = { deletedDetails: [] }, action) => {
  switch (action.type) {
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        deletedDetails: action.deleteUserData,
      };
      case CLEAR_DELETED_MESSAGE:
        return{
        ...state,
        deletedDetails:[]
        }
    case DELETE_USER_FAILED:
      return {
        ...state,
        deletedDetails: state.initialState,
      };
    default:
      return state;
  }
};


//


  
export const getAvalableAssetData=(state={avalableAssetData:[]},action)=>{
  switch(action.type){
      
      case GET_AVALABLEASSET_SUCCESS:
          return{
              ...state,
              avalableAssetData:action.avalableAsset,
          }
      case GET_AVALABLEASSET_FAILED:
      return{
          ...state,
          avalableAssetData:state.initialState
      }    
      default:
          return state;
  }

}


export const addUserAssetDetails = (state = { addUserAssetDetails: [] }, action) => {
switch (action.type) {
  case ADD_USERASSET_SUCCESS:
    return {
      ...state,
      addUserAssetDetails: action.updateAssetUser,
    };
    case CLEAR_DELETED_MESSAGE:
      return{
      ...state,
      addUserAssetDetails:[]
      }
  case ADD_USERASSET_FAILED:
    return {
      ...state,
      addUserAssetDetails: state.initialState,
    };
  default:
    return state;
}
};


export const deleteAssetFromUser = (state = { deletedAsset: [] }, action) => {
  switch (action.type) {
    case DELETE_USERASSET_SUCCESS:
      return {
        ...state,
        deletedAsset: action.deleteAssetData,
      };
      case CLEAR_DELETED_MESSAGE:
      return{
      ...state,
      deletedAsset:[]
      }
    case DELETE_USERASSET_FAILED:
      return {
        ...state,
        deletedAsset: state.initialState,
      };
    default:
      return state;
  }
};


export const getAssetOfUser = (state = { assignAsset: [] }, action) => {
    switch (action.type) {
      case GET_ASSIGNASSET_SUCCESS:
        return {
          ...state,
          assignAsset: action.assignData,
        };
      case GET_ASSIGNASSET_FAILED:
        return {
          ...state,
          assignAsset: state.initialState,
        };
      default:
        return state;
    }
  };
