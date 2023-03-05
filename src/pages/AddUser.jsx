import React, { useState, useEffect } from "react";
import {
  getRoleRequest,
  createUserRequest,
} from "../redux/actions/createUserAction";
import { locationRequest } from "../redux/actions/getVendorAction";
import { useSelector, useDispatch } from "react-redux";
import { SuccessPopUp } from "../utils/SuccessPopUp";
import {
  emailValidation,
  numberValidation,
  nameValidation,
} from "../utils/Validations";

import { clearMessageRequest } from "../redux/actions/clearMessageAction";
import swal from "sweetalert";

let AddUser = () => {
  let [state, setState] = useState({
    user: {
      username: "",
      employee_id: "",
      email: "",
      mobile_number: "",
      role: "",
      location: "",
    },
  });
  let { user } = state;
  let updateInput = (event) => {
    setState((state) => ({
      user: {
        ...state.user,
        [event.target.name]: event.target.value,
      },
    }));
  };

  const dispatch = useDispatch();
  const createdUserData = useSelector((state) => state.SetUserDetails?.createUser);

  const roleData = useSelector((state) => state.SetUserRole?.roleDetails?.Data);

  const locationData = useSelector((state) => state.GetLocationDetails.locationDetails.Data)

  const [invalidName, setInvalidName] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidEmployeeId, setInvalidEmplyeeId] = useState(false);
  const [invalidMobileNumber, setInvalidMobileNumber] = useState(false);

  //validations
  const submitData = (e) => {
    e.preventDefault();

    if (
      user.username === "" ||
      user.employee_id === "" ||
      user.email === "" ||
      user.mobile_number === "" ||
      user.role === "" ||
      user.location === ""
    ) {
      alert("Fields are empty ");
    } else {
      setInvalidName(false);
      setInvalidEmplyeeId(false);
      setInvalidEmail(false);
      setInvalidMobileNumber(false);
      if (!emailValidation(user.email)) {
        setInvalidEmail(true);
        // dispatch(createUserRequest(user));
      }
      if (!numberValidation(user.employee_id)) {
        setInvalidEmplyeeId(true);
      }
      if (!nameValidation(user.username)) {
        setInvalidName(true);
      }
      if (!numberValidation(user.mobile_number)) {
        setInvalidMobileNumber(true);
      }
      if(emailValidation(user.email) && numberValidation(user.mobile_number) && numberValidation(user.employee_id) && nameValidation(user.username)) {
        dispatch(createUserRequest(user));
      }
    }
   
  };

  useEffect(()=>{
    if(createdUserData?.message){
      // SuccessPopUp(createdUserData.message)
      swal({
        text: createdUserData.message,
        icon: "success",
        button: "OK",
      }).then(() => {
        dispatch(clearMessageRequest());
        setState((state) => ({
          user: {
            ...state.user,
            username: "",
            employee_id: "",
          email: "",
          mobile_number: "",
          role: "",
          location: "",
          },
        }));
      });
    }
  },[createdUserData])

  useEffect(() => {
    dispatch(getRoleRequest());
     dispatch(locationRequest());
  }, []);

  return (
    <>
      <p className="h3">Add user</p>
      <hr />
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-8 m-auto">
            <div className="card shadow-xl">
              <div className="card-body cbody">
                <form onSubmit={submitData}>
                  <div className="form-group row">
                    <label
                      for="staticName"
                      className="col-sm-3 col-form-label text-end mt-3"
                    >
                      Name * :
                    </label>
                    <div className="col-sm-5">
                      <input
                        name="username"
                        value={user.username}
                        onChange={updateInput}
                        type="text"
                        className="form-control mt-3"
                        id="staticName"
                        placeholder="Name"
                      />
                    </div>
                    <div className="row">
                      <div className="col-sm-4 mx-4"></div>
                      <div className="col-sm-5 ">
                        {invalidName && (
                          <p className="text-danger mx-1">Name is Invalid</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      for="staticEmpId"
                      className="col-sm-3 col-form-label text-end mt-3"
                    >
                      Employe Id * :
                    </label>
                    <div className="col-sm-5">
                      <input
                        name="employee_id"
                        value={user.employee_id}
                        onChange={updateInput}
                        type="number"
                        className="form-control mt-3"
                        id="staticEmpId"
                        placeholder="Employe Id"
                      />
                    </div>
                    <div className="row">
                      <div className="col-sm-3 mx-4"></div>
                      <div className="col-sm-5 ">
                        {invalidEmployeeId && (
                          <p className="text-danger mx-1">
                            Employe Id is Invalid
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      for="staticEmail"
                      className="col-sm-3 col-form-label text-end mt-3"
                    >
                      Email * :
                    </label>
                    <div className="col-sm-5">
                      <input
                        name="email"
                        value={user.email}
                        onChange={updateInput}
                        type="text"
                        className="form-control mt-3"
                        id="staticEmail"
                        placeholder="Email"
                      />
                    </div>
                    <div className="row">
                      <div className="col-sm-3 mx-4"></div>
                      <div className="col-sm-5 ">
                        {invalidEmail && (
                          <p className="text-danger mx-1">Email is Invalid</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      for="inputMoblie"
                      className="col-sm-3 col-form-label text-end mt-3"
                    >
                      Mobile Number * :
                    </label>
                    <div className="col-sm-5">
                      <input
                        name="mobile_number"
                        value={user.mobile_number}
                        onChange={updateInput}
                        type="Number"
                        className="form-control mt-3"
                        id="inputMobile"
                        placeholder="Mobile"
                      />
                    </div>
                    <div className="row">
                      <div className="col-sm-3 mx-4"></div>
                      <div className="col-sm-5 ">
                        {invalidMobileNumber && (
                          <p className="text-danger mx-1">
                            MobileNumber is Invalid
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      for="inputMoble"
                      className="col-sm-3 col-form-label text-end  mt-3"
                    >
                      Role :
                    </label>
                    <div className="col-sm-3 mt-3 form-group">
                      <select
                        name="role"
                        value={user.role}
                        onChange={updateInput}
                        className="form-select py-1 "
                        required
                      >
                        <option value="Select">Select</option>

                        {roleData?.length > 0 &&
                          roleData?.map((role, index) => {
                            return <option value={role.id}>{role.role}</option>;
                          })}
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      for="inputMoble"
                      className="col-sm-3 col-form-label text-end mt-3"
                    >
                      Location :
                    </label>
                    <div className="col-sm-3 form-group mt-3">
                      <select
                        name="location"
                        value={user.location}
                        onChange={updateInput}
                        className="form-select py-1 "
                      >
                        <option value="Default select">Select</option>

                        {locationData?.length > 0 &&
                          locationData?.map((location) => {
                            return (
                              <option key={location.id} value={location.id}>
                                {location.location}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                  <div className="text-center m-3">
                    <button className="button m-2">Submit</button>
                    <button className="button">Reset</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
