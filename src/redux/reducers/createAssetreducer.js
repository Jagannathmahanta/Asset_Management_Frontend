import {
  ADDASSET_SUCCESS,
  ADDASSET_FAILED,
  GET_OWNERSHIP_SUCCESS,
  GET_OWNERSHIP_FAILED,
  GET_VENDOR_SUCCESS,
  GET_VENDOR_FAILED,
  CLEAR_DELETED_MESSAGE
  // GET_ASSETTYPE_SUCCESS,
  // GET_ASSETTYPE_FAILED,
  // GET_MODELNAME_SUCCESS,
  // GET_MODELNAME_FAILED,
  // GET_VERSION_SUCCESS,
  // GET_VERSION_FAILED,
} from "../actions/actionType";

//createasset
export const createAsset = (state = { createdDetails: [] }, action) => {
  switch (action.type) {
    case ADDASSET_SUCCESS:
      return {
        ...state,
        createdDetails: action.addAssetResponse,
      };
      case CLEAR_DELETED_MESSAGE:
        return{
        ...state,
        createdDetails:[]
        }
    case ADDASSET_FAILED:
      return {
        ...state,
        createdDetails: state.addAssetResponse,
      };
    default:
      return state;
  }
};

//ownership
export const assetOwnerShip = (state = { assetOwnership: [] }, action) => {
  switch (action.type) {
    case GET_OWNERSHIP_SUCCESS:
      return {
        ...state,
        assetOwnership: action.assetOwnershipResponse,
      };
    case GET_OWNERSHIP_FAILED:
      return {
        ...state,
        assetOwnership: action.assetOwnershipResponse,
      };
    default:
      return state;
  }
};

//vendor
export const vendor = (state = { vendor: [] }, action) => {
  switch (action.type) {
    case GET_VENDOR_SUCCESS:
      return {
        ...state,
        vendor: action.vendorResponse,
      };
    case GET_VENDOR_FAILED:
      return {
        ...state,
        vendor: action.vendorResponse,
      };
    default:
      return state;
  }
};




