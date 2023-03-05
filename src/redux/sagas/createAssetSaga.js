import { call, put, takeEvery } from "redux-saga/effects";
import { baseUrl } from "../apiBaseUrl/api";
import {
  ADDASSET_FAILED,
  ADDASSET_REQUEST,
  ADDASSET_SUCCESS,
  GET_OWNERSHIP_REQUEST,
  GET_OWNERSHIP_SUCCESS,
  GET_OWNERSHIP_FAILED,
  GET_VENDOR_REQUEST,
  GET_VENDOR_SUCCESS,
  GET_VENDOR_FAILED,
} from "../actions/actionType";
import {SessionExpiration,loginToken} from '../../utils/SessionTimeOut'




function fetchCreateAsset(payload) {
  console.log("gfgfgfgfg",payload)
  console.log("chandru in create asset data", JSON.stringify({
   
    serialNumber: payload.asset.serial_number,
    configuration: payload.asset.configuration,
    assetType: parseFloat(payload.assetType_id),
    modelName: payload.asset.model_name,
    version: payload.asset.modelversion,
    assetOwner: parseFloat(payload.asset.assetOwnership),
    vendorName: parseFloat(payload.asset.vendor),
    location: parseFloat(payload.asset.location),
    DeviceName:payload.device_name 
}), );
  return fetch(`http://${baseUrl}/ams/v1/create-asset`, {
    method: "POST",
    body: JSON.stringify({
      serialNumber: payload.asset.serial_number,
      configuration: payload.asset.configuration,
      assetType: parseFloat(payload.assetType_id),
      modelName: payload.asset.model_name,
      version: payload.asset.modelversion,
      DeviceName:payload.device_name ,
      manufacturerName : payload.asset.manufacturerName,
      assetOwner: parseFloat(payload.asset.assetOwnership),
      vendorName: parseFloat(payload.asset.vendor),
      location: parseFloat(payload.asset.location),

  }),
  headers:{
    'Authorization': JSON.parse(sessionStorage.getItem("LoginDetails")).tokenNew,
 },
  })
    .then((response) => response.json())
    .catch((e) => console.log(e));
}

function* getCreateAsset({ payload }) {
  try {
    const addAssetResponse = yield call(fetchCreateAsset, payload);
    yield put({ type: ADDASSET_SUCCESS, addAssetResponse });
  } catch (e) {
    yield put({ type: ADDASSET_FAILED });
  }
  finally{
    SessionExpiration()
}
}

function fetchAssetOwnership() {
  return fetch(`http://${baseUrl}/ams/v1/get-owner`, {
    method: "GET",
    headers:{
      'Authorization': JSON.parse(sessionStorage.getItem("LoginDetails")).tokenNew,
   },
  })
    .then((response) => response.json())
    .catch((e) => console.log(e));
}

function* getAssetOwnership() {
  try {
    const assetOwnershipResponse = yield call(fetchAssetOwnership);
    yield put({ type: GET_OWNERSHIP_SUCCESS, assetOwnershipResponse });
  } catch (e) {
    yield put({ type: GET_OWNERSHIP_FAILED });
  }
  finally{
    SessionExpiration()
}
}

function fetchVendor() {
  return fetch(`http://${baseUrl}/ams/v1/get-vendor`, {
    method: "GET",
    headers:{
      'Authorization': JSON.parse(sessionStorage.getItem("LoginDetails")).tokenNew,
   },
  })
    .then((response) => response.json())
    .catch((e) => console.log(e));
}

function* getVendor() {
  try {
    const vendorResponse = yield call(fetchVendor);
    yield put({ type: GET_VENDOR_SUCCESS, vendorResponse });
  } catch (e) {
    yield put({ type: GET_VENDOR_FAILED });
  }
  finally{
    SessionExpiration()
}
}


function* createAssetSaga() {
  yield takeEvery(ADDASSET_REQUEST, getCreateAsset);
  yield takeEvery(GET_OWNERSHIP_REQUEST, getAssetOwnership);
  yield takeEvery(GET_VENDOR_REQUEST, getVendor)
}

export default createAssetSaga;
