import React from "react";
import { useState } from "react";
import { Form, Link } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
import { useEffect } from "react";
import {deleteUserAssetRequiest} from '../redux/actions/getUserListAction'
import {getAssignAssetRequiest} from '../redux/actions/getUserListAction'
import { SuccessPopUp } from "../utils/SuccessPopUp";

import DeleteModelPopup from '../componets/DeleteModelPopup'
import { clearMessageRequest } from "../redux/actions/clearMessageAction";
import swal from "sweetalert";


let RemoveAssetModel = ({employee,empId,closeModel}) => {

    const employeeData=employee
   const employeeId=empId
    console.log("EMP ID",employeeId)
    console.log("RECEIVED",employeeData)

    const [deleteId,setDeleteId]=useState('')
 const [deletingId, setDeletingId] = useState();
    const deletAsset=useSelector((state)=>state)
    console.log("cool1",deletAsset)

    const dispatch=useDispatch()
  const RemoveAssetFromUser = useSelector((state) => state.DeleteAssetFromUser.deletedAsset);
  console.log("all user store RemoveAssetFromUser data", RemoveAssetFromUser);
  

const [isModelWithId,setIsModelWithId] = useState("")  
  const setDeleteUserAssetWithId=(modelWithId)=>{
    setIsModelWithId(modelWithId)
  }

  const deleteCanclePopUp = () => {
    // setIsDeleteClicked(false);
    setIsModelWithId("")
    setDeletingId("");
  };
  const deleteUserPopUp = () => {
    dispatch(deleteUserAssetRequiest({deletingId,employeeId}))
    // setIsDeleteClicked(false);
    setIsModelWithId("")
    setDeletingId("");
  };

 const deleteAssetUser=(id)=>{
    console.log("DELETE REQUEST ID",id)
    setDeletingId(id)
    // dispatch(deleteUserAssetRequiest({id,employeeId}))
 }
//  useEffect(()=>{
//     console.log("Employee Dileep",assignAssettoUser,employee.id)
//     dispatch(addUseerAssetRequiest({assignAssettoUser,id}))
//   },[assignAssettoUser]);  

useEffect(()=>{
     dispatch(getAssignAssetRequiest(employeeId))
},[RemoveAssetFromUser])
    
useEffect(()=>{
    if(RemoveAssetFromUser?.message && RemoveAssetFromUser?.status==='204'){
    //   SuccessPopUp(RemoveAssetFromUser.message)
    swal({
        text: RemoveAssetFromUser.message,
        icon: "success",
        button: "OK",
      }).then(() => {
        dispatch(clearMessageRequest());
      }); 
    }
},[RemoveAssetFromUser])

 
    return (
        <>

            
                
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col-md-4">
                            <h3>Remove Asset</h3>
                        </div>
                        <div className="col-md-8 d-flex">
                              
                        </div>
                    </div>
                </div>
                <button type="button" className="btn-close" aria-label="Close"onClick={closeModel} ></button>
            </div>


            <hr />

            <table className="table table-striped table-hover ">
                <thead className="text-white bg-secondary">
                    <tr>
                        <th>Sl.No</th>
                        <th>Asset-Type</th>
                        <th>Model</th>
                        <th>Version</th>
                        <th>Location</th>
                        <th>Asset-owner</th>
                        <th></th>

                    </tr>
                </thead>
                <tbody>

                    {
                        employeeData?.length > 0 ? 
                         employeeData?.map((emp)=>{
                            return(
                        <tr key={emp.id}>
                        <td>{emp.id}</td>
                       
                        <th>{emp.assetType}</th>
                        <th>{emp.modelName}</th>
                        <th>{emp.version}</th>
                        <th>{emp.location}</th>
                        <th>{emp.assetOwner}</th>
                        <th>
                            <Link>
                            <i className="fa fa-trash" data-bs-toggle="modal" data-bs-target="#exampleModal"
                            onClick={(event) => {
                                //event.preventDefault();
                                deleteAssetUser(emp.id);
                                setDeleteUserAssetWithId(event.target.dataset.bsTarget)
                              }}
                            
                            ></i>
                            </Link>
                            </th>
                     </tr>
                            )
                        }
                        ):<p className="text-danger">No Asset is Assign </p>
                    }
                    
                </tbody>
            </table>
               
            {isModelWithId && <DeleteModelPopup setId={isModelWithId} text="Are you sure want to Remove asset ?" heading="Remove Asset" deleteUserPopUp={deleteUserPopUp} deleteCanclePopUp={deleteCanclePopUp}/>}
        </>
    );
}

export default RemoveAssetModel;






