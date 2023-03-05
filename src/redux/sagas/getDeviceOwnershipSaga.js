import {call, put, takeEvery} from 'redux-saga/effects';
import {GET_DEVICEOWNERSHIP_REQUEST,
    GET_DEVICEOWNERSHIP_SUCCESS, 
     GET_DEVICEOWNERSHIP_FAILED,  
    } from '../actions/actionType';
import { baseUrl } from '../apiBaseUrl/api';
import {SessionExpiration,loginToken} from '../../utils/SessionTimeOut'




function fetchDeviceOwnership(){
    return fetch(`http://${baseUrl}/ams/v1/get-asset-details-by-locations`,{
        method:"GET",
        headers:{
            'Authorization': JSON.parse(sessionStorage.getItem("LoginDetails")).tokenNew,
         },
    }).then(response => response.json())
    .catch(e=>console.log(e))
}

function* getDeviceOwnershipRequiest(){
    try{
    const modelData = yield call(fetchDeviceOwnership);
   
    yield put({type: GET_DEVICEOWNERSHIP_SUCCESS,modelData})
    console.log("device aa",modelData)
    }catch (e) {
        yield put({ type: GET_DEVICEOWNERSHIP_FAILED})
    }
    finally{
        SessionExpiration()
    }
}


function* DeviceOwnershipSaga(){
     yield takeEvery(GET_DEVICEOWNERSHIP_REQUEST,getDeviceOwnershipRequiest)
       
}

export default DeviceOwnershipSaga;