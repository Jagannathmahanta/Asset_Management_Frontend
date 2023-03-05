import { useState, useEffect } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  assetOwnershipRequest,
  vendorRequest,
  createAssetRequest
} from "../redux/actions/createAssetAction";
import {getModelRequiest} from "../redux/actions/getModelAction";
import { locationRequest } from "../redux/actions/getVendorAction";
import { getAssetTypeRequiest,getManufacturerRequiest } from "../redux/actions/getModelAction";
import { getModelVersionsRequest } from "../redux/actions/getAllModelListAction";
import { serialNumberValidation } from "../utils/Validations";
import { SuccessPopUp } from "../utils/SuccessPopUp";

import { clearMessageRequest } from "../redux/actions/clearMessageAction";
import swal from "sweetalert";

let AddAsset = () => {
  const dispatch = useDispatch();
  let [newManufacturer, setnewManufacturer] = useState("")
  let [assetData, setAssetData] = useState({
    asset: {
      model_name: "",
      modelversion: "",
      serial_number: "",
      asset_type: "",
      manufacturerName: "",
      device_name: "",
      configuration: "",
      assetOwnership: "",
      vendor: "",
      location: "",
    },
  });

  let { asset } = assetData;
  let updateInput = (event) => {
    // console.log("update input data", event.target.value)
    setAssetData((state) => ({
      asset: {
        ...state.asset,
        [event.target.name]: event.target.value,
      },
    }));
  };

  const AllStoreData = useSelector((state) => state.SetAssetDetails?.createdDetails);
  // console.log("all store data add asset", AllStoreData);

  const ownerShipData = useSelector((state) => state.SetAssetOwnerShipDetails?.assetOwnership?.Data);
  // console.log("ownerShipDetails", ownerShipData);

  const vendorData = useSelector((state) => state.SetVendor?.vendor?.Data);
  // console.log("vendorDetails", vendorData);

  const assetTypeData = useSelector(
    (state) => state.getAssetType?.assetDetails?.Data
  );

  
  const manufacturerName = useSelector(
    (state) => state.getManufacturerName?.manufacturerDetails?.Data
  );

  const modelNameData = useSelector(
    (state) => state.GetModelDetails.modelDetails.Data
  );
  // console.log("cool1",modelNameData)

  
  const deviceNameData = useSelector(
    (state) => state.GetDeviceDetails?.deviceDetails?.Data
  );
  // console.log("device", deviceNameData);


  const versionData = useSelector(
    (state) => state.ModelVersions?.ModelVersionDetails?.Data
  );
  // console.log("cool3",versionData)

  const locationData = useSelector((state) => state.GetLocationDetails.locationDetails.Data)
  // console.log("locationDataDetails", locationData);

  const handleAssetType = (e) => {
    const assetTypeid = e.target.value;
    // console.log("yyyyy", assetTypeid);
    dispatch(getManufacturerRequiest(assetTypeid));
  };

  const handleManufacturerName = (e) => {
    const manufacturerid = e.target.value;
    // console.log("hhhhhhh", manufacturerid);
    dispatch(getModelRequiest(manufacturerid));
  }

  const handleModelName = (e) => {
    const modelName = e.target.value;
    const assetType = asset.asset_type;
    const manufacturerName = asset.manufacturerName;
    // console.log("handleModelid chandru", modelName, assetType,manufacturerName);
    dispatch(getModelVersionsRequest({ modelName, assetType,manufacturerName }));
  };

  
  // const getValue = (event) => {
  //   const manufacturerName = model.manufacturer_Name;
  // };

  //validation
  const [invalidSerialnumber, setinvalidSerialnumber] = useState(false);
  const [invalidConfiguration, setinvalidConfiguration] = useState(false);

  const submitData = (e) => {
    e.preventDefault();
    // console.log("User submitd data dileep", asset,modelNameData[0].assetType);
    // const manufacturerName = model.manufacturer_Name;
    const assetType_id = modelNameData[0].assetType
    if (asset.serielno === "" || asset.configuration === "") {
      alert("Fields are empty ");
    } else {
      setinvalidSerialnumber(false);
      setinvalidConfiguration(false);
      if (!serialNumberValidation(asset.serielno)) {
        setinvalidSerialnumber(true);
      }
      if (!serialNumberValidation(asset.configuration)) {
        setinvalidConfiguration(true);
      }
      if(serialNumberValidation(asset.configuration) && serialNumberValidation(asset.serielno)) {
        dispatch(createAssetRequest({asset,assetType_id}));
      }
    }
  };

  useEffect(()=>{
    if(AllStoreData?.message){
      // SuccessPopUp(createdModelData.message)
      swal({
        text: AllStoreData.message,
        icon: "success",
        button: "OK",
      }).then(() => {
        dispatch(clearMessageRequest());
        setAssetData((state) => ({
          asset: {
            ...state.asset,
            model_name: "",
            modelversion: "",
            serial_number: "",
            asset_type: "",
            manufacturerName: "",
            device_name: "",
            configuration: "",
            assetOwnership: "",
            vendor: "",
            location: "",
          },
        }));
      });
    }
      },[AllStoreData])

  useEffect(() => {
    dispatch(assetOwnershipRequest());
    dispatch(vendorRequest());
    dispatch(locationRequest());
    dispatch(getAssetTypeRequiest());
  }, []);

 

  return (
    <>
      <h3>Add Asset</h3>
      <hr />
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-md-8 m-auto">
            <div className="card">
              <div className="card-body cbody">
                <form onSubmit={submitData}>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label mt-4 text-end">
                      Serial number :
                    </label>
                    <div className="col-sm-6 mt-4">
                      <input
                        name="serial_number"
                        value={asset.serial_number}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder=""
                      />
                    </div>
                    <div className="row">
                      <div className="col-sm-3 mx-4"></div>
                      <div className="col-sm-5 ">
                        {invalidSerialnumber && (
                          <p className="text-danger mx-1">
                            Serial number is Invalid
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label mt-4 text-end">
                      Configuration :
                    </label>
                    <div className="col-sm-6">
                      <input
                        name="configuration"
                        value={asset.configuration}
                        onChange={updateInput}
                        type="text"
                        className="form-control mt-4"
                        placeholder=""
                      />
                    </div>
                    <div className="row">
                      <div className="col-sm-3 mx-4"></div>
                      <div className="col-sm-5 ">
                        {invalidConfiguration && (
                          <p className="text-danger mx-1">
                            Configuration is Invalid
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label mt-4 text-end ">
                      Asset-type :
                    </label>
                    <div className="col-sm-4">
                      <select
                        name="asset_type"
                        onChange={(e) => {
                          updateInput(e);
                          handleAssetType(e);
                        }}
                        className="form-select mt-4 py-1"
                      >
                        <option value="Select Model">Select</option>

                        {assetTypeData?.length > 0 &&
                          assetTypeData?.map((assetType) => {
                            console.log("userAssetType", assetType);
                            return (
                              <option key={assetType.id} value={assetType.assetType}>
                                {assetType.assetType}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>

                  {asset.asset_type === "laptop" && (
                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label mt-4 text-end">
                        Device Name :
                      </label>
                      <div className="col-sm-4">
                        <input
                          name="device_name"
                          value={asset.deviceDetails}
                          onChange={updateInput}
                          className="form-control mt-4"
                          placeholder=""
                        />

                        {deviceNameData?.length > 0 &&
                          deviceNameData?.map((deviceDetails) => {
                            console.log(" deviceDetails", deviceDetails);
                            return (
                              <option
                                key={deviceDetails.id}
                                value={deviceDetails.id}
                              >
                                {deviceDetails.deviceDetails_name}
                              </option>
                            );
                          })}
                      </div>
                    </div>
                  )}

<div className="form-group row">
                <label className="col-sm-4 col-form-label text-end mt-4">
                  Manufacturer:
                </label>
                <div className="col-sm-4">
                  <select
                    name="manufacturerName"
                
                    onChange={(e) => {
                      updateInput(e);
                      handleManufacturerName(e);
                    }}
                    className="form-select mt-4 py-1"
                  >
                    <option value="Select Manufacturer">Default</option>
                    {manufacturerName?.length > 0 &&
                      manufacturerName?.map((user) => {
                        return (
                          <option key={user.id} value={user.manufacturerName}>
                            {user.manufacturerName}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
                  
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label text-end mt-4">
                      Model Name :
                    </label>
                    <div className="col-sm-4">
                      <select
                        name="model_name"
                        onChange={(e) => {
                          updateInput(e);
                          handleModelName(e);
                        }}
                        className="form-select mt-4 py-1"
                      >
                        <option value="Default select">Select</option>

                        {modelNameData?.length > 0 &&
                          modelNameData?.map((modelname) => {
                            console.log("userModelName", modelname);
                            return (
                              <option key={modelname.id} value={modelname.modelName}>
                                {modelname.modelName}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label mt-4 text-end ">
                      Version :
                    </label>
                    <div className="col-sm-4">
                      <select
                        name="modelversion"
                        value={asset.modelversion}
                        onChange={updateInput}
                        className="form-select mt-4 py-1"
                      >
                        <option value="Default select">Select</option>

                        {versionData?.length > 0 &&
                          versionData?.map((modelversion) => {
                            console.log("userVersion", modelversion);
                            return (
                              <option
                                key={modelversion.id}
                                value={modelversion.version}
                              >
                                {modelversion.version}
                                {/* {modelversion.asset_type}{modelversion.model_name} */}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      for="inputMoble"
                      className="col-sm-4 col-form-label mt-4 text-end"
                    >
                      Asset Ownership :
                    </label>
                    <div className="col-sm-4 ">
                      <select
                        name="assetOwnership"
                        onChange={updateInput}
                        value={asset.assetOwnership}
                        className="form-select mt-4 py-1 "
                      >
                        <option value="Default select">Select</option>

                        {ownerShipData?.length > 0 &&
                          ownerShipData?.map((ownership) => {
                            console.log("userOwnerShip", ownership);
                            return (
                              <option key={ownership.id} value={ownership.id}>
                                {ownership.assetOwner}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>

                  {asset.assetOwnership === "2" && (
                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label mt-4 text-end">
                        Vendor :
                      </label>
                      <div className="col-sm-4  form-group">
                        <select
                          name="vendor"
                          value={asset.vendor}
                          onChange={updateInput}
                          className="form-select mt-4  py-1"
                          required
                        >
                          <option value="Default select">Select</option>

                          {vendorData?.length > 0 &&
                            vendorData?.map((vendor) => {
                              console.log("userVendor", vendor);
                              return (
                                <option key={vendor.id} value={vendor.id}>
                                  {vendor.VendorName}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                    </div>
                  )}

                  <div className="form-group row">
                    <label
                      for="inputMoble"
                      className="col-sm-4 col-form-label mt-4 text-end"
                    >
                      Location :
                    </label>
                    <div className="col-sm-4  form-group">
                      <select
                        name="location"
                        value={asset.location}
                        onChange={updateInput}
                        className="form-select mt-4 py-1"
                      >
                        <option value="Default select">Select</option>

                        {locationData?.length > 0 &&
                          locationData?.map((location) => {
                            console.log("userLocation", location);
                            return (
                              <option key={location.id} value={location.id}>
                                {location.location}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>

                  {/* <div className="form-group row">
                    <label className="col-sm-4 col-form-label mt-4 text-end">
                      Asset received date :
                    </label>
                    <div className="col-sm-4 ">
                      <input
                        name="receivedate"
                        value={asset.receivedate}
                        onChange={updateInput}
                        type="datetime-local"
                        className="form-control mt-4"
                        placeholder=""
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label mt-4 text-end">
                      Asset returned date :
                    </label>
                    <div className="col-sm-4 ">
                      <input
                        name="returndate"
                        value={asset.returndate}
                        onChange={updateInput}
                        type="datetime-local"
                        className="form-control mt-4"
                        placeholder=""
                      />
                    </div>
                  </div> */}

                  <div className="text-center m-5">
                    <button className=" button">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAsset;
