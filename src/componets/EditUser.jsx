import { useState ,useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserListRequest } from "../redux/actions/getUserListAction";
import { SuccessPopUp } from "../utils/SuccessPopUp";

import { clearMessageRequest } from "../redux/actions/clearMessageAction";
import swal from "sweetalert";

let EditUser = ({ detailsToEdit, handleClose }) => {

  const dispatch = useDispatch();
  const userData = useSelector((state) => state);

  const updatedUserData = useSelector(
    (state) => state.UpdateUserDetails.updatedDetails
  );
  let [state, setState] = useState({
    emply: {
      id: detailsToEdit.id,
      name: detailsToEdit.username,
      email: detailsToEdit.email,
      mobile: detailsToEdit.mobileNumber,
      role: detailsToEdit.role,
      location: detailsToEdit.location,
    },
  });
  let { emply } = state;

  let updateInput = (event) => {
    setState((state) => ({
      emply: {
        ...state.emply,
        [event.target.name]: event.target.value,
      },
    }));
  };

  let submitData = (event) => {
    event.preventDefault();
    dispatch(updateUserListRequest(emply));
  };


  useEffect(() => {
    if (updatedUserData?.message) {
      // SuccessPopUp(updatedUserData.message);
        swal({
          text: updatedUserData.message,
          icon: "success",
          button: "OK",
        }).then(() => {
          dispatch(clearMessageRequest());
        });
    }
  }, [updatedUserData,updatedUserData.message]);

  return (
    <>
      <form onSubmit={submitData}>
        <div className="mb-3">
          <input
            name="name"
            value={emply.name}
            type="text"
            className="form-control"
            placeholder="Name"
            disabled
          />
        </div>
        <div className="mb-3">
          <input
            name="email"
            value={emply.email}
            type="email"
            className="form-control"
            placeholder="email"
            disabled
          />
        </div>
        <div className="mb-3">
          <input
            required={true}
            name="mobile"
            value={emply.mobile}
            onChange={updateInput}
            type="number"
            className="form-control"
            placeholder="Mobile"
          />
        </div>
        <div className="mb-3">
          <input
            required={true}
            name="role"
            value={emply.role}
            onChange={updateInput}
            type="text"
            className="form-control"
            placeholder="Role"
          />
        </div>
        <div className="mb-3">
          <input
            required={true}
            name="location"
            value={emply.location}
            onChange={updateInput}
            type="text"
            className="form-control"
            placeholder="Location"
          />
        </div>
        <button className="btn btn-primary btn-sm" onClick={handleClose}>
          {" "}
          Update
        </button>
        &nbsp;
        <button className="btn btn-secondary btn-sm" onClick={handleClose}>
          {" "}
          Close
        </button>
      </form>
    </>
  );
};
export default EditUser;
