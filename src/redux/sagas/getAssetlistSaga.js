import {call, put, takeEvery} from 'redux-saga/effects';
import {GET_ASSETLIST_REQUEST,
     GET_ASSETLIST_FAILED, 
     GET_ASSETLIST_SUCCESS,  
    } from '../actions/actionType';
import { baseUrl } from '../apiBaseUrl/api';
import {SessionExpiration,loginToken} from '../../utils/SessionTimeOut'


function fetchAssetlist(){


     
    return fetch(`http://${baseUrl}/ams/v1/get-assets`,{
        method:"GET",
        // redirect: 'follow',
        // mode:"same-origin",
        // headers:{
        //     'Content-Type':'application/json; charset=utf-8'
        // }
        headers:{
                'Authorization': JSON.parse(sessionStorage.getItem("LoginDetails")).tokenNew,
             },
    }).then(response => response.json())
    .catch(e=>console.log(e))
}

function* getAssetRequiest(){
    try{
    const assetData = yield call(fetchAssetlist);
   
    yield put({type:GET_ASSETLIST_SUCCESS,assetData})
    }catch (e) {
        yield put({ type:GET_ASSETLIST_FAILED })
    }
    finally{
        // SessionExpiration();
        
    }
    SessionExpiration();

}


function* assetlistSaga(){
     yield takeEvery(GET_ASSETLIST_REQUEST,getAssetRequiest)
       
}

export default assetlistSaga