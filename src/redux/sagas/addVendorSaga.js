import { call, put, takeEvery } from "redux-saga/effects";
import {
    ADD_VENDOR_FAILED,
    ADD_VENDOR_REQUEST,
  ADD_VENDOR_SUCCESS ,
  GET_LOCATION_REQUEST,
  GET_LOCATION_SUCCESS,
  GET_LOCATION_FAILED
} from "../actions/actionType";
import { baseUrl } from "../apiBaseUrl/api";
import {SessionExpiration,loginToken} from '../../utils/SessionTimeOut'

// import { getVendorLocation } from "../actions/addVendorAction";



function fetchaddVendor(payload) {
  return fetch(`http://${baseUrl}/ams/v1/add-vendor`, {
    method: "POST",    
    body: JSON.stringify({
      email: payload.email,
      vendorName: payload.vendor_name,
      location: parseFloat(payload.location),
      mobileNumber:parseInt(payload.mobile_number),
    }),
   
    headers:{
      'Authorization': JSON.parse(sessionStorage.getItem("LoginDetails")).tokenNew,
   },
  })
    .then((response) => response.json())
    .catch((e) => console.log(e));
}

function* addVendorRequest({ payload }) {
  try {
    const addVendorData = yield call( fetchaddVendor, payload);
    yield put({ type: ADD_VENDOR_SUCCESS , addVendorData });
  } catch (e) {
    yield put({ type: ADD_VENDOR_FAILED });
  }
  finally{
    SessionExpiration()
}
}


function* addVendorSaga() {
  yield takeEvery( ADD_VENDOR_REQUEST , addVendorRequest);
}

export default addVendorSaga;
