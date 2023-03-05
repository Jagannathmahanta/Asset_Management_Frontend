import {call, put, takeEvery} from 'redux-saga/effects';
import {GET_VENDOR_FAILED,
     GET_VENDOR_SUCCESS, 
     GET_VENDOR_REQUEST,
     DELETE_VENDOR_REQUEST,
      DELETE_VENDOR_FAILED,
      
      DELETE_VENDOR_SUCCESS,
      GET_LOCATION_REQUEST, 
      GET_LOCATION_FAILED,
       GET_LOCATION_SUCCESS
    } from '../actions/actionType';
import { baseUrl } from '../apiBaseUrl/api';
import {SessionExpiration,loginToken} from '../../utils/SessionTimeOut'


function fetchVendorList(){
    return fetch(`http://${baseUrl}/ams/v1/get-vendor`,{
        method:"GET",
       
        headers:{
            'Authorization': JSON.parse(sessionStorage.getItem("LoginDetails")).tokenNew,
         },
    }).then(response => response.json())
    .catch(e=>console.log(e))
}

function* getVendorRequest(){
    try{
    const vendorData = yield call(fetchVendorList);
    
    yield put({type:GET_VENDOR_SUCCESS,vendorData})
    }catch (e) {
        yield put({ type:GET_VENDOR_FAILED })
    }
    finally{
        SessionExpiration()
    }
}




function fetchVendor(payload){
    return fetch(`http://${baseUrl}/ams/v1/deleteVendor/${payload}`,{
         method: "DELETE",
    body: JSON.stringify({
        vendor_status: Boolean(false),
    }),
    headers:{
        'Authorization': JSON.parse(sessionStorage.getItem("LoginDetails")).tokenNew,
     },
    }).then(response => response.json())
    .catch(e=>console.log(e))
}

function* vendorRequiest({payload}){
    try{
    const deleteVendor = yield call(fetchVendor,payload);
    yield put({type:DELETE_VENDOR_SUCCESS,deleteVendor})
    }catch (e) {
        yield put({ type:DELETE_VENDOR_FAILED })
    }
    finally{
        SessionExpiration()
    }
}




function fetchLocation(){
    return fetch(`http://${baseUrl}/ams/v1/get-location`,{
        method:"GET",
        headers:{
            'Authorization': JSON.parse(sessionStorage.getItem("LoginDetails")).tokenNew,
         },
    }).then(response => response.json())
    .catch(e=>console.log(e))
}

function* getLocationRequest(){
    try{
    const locationData = yield call(fetchLocation);
    yield put({type:GET_LOCATION_SUCCESS,locationData})
    }catch (e) {
        yield put({ type:GET_LOCATION_FAILED })
    }
    finally{
        SessionExpiration()
    }
}



function* getVendorSaga(){
     yield takeEvery( GET_VENDOR_REQUEST,getVendorRequest)
     yield takeEvery(DELETE_VENDOR_REQUEST,vendorRequiest)
     yield takeEvery( GET_LOCATION_REQUEST,getLocationRequest)
}

export default getVendorSaga;