import {call, put, takeEvery} from 'redux-saga/effects';
import {LOGIN_AUTHENTICATION_FAILED, LOGIN_AUTHENTICATION_REQUEST, LOGIN_AUTHENTICATION_SUCCESS,
    LOGOUT_AUTHENTICATION_REQUEST, LOGOUT_AUTHENTICATION_SUCCESS,LOGOUT_AUTHENTICATION_FAILED 

} from '../actions/actionType';
import {SessionExpiration} from '../../utils/SessionTimeOut'
import { baseUrl } from '../apiBaseUrl/api';


function FetchLogin(payload){
    return fetch(`http://${baseUrl}/ams/v1/login`,{
        method:"POST",
        mode: 'cors',
        body: JSON.stringify(payload),
        headers:{
            'Content-Type':'application/json; charset=utf-8'
        }
    }).then(response => response.json())
    .catch(e=>console.log(e))
}
 
function* getLoginRequiest({payload}){
    try{
    const loginData = yield call(FetchLogin,payload);
    yield put({type:LOGIN_AUTHENTICATION_SUCCESS,loginData})
    localStorage.setItem("LoginDetails",JSON.stringify(loginData))
    sessionStorage.setItem("LoginDetails",JSON.stringify(loginData))
    }catch (err) {
        yield put({ type:LOGIN_AUTHENTICATION_FAILED ,err})
    }
    finally{
        SessionExpiration();
    }
}

function FetchLogout(payload){
    return fetch(`http://${baseUrl}/ams/v1/logout`,{
        method:"GET",
        mode: 'cors',
        // body: JSON.stringify(payload),
        headers:{
             // 'Content-Type':'application/json; charset=utf-8',
             'Authorization':JSON.parse(sessionStorage.getItem("LoginDetails")).tokenNew
        }
    }).then(response => response.json())
    .catch(e=>console.log(e))
}
 
function* getLogoutRequiest({payload}){
    try{
    const logoutData = yield call(FetchLogout,payload);
    yield put({type:LOGOUT_AUTHENTICATION_SUCCESS,logoutData})
    // localStorage.removeItem("LogoutDetails",JSON.stringify(logoutData))
    // sessionStorage.setItem("LogoutDetails",JSON.stringify(logoutData))

    }catch (e) {
        yield put({ type:LOGOUT_AUTHENTICATION_FAILED})
    }
    finally{
        //   SessionExpiration();
    }
}

function* loginSaga(){
     yield takeEvery(LOGIN_AUTHENTICATION_REQUEST,getLoginRequiest)
     yield takeEvery(LOGOUT_AUTHENTICATION_REQUEST,getLogoutRequiest)
}

export default loginSaga