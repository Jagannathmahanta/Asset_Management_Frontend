import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getModelRequiest,
  createModelRequiest,
  getManufacturerRequiest,
} from "../redux/actions/getModelAction";
import { getAssetTypeRequiest } from "../redux/actions/getModelAction";
import { getModelVersionsRequest } from "../redux/actions/getAllModelListAction";

import { clearMessageRequest } from "../redux/actions/clearMessageAction";
import swal from "sweetalert";

let ModelAddition = () => {
  let [state, setState] = useState("");
  let [newManufacturer, setnewManufacturer] = useState("");
  let [selectedModel, setselectedModel] = useState("");

  const dispatch = useDispatch();

  const userData = useSelector(
    (state) => state.GetModelDetails.modelDetails.data
  );

  const createdModelData = useSelector(
    (state) => state.createModel.modelDetails
  );
  console.log("zzzz", createdModelData);

  const assetType = useSelector(
    (state) => state.getAssetType?.assetDetails?.Data
  );

  const manufacturerName = useSelector(
    (state) => state.getManufacturerName?.manufacturerDetails?.Data
  );

  let [models, setModels] = useState({
    model: {
      asset_type: "",
      manufacturer_name: "",
      model_name: "",
      version: "",
    },
  });

  let { model } = state;

  let changeInput = (event) => {
    setState((models) => ({
      model: {
        ...models.model,
        [event.target.name]: event.target.value,
      },
    }));
  };

  const assetname = useSelector(
    (state) => state.GetModelDetails?.modelDetails?.Data
  );

  console.log("cooooodel Names",assetname)
  const versionName = useSelector(
    (state) => state.ModelVersions?.ModelVersionDetails?.Data
  );

  console.log("coooolcc",versionName)

  const handleAssetType = (event) => {
    const getassetid = event.target.value;

    dispatch(getManufacturerRequiest(getassetid));
  };

  const handleManufacturer = (event) => {
    const getassetid = event.target.value;
    // dispatch(getModelRequiest(getassetid));
    if (getassetid === "New") {
      setselectedModel(getassetid);
      setnewManufacturer(getassetid);
    } else {
    dispatch(getModelRequiest(getassetid));
      setselectedModel("");
      setnewManufacturer("");
    }
  };

  

  const getValue = (event) => {
    const assetType = model.asset_type;
    const manufacturerName = model.manufacturer_Name;
    const modelName = event.target.value;
    
    if (modelName === "New") {
      setselectedModel(modelName);
    }else{
    dispatch(getModelVersionsRequest({ modelName, manufacturerName }));
    setselectedModel(modelName);
    }
  };

  let submitData = (event) => {
    event.preventDefault();
    // console.log("dddd2",manufacturerName)
    // console.log("coocoolool",selectedModel, model, manufacturerName);

    // console.log(selectedModel, model, manufacturerName[0].assetType);
    const asset_type = manufacturerName ? manufacturerName[0]?.assetType :"";
    const version = model?.version;

    const manufacturer = model?.manufacturer_Name;
    const modelName = model?.model_name;
    // console.log(
    //   "final send values",
    //   assetType,
    //   manufacturer,
    //   modelName,
    //   version
    // );
    // console.log({ asset_type, manufacturer, modelName, version });
    if( asset_type === '' || version ==='' || manufacturer === '' || modelName ==='' || manufacturer==='New' || modelName==='New'){
     alert("Fields are empty")
    }else{
      dispatch(
        createModelRequiest({ asset_type, manufacturer, modelName, version })
      );
    }
  };

  useEffect(()=>{
    if(createdModelData?.message){
      // SuccessPopUp(createdModelData.message)
      swal({
        text: createdModelData.message,
        icon: "success",
        button: "OK",
      }).then(() => {
        dispatch(clearMessageRequest());
        setState((models) => ({
          model: {
            ...models.model,
            asset_type: "",
            manufacturer_name: "",
            model_name: "",
            version: "",
          },
        }));
      });
    }
      },[createdModelData])

  useEffect(() => {
    dispatch(getAssetTypeRequiest());
  }, []);

  return (
    <>
      <h3>Add Model</h3>
      <hr />
      <div className="container">
        <div className="row ">
          <div className="col">
            <form action="" onSubmit={submitData}>
              <div className="form-group row mb-1">
                <label className="col-md-5 col-form-label text-end py-2 ">
                  Asset type :
                </label>
                <div className="col-sm-2 text-center">
                  <select
                    name="asset_type"
                    value={model?.asset_type}
                    className="form-select  m-2 py-1"
                    onChange={(e) => {
                      handleAssetType(e);
                      changeInput(e);
                    }}
                  >
                    <option value="">Select</option>
                    {assetType?.length > 0 &&
                      assetType?.map((asset) => {
                        return (
                          <option key={asset.Id} value={asset.assetType}>
                            {asset.assetType}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>

              <div className="form-group row mb-1">
                <label className="col-md-5 col-form-label text-end py-2 ">
                  Manufacturer:
                </label>
                <div className="col-sm-2 text-center">
                  <select
                    name="manufacturer_Name"
                    value={model?.manufacturer_name}
                    className="form-select  m-2 py-1"
                    onChange={(e) => {
                      handleManufacturer(e);
                      changeInput(e);
                    }}
                  >
                    <option value="Select">Default</option>
                    {manufacturerName?.length > 0 &&
                      manufacturerName?.map((user) => {
                        // const item = user.manufacturer;
                        
                        return (
                        
                        <option key={user.id} value={user.manufacturerName}>
                            {user.manufacturerName}
                          </option>
                        );
                      })}
                    <option value="New">New</option>
                  </select>
                </div>
              </div>

              {newManufacturer === "New" ? (
                <div className="new">
                  <div className="form-group row">
                    <label className="col-sm-5 col-form-label  text-end mt-2">
                      New Manufacturer Name :
                    </label>
                    <div className="col-sm-2">
                      <input
                        name="manufacturer_Name"
                        value={model?.manufacturer_name}
                        onChange={(e) => changeInput(e)}
                        className="form-control m-2"
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              {selectedModel !== "New" && (
                <div className="form-group row ">
                  <label className="col-md-5 col-form-label text-end py-2">
                    Model Name :
                  </label>
                  <div className="col-sm-2  text-center">
                    <select
                      name="model_name"
                      value={model?.model_name}
                      className="form-select  m-2 py-1"
                      onChange={(e) => {
                        changeInput(e);
                        getValue(e);
                      }}
                    >
                      <option value="Select">Default</option>
                      {assetname?.map((user) => {
                        return (
                          <option key={user.id} value={user.modelName}>
                            {user.modelName}
                          </option>
                        );
                      })}
                      <option value="New">New</option>
                    </select>
                  </div>
                </div>
              )}

              {selectedModel === "New" ? (
                <div className="addnew">
                  <div className="form-group row">
                    <label className="col-sm-5 col-form-label  text-end mt-2">
                      New model name:
                    </label>
                    <div className="col-sm-2">
                      <input
                        name="model_name"
                        value={model?.model_name}
                        onChange={(e) => changeInput(e)}
                        type="text"
                        className="form-control m-2"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-5 col-form-label  text-end mt-2">
                      Version:
                    </label>
                    <div className="col-sm-2">
                      <input
                        name="version"
                        value={model?.version}
                        onChange={(e) => changeInput(e)}
                        type="text"
                        className="form-control m-2"
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="form-group row ">
                  <label className="col-md-5 col-form-label text-end py-2">
                    Existing Version :
                  </label>
                  <div className="col-sm-2  text-center">
                    <select
                      name="version"
                      value={model?.version}
                      onChange={(e) => changeInput(e)}
                      className="form-select  m-2 py-1"
                    >
                      <option value="Select">Default</option>
                      {versionName?.map((vers) => {
                        return (
                          <option key={vers.id} value={vers.version}>
                            {vers.version}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              )}

              <div className="text-center">
                <button className="button  btn-sm mx-2 mt-3">Add</button>
                <button className="button  btn-sm">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModelAddition;
