import {call, put, takeEvery} from 'redux-saga/effects';
import {GET_ASSETMODEL_REQUEST,
     GET_ASSETMODEL_FAILED, 
     GET_ASSETMODEL_SUCCESS,
     CREATE_MODEL_REQUEST, 
     CREATE_MODEL_FAILED,
      CREATE_MODEL_SUCCESS,
      GET_VERSIONTYPE_REQUEST,
       GET_VERSIONTYPE_FAILED, 
       GET_VERSIONTYPE_SUCCESS,
       GET_ASSETBYTYPE_FAILED,
       GET_ASSETBYTYPE_SUCCESS,
       GET_ASSETBYTYPE_REQUEST,
       GET_MANUFACTURER_REQUEST,
       GET_MANUFACTURER_SUCCESS,
       GET_MANUFACTURER_FAILED
    
    } from '../actions/actionType';


import { baseUrl } from '../apiBaseUrl/api';
import {SessionExpiration,loginToken} from '../../utils/SessionTimeOut'



    function fetchAsset(){
        return fetch(`http://${baseUrl}/ams/v1/get-asset-type`,{
            method:"GET",
            headers:{
                'Authorization': JSON.parse(sessionStorage.getItem("LoginDetails")).tokenNew,
             },
        }).then(response => response.json())
        .catch(e=>console.log(e))
    }
    
    function* getAssetTypeRequiest(){
        try{
        const assetType = yield call(fetchAsset);
        yield put({type:GET_ASSETBYTYPE_SUCCESS,assetType})
        }catch (e) {
            yield put({ type:GET_ASSETBYTYPE_FAILED })
        }
        finally{
            SessionExpiration()
        }
    }
    
function fetchModel(payload){
   
    return fetch(`http://${baseUrl}/ams/v1/get-asset-model/${payload}`,{
        method:"GET",
        headers:{
            'Authorization': JSON.parse(sessionStorage.getItem("LoginDetails")).tokenNew,
         },
    }).then(response => response.json())
    .catch(e=>console.log(e))
}

function* getModelRequiest({payload}){
    try{
    const modelData = yield call(fetchModel,payload);
    yield put({type:GET_ASSETMODEL_SUCCESS,modelData})
    console.log("model Data",modelData)
    }catch (e) {
        yield put({ type:GET_ASSETMODEL_FAILED })
    }
    finally{
        SessionExpiration()
    }
}





function postModel(payload){
    return fetch(`http://${baseUrl}/ams/v1/create-model`,{
        method:"POST",
        body:JSON.stringify({
            ModelName: payload.modelName,
		    Version: payload.version,
		    AssetType: payload.asset_type
        }),
        headers:{
            'Authorization': JSON.parse(sessionStorage.getItem("LoginDetails")).tokenNew,
         },
    }).then(response => response.json())
    .catch(e=>console.log(e))
}

function* postModelRequiest({payload}){
    try{
    const model= yield call(postModel,payload);
    yield put({type:CREATE_MODEL_SUCCESS,model})
    }catch (e) {
        yield put({ type:CREATE_MODEL_FAILED })
    }
    finally{
        SessionExpiration()
    }
}




function fetchVersion(payload){
        return fetch(`http://${baseUrl}/ams/v1/get-version/${payload}`,{
            method:"GET",
            headers:{
                'Authorization': JSON.parse(sessionStorage.getItem("LoginDetails")).tokenNew,
             },
        }).then(response => response.json())
        .catch(e=>console.log(e))
    }
    
    function* getVersionRequiest({payload}){
        try{
        const versionData = yield call(fetchVersion,payload);
        yield put({type:GET_VERSIONTYPE_SUCCESS,versionData})
        }catch (e) {
            yield put({ type:GET_VERSIONTYPE_FAILED })
        }
        finally{
            SessionExpiration()
        }
    }


    function fetchgetModel(payload) {
        console.log("abc", payload);
        return fetch(`http://${baseUrl}/ams/v1/get-manufacturer/${payload}`, {
          method: "GET",
          headers:{
            'Authorization': JSON.parse(sessionStorage.getItem("LoginDetails")).tokenNew,
         },
        })
          .then((response) => response.json())
          .catch((e) => console.log(e));
      }
      
      function* getManufacturerRequiest({ payload }) {
        try {
          const manufacturerData = yield call(fetchgetModel, payload);
          yield put({ type: GET_MANUFACTURER_SUCCESS, manufacturerData });
        } catch (e) {
          yield put({ type: GET_MANUFACTURER_FAILED });
        }
        finally{
            SessionExpiration()
        }
      }
    
    


function* assetModelSaga(){
     yield takeEvery(GET_ASSETMODEL_REQUEST,getModelRequiest)
     yield takeEvery(CREATE_MODEL_REQUEST,postModelRequiest)
     yield takeEvery(GET_VERSIONTYPE_REQUEST,getVersionRequiest)
     yield takeEvery(GET_ASSETBYTYPE_REQUEST,getAssetTypeRequiest)
  yield takeEvery(GET_MANUFACTURER_REQUEST, getManufacturerRequiest);

}
//Model Version


export default assetModelSaga