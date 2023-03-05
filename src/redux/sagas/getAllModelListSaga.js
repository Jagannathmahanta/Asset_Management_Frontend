import {call, put, takeEvery} from 'redux-saga/effects';
import {ALL_MODEL_LIST_FAILED, ALL_MODEL_LIST_REQUEST, ALL_MODEL_LIST_SUCCESS, DELETE_MODEL_VERSION_FAILED, DELETE_MODEL_VERSION_REQUEST, DELETE_MODEL_VERSION_SUCCESS, GET_MODEL_VERSIONS_FAILED, GET_MODEL_VERSIONS_REQUEST, GET_MODEL_VERSIONS_SUCCESS} from '../actions/actionType';
import { baseUrl } from '../apiBaseUrl/api';
import {SessionExpiration,loginToken} from '../../utils/SessionTimeOut'



function FetchAllModels(){
    return fetch(`http://${baseUrl}/ams/v1/get-model`,{
        method:"GET",
        headers:{
            'Authorization': JSON.parse(sessionStorage.getItem("LoginDetails")).tokenNew,
         },
    }).then(response => response.json())
    .catch(e=>console.log(e))
}
 
function* getAllModelListRequiest(){
    try{
    const allModelData = yield call(FetchAllModels);
    yield put({type:ALL_MODEL_LIST_SUCCESS,allModelData})
    console.log("model",allModelData)
    }catch (err) {
        yield put({ type:ALL_MODEL_LIST_FAILED ,err})
    }
    finally{
        SessionExpiration()
    }
}


function FetchModelVersion(payload){
    console.log("shubham",payload)
    return fetch(`http://${baseUrl}/ams/v1/get-version`,{
        method:"POST",
        body: JSON.stringify({
            ManufacturerName:payload.manufacturerName,
            modelName:payload.modelName,
          }),
          headers:{
            'Authorization': JSON.parse(sessionStorage.getItem("LoginDetails")).tokenNew,
         },
    }).then(response => response.json())
    .catch(e=>console.log(e))
}
 
function* getModelVersionsRequiest({payload}){
    try{
    const ModelVersionData = yield call(FetchModelVersion,payload);
    yield put({type:GET_MODEL_VERSIONS_SUCCESS,ModelVersionData})
    console.log("version",ModelVersionData)
    }catch (err) {
        yield put({ type:GET_MODEL_VERSIONS_FAILED ,err})
    }
    finally{
        SessionExpiration()
    }
}


function FetchDeleteModelVersion(payload){
    const verion = payload.verionById
    return fetch(`http://${baseUrl}/ams/v1/delete-model/${payload}`,{
        method:"DELETE",
        headers:{
            'Authorization': JSON.parse(sessionStorage.getItem("LoginDetails")).tokenNew,
         },
    }).then(response => response.json())
    .catch(e=>console.log(e))
}
 
function* deleteModelVersion({payload}){
    try{
    const DeletedModelVersionData = yield call(FetchDeleteModelVersion,payload);
    yield put({type:DELETE_MODEL_VERSION_SUCCESS,DeletedModelVersionData})
    }catch (err) {
        yield put({ type:DELETE_MODEL_VERSION_FAILED ,err})
    }
    finally{
        SessionExpiration()
    }
}


function* allModelListSaga(){
     yield takeEvery(ALL_MODEL_LIST_REQUEST ,getAllModelListRequiest)
     yield takeEvery(GET_MODEL_VERSIONS_REQUEST,getModelVersionsRequiest)
     yield takeEvery(DELETE_MODEL_VERSION_REQUEST,deleteModelVersion)
}

export default allModelListSaga