import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { version } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { SuccessPopUp } from "../utils/SuccessPopUp";
import {
  getAllModelListRequest,
  getModelVersionsRequest,
  deleteModelVersionRequest,
} from "../redux/actions/getAllModelListAction";
import { getAssetTypeRequiest } from "../redux/actions/getModelAction";

import DeleteModelPopup from "../componets/DeleteModelPopup";
import { clearMessageRequest } from "../redux/actions/clearMessageAction";
import swal from "sweetalert";

let ModelList = () => {
  const dispatch = useDispatch();

  const DeleteModelVersionData = useSelector(
    (state) => state.DeletedModelVersion?.deletedModelVersionDetails
  );
  console.log("userData DeleteModelVersionData", DeleteModelVersionData);

  const ModelVersionData = useSelector(
    (state) => state.ModelVersions?.ModelVersionDetails);
  console.log("userData Version", ModelVersionData);

  // const [modelVersion,setModelVersion] = useState('');
  const [filterAssetType, setFilterAssetType] = useState("");
  const [verionById, setVerionById] = useState("");
  const [empRowData, setEmployeeRowData] = useState("");
  const [deletingId, setDeletingId] = useState("");

  const allModelData = useSelector(
    (state) => state.AllModelDetails?.allModelDetails?.Data
  );
  console.log("userData", allModelData);
  const assetType = useSelector(
    (state) => state.getAssetType?.assetDetails?.Data
  );
  console.log("cooooldileep",assetType)

  const filteringAssetType = (e) => {
    setFilterAssetType(e.target.value);
  };

  const getVersion = (emp) => {
    dispatch(getModelVersionsRequest(emp));
  };

  const getVersionOnChange = (event, emp) => {
    console.log(event.target.value, emp);
    setEmployeeRowData(emp);
    setVerionById(event.target.value);
  };

  const [isModelWithId, setIsModelWithId] = useState("");
  const setDeleteModelWithId = (modelWithId) => {
    setIsModelWithId(modelWithId);
  };

  const deleteCanclePopUp = () => {
    // setIsDeleteClicked(false);
    setIsModelWithId("");
    setDeletingId("");
  };
  const deleteUserPopUp = () => {
    dispatch(deleteModelVersionRequest(deletingId));
    // setIsDeleteClicked(false);
    setIsModelWithId("");
    setDeletingId("");
  };

  const deleteAsset = (emp, empVersion) => {
    console.log("dileep,cool", verionById, empRowData);
    console.log("Dileep deleter", emp, empVersion, verionById);
    if (
      emp.assetType === empRowData.assetType &&
      emp.modelName === empRowData.modelName
    ) {
      console.log(
        "Version selected cool",
        emp.asset_type,
        emp.model_name,
        verionById
      );
      const toDeleteAssetType = emp.assetType;
      const toDeleteModelName = emp.modelName;
      // dispatch(
      //   deleteModelVersionRequest(verionById)
      // );
      setDeletingId(verionById);
    } else  {
     
      alert("Select the version to Delete");
      console.log("coooodileepl",isModelWithId)
      // setDeletingId("")
      // setIsModelWithId("")
    }
  };

  useEffect(() => {
    dispatch(getAllModelListRequest());
    dispatch(getAssetTypeRequiest());
  }, []);

  useEffect(() => {
    if (DeleteModelVersionData?.message) {
      swal({
        text: DeleteModelVersionData.message,
        icon: "success",
        button: "OK",
      }).then(() => {
        dispatch(clearMessageRequest());
      });
    }
  }, [DeleteModelVersionData, DeleteModelVersionData.message]);

  return (
    <>
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col-md-6">
              <h3>Model List</h3>
            </div>
            <div className="col-md-6 d-flex">
              <label className="col-md-3 text-end m-1">Asset Type : </label>
              <div className="col-sm-3 ">
                <select
                  name=""
                  className="form-select"
                  onChange={filteringAssetType}
                >
                  <option value="">Select Asset Type</option>
                  {assetType &&
                    assetType.map((emp) => {
                      return (
                        <option key={emp.id} value={emp.assetType}>
                          {emp.assetType}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <table className="table table-striped table-hover">
        <thead className="thead sticky-top bg-secondary text-white">
          <tr>
            <th>Sl.No</th>
            <th>Asset Type</th>
            <th>Model Name</th>
            <th>Manufacturer Name</th>
            <th>Version</th>
            <th>
              
            </th>
          </tr>
        </thead>
        <tbody>
          {allModelData &&
            allModelData
              .filter((item) =>
                filterAssetType !== ""
                  ? item.assetType == filterAssetType
                  : item
              )
              .map((emp, index) => {
                return (
                  <tr key={emp.id}>
                    <td>{index + 1}</td>
                    <td>{emp.assetType}</td>
                    <td>{emp.modelName}</td>
                    <td>{emp.ManufacturerName}</td>
                    <td>
                      {
                        <select
                          className="col-sm-4 col-form-label mt-2 "
                          onClick={() => getVersion(emp)}
                          onChange={(event) => getVersionOnChange(event, emp)}
                        >
                          <option>Select Version </option>
                          {ModelVersionData?.Data?.length > 0 &&
                            ModelVersionData?.Data?.map((item) => {

                              return (
                                <option key={item.id} value={item.version}>
                                  {item.version}
                                </option>
                              );
                            })}
                        </select>
                      }
                    </td>
                    <td>
                      <a href="">
                        <i
                          key={emp.assetType}
                          className="fa fa-trash"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={(event) => {
                            event.preventDefault();
                            deleteAsset(emp, ModelVersionData);
                            setDeleteModelWithId(event.target.dataset.bsTarget);
                          }}
                        ></i>
                      </a>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
      {isModelWithId && deletingId  &&(
        <DeleteModelPopup
          setId={isModelWithId}
          text="Are you sure to delete this Model ?"
          heading="Delete Model"
          deleteUserPopUp={deleteUserPopUp}
          deleteCanclePopUp={deleteCanclePopUp}
        />
      )}
    </>
  );
};

export default ModelList;
