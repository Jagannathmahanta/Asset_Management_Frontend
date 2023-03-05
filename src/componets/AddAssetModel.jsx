import React from "react";
import { Link } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
import { useEffect } from "react";
import {getAvalableAssetRequiest ,addUseerAssetRequiest}from '../redux/actions/getUserListAction'
import {locationRequest} from '../redux/actions/getVendorAction'
import { useState } from "react";
import {getAssetTypeRequiest} from "../redux/actions/getModelAction"
import { SuccessPopUp } from "../utils/SuccessPopUp";

import { clearMessageRequest } from "../redux/actions/clearMessageAction";
import swal from "sweetalert";

let AddAssetModel = ({employee,closeModel}) => {
  const [locationId, setLocationId] = useState('')
  let [assetid, setAssetid] = useState("");
  const [assignAssettoUser,setAssignAssettoUser]=useState('')
  
  const dispatch=useDispatch();

 const {id}=employee
  const user=employee;
  const avail=useSelector((state)=>state.GetAvalableAssetData?.avalableAssetData?.Data)
  console.log("Available asset",avail)

  const location=useSelector((state)=>state.GetLocationDetails?.locationDetails?.Data)
  console.log("ADD ASSET Location",location)

  const assetData = useSelector((state) => state.getAssetType?.assetDetails?.Data)
  console.log("ASSET TYPE",assetData)

  const addAssetUser=useSelector((state)=>state.AddUserAssetData?.addUserAssetDetails)
  console.log(addAssetUser)

  const handleLocation = (event) => {
    const Id = event.target.value;
    console.log("Location", Id)
    setLocationId(Id)
    
  }
  
  const handleAssetType = (event) => {

    const getassetid = event.target.value;
    setAssetid(getassetid)
    }
    const addAssetToUser=(addAssetUser)=>{
      setAssignAssettoUser(addAssetUser)

      console.log("ASSET TYPE",addAssetUser)
      //console.log("Employee Dileep",assignAssettoUser)
    }

  useEffect(()=>{
    dispatch(getAvalableAssetRequiest())
    dispatch(locationRequest())
    dispatch(getAssetTypeRequiest())
},[addAssetUser]);


useEffect(()=>{
  console.log("Employee Dileep",assignAssettoUser,employee.id)
  dispatch(addUseerAssetRequiest({assignAssettoUser,id}))
},[assignAssettoUser]);  

useEffect(()=>{
if(addAssetUser?.message && addAssetUser?.status==='201'){
  // SuccessPopUp(addAssetUser.message);
  swal({
    text: addAssetUser.message,
    icon: "success",
    button: "OK",
  }).then(() => {
    dispatch(clearMessageRequest());
  });
}
},[addAssetUser])

    return (
        <>
          <div className="row">
      <div className="col">
        <div className="row">
          <div className="col-md-3">
          <h3>Add Asset</h3>
          </div>
          <div className="col-md-9 d-flex">
            <label className="col-md-2 text-end m-1">Location : </label>
            <div className="col-sm-3 ">
            <select className="form-select" onChange={handleLocation}>
              <option value="">All</option>
             {
              location?.length > 0 &&
              location?.map((loc)=>(
                <option key={loc.id} value={loc.location}>{loc.location}</option>
              ))
             }
            </select>
          </div>
          <label className="col-md-3 text-end m-1">Asset type : </label>
            <div className="col-sm-3 ">
            <select className="form-select" onChange={handleAssetType}>
              <option value="">All</option>
              {
                assetData?.length > 0 &&
                assetData?.map((asset)=>(
                  <option key={asset.id} value={asset.assetType}>{asset.assetType}</option>
                ))
              }
            </select>
          </div>
          </div>
        </div>
      </div>
      <button type="button" className="btn-close" aria-label="Close" onClick={closeModel}></button>
     </div>
   
             <hr />

                        <table className="table table-striped table-hover ">
                            <thead className="text-white bg-secondary">
                                <tr>
                                    <th>Sl.No</th>
                                    <th>Location</th>
                                    <th>Asset-Type</th>
                                    <th>Model</th>
                                    <th>Version</th>
                                    <th>Asset Owner</th>
                                    <th>Vendor</th>
                                    <th></th>
                                    
                                </tr>
                            </thead>
                            <tbody>

                              {
                                avail?.length > 0 &&
                                avail?.filter((item) => (
                                  (locationId === "" ? item : item.location == locationId) &&
                                   (assetid===""? item : item.assetType == assetid)
                                   )).map((item, index) =>( 

                                  <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.location}</td>
                                    <td>{item.assetType}</td>
                                    <td>{item.assetModelName}</td>
                                    <td>{item.configuration}</td>
                                    <td>{item.assetOwner}</td>
                                    <td>{item.assetOwner ==="rented"?item.vendor:"NA"}</td>
                                    
                                    <th>
                                        <Link>
                                        <i className="fa fa-plus" 
                                        onClick={(event) => {
                                          event.preventDefault();
                                          addAssetToUser(item.id);
                                        }}>

                                        </i>
                                        </Link>
                                    </th>
                                </tr>
                                ))
                            
                            
                                }
                            </tbody>
                        </table>
               
           

        </>
    );
}

export default AddAssetModel;


