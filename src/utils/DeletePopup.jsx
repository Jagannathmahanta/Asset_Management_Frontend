import React from "react";
import swal from 'sweetalert';


let DeletePopup = ({deleteUserPopUp,deleteCanclePopUp}) => {
    swal({
        title: "Are you sure want to Delete",
        // text: "Once deleted, you will not be able to recover this imaginary file!",
        // icon: "warning",
        buttons: [true, "Yes!"]
        // dangerMode: true,
      })
      .then((value)=>{
        if(value){
          deleteUserPopUp();
        }else{
            swal("Your Record is not Deleted");
            deleteCanclePopUp();
        }
      })
      
  return (

    <></>
  )
};

export default DeletePopup;
