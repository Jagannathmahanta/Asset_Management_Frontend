import { ASSET_TRACKINGSERIAL_REQUEST } from "./actionType";
  
  export function assetTrackingRequest(payload) {
    return {
      type: ASSET_TRACKINGSERIAL_REQUEST,
      payload,
    };
  }