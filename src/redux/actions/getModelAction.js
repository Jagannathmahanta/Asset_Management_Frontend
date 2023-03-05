import { GET_ASSETMODEL_REQUEST,
     GET_VERSIONTYPE_REQUEST ,
     GET_ASSETBYTYPE_REQUEST,
     CREATE_MODEL_REQUEST,GET_MANUFACTURER_REQUEST} from "./actionType";

     export const getAssetTypeRequiest=()=>{

        return{
            type: GET_ASSETBYTYPE_REQUEST
        }
    }


     export const getModelRequiest=(payload)=>{
    return {
        type:GET_ASSETMODEL_REQUEST,
       payload,
    }
}



export const getModelVersionReequiest=(payload)=>{
    return{
        type: GET_VERSIONTYPE_REQUEST,
        payload
    }
}



export const createModelRequiest=(payload)=>{
    return {
        type: CREATE_MODEL_REQUEST,
       payload,
    }
}

export const getManufacturerRequiest=(payload)=>{
    console.log("ao",payload)
        return{
            type: GET_MANUFACTURER_REQUEST,
            payload,
        }
    }