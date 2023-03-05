import { ASSET_TRACKINGSERIAL_SUCCESS, ASSET_TRACKINGSERIAL_FAILED } from "../actions/actionType";


//Asset Tracking
export const assetTracking = (state = { assetTracking: [] }, action) => {
    switch (action.type) {
      case ASSET_TRACKINGSERIAL_SUCCESS:
        return {
          ...state,
          assetTracking: action.assetTrackingDetails,
        };
      case ASSET_TRACKINGSERIAL_FAILED:
        return {
          ...state,
          assetTracking: action.assetTrackingDetails,
        };
      default:
        return state;
    }
  };