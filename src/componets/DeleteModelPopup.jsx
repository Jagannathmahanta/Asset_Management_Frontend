import React from "react";
import { useState } from "react";

const DeleteModelPopup=(props)=>{
    console.log("dileepppppp",props.setId)
    const [deleteWithById,setDeleteWithById]=useState(props.setId)
    const { text,heading ,deleteUserPopUp,deleteCanclePopUp} = props;
    //  const DeleteWithId = props.setId;
    return(
<>
{deleteWithById && <div className="modal fade model show" id={deleteWithById} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{"display":"block"}} role="dialog">
        <div className="modal-dialog">
          <div className="modal-content"> 
         
              <div className="row">
                <div className="col m-2">
                <p>{heading}</p>
                </div>
                <div className="col-md-6 m-2">
                <button type="button" className="btn-close float-end" data-bs-dismiss="modal" aria-label="Close" onClick={()=>deleteCanclePopUp()}></button>
                </div>
              </div>
              <div className=" m-2">
                <p className="h5 text-primary">{text}</p>
            
              </div>
              <div className=" modal-footer foot d-flex justify-content-end ">
              <button type="button" className=" btn btn-outline-dark px-2 btn btn-sm" data-bs-dismiss="modal" onClick={()=>deleteCanclePopUp()}>Cancel</button>
               <button type="btn-close" className=" btn btn-outline-dark btn btn-sm px-2 " onClick={()=>deleteUserPopUp()} data-bs-dismiss="modal">Delete</button>
              </div>
             
          
          </div>
        </div>
      </div> }
</>
    )
}
export default DeleteModelPopup;