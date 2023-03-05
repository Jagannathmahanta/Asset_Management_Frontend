import { call, put, takeEvery } from "redux-saga/effects";
import { baseUrl } from "../apiBaseUrl/api";
import {
  CREATEUSER_REQUEST,
  CREATEUSER_SUCCESS,
  CREATEUSER_FAILED,
  GET_ROLE_REQUEST,
  GET_ROLE_SUCCESS,
  GET_ROLE_FAILED,
  // GET_LOCATION_REQUEST,
  // GET_LOCATION_SUCCESS,
  // GET_LOCATION_FAILED,
} from "../actions/actionType";
import {SessionExpiration,loginToken} from '../../utils/SessionTimeOut'




function createUser(payload) {
  console.log("User data in create user", JSON.stringify({
    email: payload.email,
    employeeId: parseFloat(payload.employee_id),
    username: payload.username,
    location: parseFloat(payload.location),
    mobileNumber: parseFloat(payload.mobile_number),
    role: parseFloat(payload.role),
  }));
  return fetch(`http://${baseUrl}/ams/v1/create-user`, {
    method: "POST",
    body: JSON.stringify({
      email: payload.email,
      employeeId: parseFloat(payload.employee_id),
      username: payload.username,
      location: parseFloat(payload.location),
      mobileNumber: parseFloat(payload.mobile_number),
      role: parseFloat(payload.role),
    }),
    headers:{
      'Authorization': JSON.parse(sessionStorage.getItem("LoginDetails")).tokenNew,
   },
  })
    .then((response) => response.json())
    .catch((e) => console.log(e));
}

function* createUserRequiest({ payload }) {
  try {
    const userDetails = yield call(createUser, payload);
    yield put({ type: CREATEUSER_SUCCESS, userDetails });
  } catch (e) {
    yield put({ type: CREATEUSER_FAILED });
  }
  finally{
    SessionExpiration()
}
}

function fetchRole() {
  return fetch(`http://${baseUrl}/ams/v1/get-role`, {
    method: "GET",
    headers:{
      'Authorization': JSON.parse(sessionStorage.getItem("LoginDetails")).tokenNew,
   },
  })
    .then((response) => response.json())
    .catch((e) => console.log(e));
}

function* getUserRole() {
  try {
    const roleDetails = yield call(fetchRole);
    yield put({ type: GET_ROLE_SUCCESS, roleDetails });
  } catch (e) {
    yield put({ type: GET_ROLE_FAILED });
  }
  finally{
    SessionExpiration()
}
}


function* createUserSaga() {
  yield takeEvery(CREATEUSER_REQUEST, createUserRequiest);
  yield takeEvery(GET_ROLE_REQUEST, getUserRole);
}

export default createUserSaga;
