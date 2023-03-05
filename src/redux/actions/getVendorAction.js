import { GET_VENDOR_REQUEST ,DELETE_VENDOR_REQUEST,GET_LOCATION_REQUEST } from "./actionType";

export const getVendorListRequest=()=>{
    return {
        type:GET_VENDOR_REQUEST,
       
    }
}


export const deleteVendorRequiest=(payload)=>{
    return {
        type:DELETE_VENDOR_REQUEST,
       payload,
    }
}


export const locationRequest=()=>{
    return {
        type:GET_LOCATION_REQUEST,
       
    }
}