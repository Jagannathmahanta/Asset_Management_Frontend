import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { SuccessPopUp } from "../utils/SuccessPopUp";
import { useSelector, useDispatch } from "react-redux";
import DeletePopup from "../utils/DeletePopup";
import { vendorRequest } from "../redux/actions/createAssetAction";
import {
  getVendorListRequest,
  deleteVendorRequiest,
  locationRequest,
} from "../redux/actions/getVendorAction";

import DeleteModelPopup from '../componets/DeleteModelPopup'
import { clearMessageRequest } from "../redux/actions/clearMessageAction";
import swal from "sweetalert";

let VenderList = () => {
  const [locationId, setLocationId] = useState("");
  const dispatch = useDispatch();

  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [deletingId, setDeletingId] = useState();

  // const vendorList = useSelector((state) => state.venderDetails?.vendorDetails?.Data)

  const vendorList = useSelector((state) => state.SetVendor?.vendor?.Data);

  const locationList = useSelector(
    (state) => state.GetLocationDetails?.locationDetails?.Data
  );

  const deletedData = useSelector(
    (state) => state.DeleteVendor?.deletedDetails
  );

  const handleLocation = (event) => {
    const Id = event.target.value;
    setLocationId(Id);
  };

  const [isModelWithId,setIsModelWithId] = useState("")  
  const setDeleteModelWithId=(modelWithId)=>{
    setIsModelWithId(modelWithId)
  }

  //.. TODO : Remove this PopUp and Implement Jagannath PopUp
  const deleteCanclePopUp = () => {
    // setIsDeleteClicked(false);
    setIsModelWithId("")
    setDeletingId("");
  };
  const deleteUserPopUp = () => {
    dispatch(deleteVendorRequiest(deletingId));
    // setIsDeleteClicked(false);
    setIsModelWithId("")
    setDeletingId("");
  };
  const deleteVendor = (deleteId) => {
    setIsDeleteClicked(true);
    setDeletingId(deleteId);
  };
  //

  useEffect(() => {
    dispatch(locationRequest());
    // dispatch(getVendorListRequest())
    dispatch(vendorRequest());
    if (deletedData?.message) {
      swal({
        text: deletedData.message,
        icon: "success",
        button: "OK",
      }).then(() => {
        dispatch(clearMessageRequest());
      });
    }
  }, [deletedData, deletedData.message]);

  return (
    <>
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col-md-6">
              <h3>Vendor List</h3>
            </div>
            <div className="col-md-6 d-flex">
              <label className="col-md-3 text-end m-1">Location : </label>
              <div className="col-sm-3 ">
                <select className="form-select" onChange={handleLocation}>
                  <option value="">All</option>
                  {locationList?.length > 0 &&
                    locationList?.map((ven) => {
                      return (
                        <option key={ven.id} value={ven.location}>
                          {ven.location}
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
        <thead className="bg-secondary  text-white">
          <tr>
            <th>Sl.No</th>
            <th>Vendor Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th> Location </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {vendorList?.length > 0 &&
            vendorList
              ?.filter((item) => {
                return locationId === "" ? item : item.location == locationId;
              })
              .map((vendor, index) => {
                return (
                  <tr key={vendor.id}>
                    <td>{index + 1}</td>
                    <td>{vendor.VendorName}</td>
                    <td>{vendor.email}</td>
                    <td>{vendor.mobileNumber}</td>
                    <td>{vendor.location}</td>
                    <td>
                      <a href="">
                        <i
                          className="fa fa-trash" data-bs-toggle="modal" data-bs-target="#exampleModal"
                          onClick={(event) => {
                            event.preventDefault();
                            deleteVendor(vendor.id);
                            setDeleteModelWithId(event.target.dataset.bsTarget)
                          }}
                        ></i>
                      </a>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
      {/* {isDeleteClicked && (
        <DeletePopup
          deleteUserPopUp={deleteUserPopUp}
          deleteCanclePopUp={deleteCanclePopUp}
        />
      )} */}

{isModelWithId && <DeleteModelPopup setId={isModelWithId} text="Are you sure to delete this Vendor List Item ?" heading="Delete Vendor" deleteUserPopUp={deleteUserPopUp} deleteCanclePopUp={deleteCanclePopUp}/>}
    </>
  );
};

export default VenderList;
