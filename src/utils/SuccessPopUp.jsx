import swal from 'sweetalert';
import { useSelector, useDispatch } from "react-redux";
import { clearMessageRequest } from '../redux/actions/clearMessageAction';
import { useState } from 'react';
import { useEffect } from 'react';


export const SuccessPopUp = (Message)=>{
//   const dispatch = useDispatch();
//   const [isSuccessPopUp,setIsSuccessPopUp] = useState(false)
// useEffect(()=>{
//   if(isSuccessPopUp){
//    dispatch(clearMessageRequest())
//   }
// })

return (
    swal({
        text: Message,
        icon: "success",
        button: "OK",
      }).then(()=>{
        window.location.reload();
        // setIsSuccessPopUp(true)
        
      })
)
}

// export const WarningPopUp=()=>{
// var IsdeleteClicked
//   swal({
//     title: "Are you sure?",
//     text: "Once deleted, you will not be able to recover this imaginary file!",
//     // icon: "warning",
//     buttons: true,
//     dangerMode: true,
//   })
//   .then((value)=>{
//     console.log("swal",value)
//      IsdeleteClicked=value;
//   })
//   return IsdeleteClicked;
// }
