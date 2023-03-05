import { call, put, takeEvery } from 'redux-saga/effects';
import {
    ASSET_TRACKINGSERIAL_REQUEST,
    ASSET_TRACKINGSERIAL_SUCCESS,
    ASSET_TRACKINGSERIAL_FAILED
} from '../actions/actionType';
import { baseUrl } from '../apiBaseUrl/api';
import {SessionExpiration,loginToken} from '../../utils/SessionTimeOut'





function fetchAssetTracking(payload) {
    return fetch(`http://${baseUrl}/ams/v1/get-assets-by-search/${payload}`, {
      method: "GET",
      headers:{
        'Authorization': JSON.parse(sessionStorage.getItem("LoginDetails")).tokenNew,
     },
    })
      .then((response) => response.json())
      .catch((e) => console.log(e));
  }
  
  function* getAssetTreacking({ payload }) {
    try {
      const assetTrackingDetails = yield call(fetchAssetTracking, payload);
      yield put({ type: ASSET_TRACKINGSERIAL_SUCCESS, assetTrackingDetails });
    } catch (e) {
      yield put({ type: ASSET_TRACKINGSERIAL_FAILED });
    }
    finally{
      SessionExpiration()
  }
  }


  function* assetTrackingSaga() {
    yield takeEvery(ASSET_TRACKINGSERIAL_REQUEST, getAssetTreacking);
  }
  
  export default assetTrackingSaga;