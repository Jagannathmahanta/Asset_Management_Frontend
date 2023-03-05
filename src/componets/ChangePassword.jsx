import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { passwordRequest } from "../redux/actions/ChangePassword";
import { SuccessPopUp } from "../utils/SuccessPopUp";

let ChangePassword = ({ detailsToChange, handleClose }) => {
  // console.log("changee passsword", detailsToChange);
  let UserDetails = sessionStorage.getItem("LoginDetails");
  let UserDetailsSession = JSON.parse(UserDetails);
  console.log("User Id from session",UserDetailsSession.user_id);

  let [state, setState] = useState({
    admin: {
      user_id: UserDetailsSession.user_id,
      oldPassword: "",
      newPassword: "",
      // verifyPassword: "",
    },
  });

  let { admin } = state;

  const changeInput = (event) => {
    setState((state) => ({
      admin: {
        ...state.admin,
        [event.target.name]: event.target.value,
      },
    }));
    console.log("change admin", admin);
  };


  const dispatch = useDispatch();
  // const userData = useSelector((state) => state);

  const changePasswords = useSelector((state) => state.SetChangePassword.changePassword);
  console.log("password change", changePasswords);

  // const changePassword = useSelector((state) => state);
  // .SetChangePassword.changePassword

  const [verifyPassword, setVerifyPassword] = useState(false);

  const [newPassword, setNewPassword] = useState(false);

  //   const updatedUserData = useSelector(
  //     (state) => state.UpdateUserDetails.updatedDetails
  //   );

  let submitData = (event) => {
    console.log("submitttt data", submitData);
    event.preventDefault();
    if (admin.oldPassword === "" || admin.newPassword === "") {
      alert("fields are empty");
    }
    else {
    //   setVerifyPassword(false)
    // if (!admin.oldPassword === ""){
    //   setVerifyPassword(true)
    // } if(!admin.newPassword){
    //   setNewPassword(true)

    if(admin.newPassword === admin.verifyPassword) {
      dispatch(passwordRequest(admin));
    }else{
      setVerifyPassword(true)
    }

    
    //   }
    }
  };


  useEffect(() => {
    console.log("change and Passwords", changePasswords);
    if (changePasswords?.message) {
      SuccessPopUp(changePasswords.message);
    }
  }, [changePasswords]);

  return (
    <>
      <form onSubmit={submitData}>
        <div className="mb-3">
          <input
            name="oldPassword"
            type="text"
            value={admin.name}
            className="form-control"
            placeholder="Enter Old Password"
            onChange={changeInput}
            autoComplete="off"
          />
        </div>
        <div className="mb-3">
          <input
            name="newPassword"
            type="text"
            value={admin.name}
            className="form-control"
            placeholder="Enter New Password"
            onChange={changeInput}
            autoComplete="off"
          />
        </div>
        <div className="mb-3">
          <input
            name="verifyPassword"
            type="text"
            className="form-control"
            placeholder="ReEnter Password"
            onChange={changeInput}
            autoComplete="off"
          />
        </div>
        <div className="row">
          <div className="col-sm-4 mx-4"></div>
          <div className="col-sm-8 ">
            {/* {admin.newPassword !== admin.verifyPassword ? (
              <p className="text-danger mx-1">Verify Password is Invalid</p>
            ):""} */}
            {verifyPassword && <p className="text-danger mx-1">Password Is Not Matching</p>}
          </div>
        </div>
        <button className="btn btn-primary btn-sm" >
          {" "}
          {/* onClick={handleClose} */}
          Confirm
        </button>
        &nbsp;
        <button className="btn btn-secondary btn-sm" onClick={handleClose}>
          {" "}
          Cancel
        </button>
      </form>
    </>
  );
};

export default ChangePassword;
