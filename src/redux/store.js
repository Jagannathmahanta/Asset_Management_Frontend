import {compose,createStore,applyMiddleware,combineReducers} from 'redux';
import createSagaMiddleware from "@redux-saga/core";
import {getLoginDetails, getLogoutDetails} from './reducers/loginReducer'
import loginSaga from './sagas/loginSaga'
import assetModelSaga from './sagas/getModelSaga';
import assetlistSaga from './sagas/getAssetlistSaga';
import getVendorSaga from './sagas/getVendorSaga';
import allModelListSaga from '../redux/sagas/getAllModelListSaga';
import addVendorSaga from '../redux/sagas/addVendorSaga';
import  deviceOwnershipSaga from './sagas/getDeviceOwnershipSaga';
import { getIsUserIdleState } from './reducers/isUserIdleReducer';
import {getAllModelDetails,getDeletedModelVersionDetails,getModelVersionDetails} from '../redux/reducers/getAllModelListReducer';
import { getVendor,deleteVendorDetails ,getLocationDetails} from './reducers/getVendorReducer';
import { getAssetlistData } from './reducers/getAssetlistReducer';
import { getModelDetails,getVersionType,createModel,getAssetType,getManufacturerName } from './reducers/getModelReducer';
import { addVendorDetails } from "./reducers/addVendorReducer";
import createUserSaga from './sagas/createUserSaga';
import createAssetSaga from './sagas/createAssetSaga';
import { createUser, role } from './reducers/createUserReducer'
import { createAsset, assetOwnerShip, vendor } from './reducers/createAssetreducer';
import { getDeviceOwnershipDetails} from './reducers/getDeviceOwnershipReducer';
import assetTrackingSaga from './sagas/assetTrackingSaga';
import {
    getUserDetails,
    updateUserDetails,
    deleteUserDetails,
    getAvalableAssetData, 
    addUserAssetDetails,deleteAssetFromUser,getAssetOfUser
  } from "./reducers/getUserListReducer";
import { assetTracking } from './reducers/assetTrackingReducer';
  
  import getUserSaga from "./sagas/getUserListSaga";
import { changePassword } from './reducers/ChangePasswordReducer';
import changePasswordSaga from './sagas/ChangePasswordSaga';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({

// Login Reducers
GetLoginDetails:getLoginDetails,
IsUserIdleState :getIsUserIdleState,
GetLogoutDetails:getLogoutDetails,
//

//User List Screen Reducers
UserListDetails: getUserDetails,
DeletedUser: deleteUserDetails,
UpdateUserDetails: updateUserDetails,
GetAvalableAssetData:getAvalableAssetData,
AddUserAssetData:addUserAssetDetails,
DeleteAssetFromUser:deleteAssetFromUser,
GetAssetOfUser:getAssetOfUser,
//

//Model List Screen Reducers
AllModelDetails:getAllModelDetails,
ModelVersions : getModelVersionDetails,
DeletedModelVersion : getDeletedModelVersionDetails,
//


//Create Model Screen Reducers
GetModelDetails:getModelDetails,
getAssetType:getAssetType,
getVersionType:getVersionType,
createModel:createModel,
getManufacturerName:getManufacturerName,

//

//Asset List Reducer
GetAssetListData:getAssetlistData,
//

//
venderDetails:getVendor,
GetLocationDetails:getLocationDetails,
DeleteVendor:deleteVendorDetails,
//

//Add Vendor Screen Reducer
AddVendorDetails: addVendorDetails,
//

//create User Saga
SetUserRole:role,
SetUserDetails:createUser, 
//

//create Asset saga
SetAssetDetails: createAsset,
SetAssetOwnerShipDetails:assetOwnerShip,
SetVendor:vendor,
//


//Get Device Ownership Reducer
GetDeviceOwnershipDetails: getDeviceOwnershipDetails,

//asset tracking
SetAssetTrackingDetails:assetTracking,


//Change password
SetChangePassword:changePassword,

})

 const store =createStore(
    rootReducers,
    composeEnhancer(applyMiddleware(sagaMiddleware))
)
export default store
sagaMiddleware.run(loginSaga);
sagaMiddleware.run(getUserSaga);
sagaMiddleware.run(allModelListSaga);
sagaMiddleware.run(assetModelSaga);
sagaMiddleware.run(assetlistSaga);
sagaMiddleware.run(getVendorSaga);
sagaMiddleware.run(addVendorSaga);
sagaMiddleware.run(createUserSaga);
sagaMiddleware.run(createAssetSaga);
sagaMiddleware.run(deviceOwnershipSaga);
sagaMiddleware.run(assetTrackingSaga);
sagaMiddleware.run(changePasswordSaga)



