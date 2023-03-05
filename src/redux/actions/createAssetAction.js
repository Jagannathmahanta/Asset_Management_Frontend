import {
  ADDASSET_REQUEST,
  // GET_ASSETTYPE_REQUEST,
  GET_OWNERSHIP_REQUEST,
  GET_VENDOR_REQUEST,
  // GET_MODELNAME_REQUEST,
  // GET_VERSION_REQUEST,
} from "./actionType";

//addasset
export function createAssetRequest(payload) {
  return {
    type: ADDASSET_REQUEST,
    payload,
  };
}

//ownership
export function assetOwnershipRequest() {
  return {
    type: GET_OWNERSHIP_REQUEST,
  };
}

//vendor
export function vendorRequest() {
  return {
    type: GET_VENDOR_REQUEST,
  };
}

//asset type
// export function assetTypeRequest() {
//   return {
//     type: GET_ASSETTYPE_REQUEST,
//   };
// }

//model name
// export function modelNameRequest(payload) {
//   return {
//     type: GET_MODELNAME_REQUEST,
//     payload,
//   };
// }

//version
// export function versionRequest(payload) {
//   return {
//     type: GET_VERSION_REQUEST,
//     payload,
//   };
// }
