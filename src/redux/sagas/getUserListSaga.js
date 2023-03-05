import { call, put, takeEvery } from "redux-saga/effects";
import {
  GET_USERLIST_FAILED,
  GET_USERLIST_SUCCESS,
  GET_USERLIST_REQUEST,
  UPDATE_USER_FAILED,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_REQUEST,
  DELETE_USER_FAILED,
  DELETE_USER_SUCCESS,
  DELETE_USER_REQUEST,
  GET_AVALABLEASSET_REQUEST,
  GET_AVALABLEASSET_SUCCESS,
  GET_AVALABLEASSET_FAILED,
  ADD_USERASSET_REQUEST,
  ADD_USERASSET_SUCCESS,
  ADD_USERASSET_FAILED,
  DELETE_USERASSET_REQUEST,
  DELETE_USERASSET_SUCCESS,
  DELETE_USERASSET_FAILED,
  GET_ASSIGNASSET_REQUEST,
  GET_ASSIGNASSET_SUCCESS,
  GET_ASSIGNASSET_FAILED,
} from "../actions/actionType";
import { baseUrl } from "../apiBaseUrl/api";
import {SessionExpiration,loginToken} from '../../utils/SessionTimeOut'


console.log("coooldileepepepe",loginToken)

function fetchUserList() {
  console.log("coooldileepepepe",JSON.parse(sessionStorage.getItem("LoginDetails")).tokenNew)
  return fetch(`http://${baseUrl}/ams/v1/get-users`, {
    method: "GET",
    headers:{
      'Authorization': JSON.parse(sessionStorage.getItem("LoginDetails")).tokenNew,
   },

  })
    .then((response) => response.json())
    .catch((e) => console.log(e));
}

function* getUserRequest() {

  try {
    const userListData = yield call(fetchUserList);
    yield put({ type: GET_USERLIST_SUCCESS, userListData });
  } catch (e) {
    yield put({ type: GET_USERLIST_FAILED });
  }
  finally{
     SessionExpiration();
}

}

function updateUserList(payload) {
  return fetch(`http://${baseUrl}/ams/v1/update-user/${payload.id}`, {
    method: "PUT",
    body: JSON.stringify({
      role: parseFloat(payload.role),
      mobileNumber: parseInt(payload.mobile),
      location: parseFloat(payload.location),
    }),
    headers:{
      'Authorization': JSON.parse(sessionStorage.getItem("LoginDetails")).tokenNew,
   },
  })
    .then((response) => response.json())
    .catch((e) => console.log(e));
}

function* updateUserRequest({ payload }) {
  try {
    const updatedUserData = yield call(updateUserList, payload);
    yield put({ type: UPDATE_USER_SUCCESS, updatedUserData });
  } catch (err) {
    yield put({ type: UPDATE_USER_FAILED, err });
  }
  finally{
    SessionExpiration()
}
}

function deleteUser(payload) {
  return fetch(`http://${baseUrl}/ams/v1/delete-user/${payload}`, {
    method: "DELETE",
    body: JSON.stringify({
      user_status: Boolean(false),
    }),
    headers:{
      'Authorization': JSON.parse(sessionStorage.getItem("LoginDetails")).tokenNew,
   },
  })
    .then((response) => response.json())
    .catch((e) => console.log(e));
}

function* deleteUserRequest({ payload }) {
  try {
    const deleteUserData = yield call(deleteUser, payload);
    yield put({ type: DELETE_USER_SUCCESS, deleteUserData });
  } catch (e) {
    yield put({ type: DELETE_USER_FAILED });
  }
  finally{
    SessionExpiration()
}
}

function fetchAvalableAsset() {
  return fetch(`http://${baseUrl}/ams/v1/get-available-asset`, {
    method: "GET",
    headers:{
      'Authorization': JSON.parse(sessionStorage.getItem("LoginDetails")).tokenNew,
   },
  })
    .then((response) => response.json())
    .catch((e) => console.log(e));
}

function* getAvalableAsset() {
  try {
    const avalableAsset = yield call(fetchAvalableAsset);
    yield put({ type: GET_AVALABLEASSET_SUCCESS, avalableAsset });
  } catch (e) {
    yield put({ type: GET_AVALABLEASSET_FAILED });
  }
  finally{
    SessionExpiration()
}
}

function AddUserAsset(payload) {
  return fetch(`http://${baseUrl}/ams/v1/assign-asset`, {
    method: "POST",
    body: JSON.stringify({
      assetId: Number(payload.assignAssettoUser),
      userId: Number(payload.id),
    }),
    headers:{
      'Authorization': JSON.parse(sessionStorage.getItem("LoginDetails")).tokenNew,
   },
  })
    .then((response) => response.json())
    .catch((e) => console.log(e));
}

function* addUserAssetRequiest({ payload }) {
  try {
    const updateAssetUser = yield call(AddUserAsset, payload);
    yield put({ type: ADD_USERASSET_SUCCESS, updateAssetUser });
  } catch (e) {
    yield put({ type: ADD_USERASSET_FAILED });
  }
  finally{
    SessionExpiration()
}
}

function deleteAssignAsset(payload) {
  console.log("cooool", payload);
  return fetch(`http://${baseUrl}/ams/v1/remove-assigned-asset`, {
    method: "DELETE",
    body: JSON.stringify({
      assetId: payload.deletingId,
      userId: payload.employeeId,
    }),

    headers:{
      'Authorization': JSON.parse(sessionStorage.getItem("LoginDetails")).tokenNew,
   },
  })
    .then((response) => response.json())
    .catch((e) => console.log(e));
}

function* assetDeleteRequiest({ payload }) {
  try {
    const deleteAssetData = yield call(deleteAssignAsset, payload);
    yield put({ type: DELETE_USERASSET_SUCCESS, deleteAssetData });
  } catch (e) {
    yield put({ type: DELETE_USERASSET_FAILED });
  }
  finally{
    SessionExpiration()
}
 
}

//Fetch Assign
function fetchAssingAsset(payload) {
  return fetch(`http://${baseUrl}/ams/v1/assigned-asset/${payload}`, {
    method: "GET",
    headers:{
      'Authorization': JSON.parse(sessionStorage.getItem("LoginDetails")).tokenNew,
   },
  })
    .then((response) => response.json())
    .catch((e) => console.log(e));
}

function* assignRequiest({ payload }) {
  
  try {
    const assignData = yield call(fetchAssingAsset, payload);
    yield put({ type: GET_ASSIGNASSET_SUCCESS, assignData });
  } catch (e) {
    yield put({ type: GET_ASSIGNASSET_FAILED });
  }
  finally{
    SessionExpiration()
}
 
}

function* getUserSaga() {
  yield takeEvery(UPDATE_USER_REQUEST, updateUserRequest);
  yield takeEvery(DELETE_USER_REQUEST, deleteUserRequest);
  yield takeEvery(GET_USERLIST_REQUEST, getUserRequest);

  yield takeEvery(GET_AVALABLEASSET_REQUEST, getAvalableAsset);
  yield takeEvery(ADD_USERASSET_REQUEST, addUserAssetRequiest);
  yield takeEvery(DELETE_USERASSET_REQUEST, assetDeleteRequiest);
  yield takeEvery(GET_ASSIGNASSET_REQUEST, assignRequiest);
}

export default getUserSaga;
