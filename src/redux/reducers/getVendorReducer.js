import { GET_VENDOR_SUCCESS,
    GET_VENDOR_FAILED,
    DELETE_VENDOR_FAILED,
     DELETE_VENDOR_SUCCESS,
     GET_LOCATION_SUCCESS,
     GET_LOCATION_FAILED,
     CLEAR_DELETED_MESSAGE
} from "../actions/actionType";



export const getVendor=(state={vendorDetails:[]},action)=>{
  console.log("7777777")
    switch(action.type){
        case GET_VENDOR_SUCCESS:
            return{
                ...state,
                vendorDetails:action.vendorData,
            }
        case GET_VENDOR_FAILED:
        return{
            ...state,
            vendorDetails:state.initialState
        }    
        default:
            return state;
    }

};


export const deleteVendorDetails = (state = { deletedDetails: [] }, action) => {
    switch (action.type) {
      case DELETE_VENDOR_SUCCESS:
        return {
          ...state,
          deletedDetails: action.deleteVendor,
        };
      case DELETE_VENDOR_FAILED:
        return {
          ...state,
          deletedDetails: state.initialState,
        }
        case CLEAR_DELETED_MESSAGE:
          return{
          ...state,
          deletedDetails:[]
          }
      default:
        return state;
    }
  };

  



export const getLocationDetails=(state={locationDetails:[]},action)=>{
    switch(action.type){
        case GET_LOCATION_SUCCESS:
            return{
                ...state,
                locationDetails:action.locationData,
            }
        case GET_LOCATION_FAILED:
        return{
            ...state,
            locationDetails:state.initialState
        }    
        default:
            return state;
    }

}