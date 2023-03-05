import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
// import { userAssignedAssetRequest } from '../redux/actions/userpageAction';
import {getAssignAssetRequiest} from '../redux/actions/getUserListAction'

const UserPage=()=> {

  const dispatch = useDispatch();


  // const [perPage, setPerPage] = useState(userData?.slice(0, 10));

  const assignedAssetData =useSelector((state)=>state.GetAssetOfUser?.assignAsset?.Data)

  let UserDetails = sessionStorage.getItem("LoginDetails");
  console.log("user session in data", UserDetails);
  let UserDetailsSession = JSON.parse(UserDetails);
  console.log("user page in dta", UserDetailsSession);


  useEffect(() => {
    dispatch(getAssignAssetRequiest(UserDetailsSession.User_id))
  },[])


  return (
    <div>
      <p className="h3">Asset Assigned</p>
      <hr/>

      <div className="table-responsive-md overflow-auto">
        <table className="table table-striped table-hover">
          <thead className="thead sticky-top bg-secondary text-white">
            <tr>
              <th>Sr.No</th>
              <th>Asset Type</th>
              <th>Model Name</th>
              <th>Vendor Name</th>
              <th>Asset Owner</th>
              <th>Version</th>              
              <th>Location</th> 
            </tr>
          </thead>
          <tbody>
          {assignedAssetData &&
              assignedAssetData?.map((emp) => {
                return (
                  <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <th>{emp.modelName}</th>
                    <td>{emp.assetType}</td>
                    <td>{emp.vendorName}</td>
                    <td>{emp.assetOwner}</td>
                    <td>{emp.version}</td>
                    <td>{emp.location} </td>   
                  </tr>                  
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default UserPage