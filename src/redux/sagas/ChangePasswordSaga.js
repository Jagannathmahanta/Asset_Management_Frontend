import { put, call, takeEvery } from 'redux-saga/effects';
import { CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILED } from '../actions/actionType';
import { baseUrl } from '../apiBaseUrl/api';


function fetchPassword(payload) {
    console.log("fetch pass", payload);
    return fetch(`http://${baseUrl}/ams/v1/update-password/${payload.user_id}`,{
        method:"PUT",
        // mode: 'cros',
        // body: JSON.stringify(payload),
        body: JSON.stringify({
            oldPassword: payload.oldPassword,
            newPassword: payload.newPassword
        }),
        headers: {
            'Authorization':JSON.parse(sessionStorage.getItem("LoginDetails")).tokenNew
        }
    }).then(response => response.json())
    .catch((e)=>console.log(e))
}


function* getchangePassword({payload}) {
    console.log("chandru pass at Saga", payload);
    try{
        const password = yield call(fetchPassword, payload);
        yield put ({ type: CHANGE_PASSWORD_SUCCESS, password})  
        // console.log("chandru pass", password);      
    } catch (e) {
        yield put({ type: CHANGE_PASSWORD_FAILED})
    }
}


function* changePasswordSaga(){
    yield takeEvery(CHANGE_PASSWORD_REQUEST, getchangePassword)
}

export default changePasswordSaga;