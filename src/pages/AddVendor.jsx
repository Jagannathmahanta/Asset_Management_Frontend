import { useState, useEffect } from "react";
import React from "react";
import { emailValidation, numberValidation, nameValidation  } from '../utils/Validations';
import { useSelector } from "react-redux";
import { SuccessPopUp } from "../utils/SuccessPopUp";
import { addVendorRequest} from '../redux/actions/addVendorAction';
import {locationRequest} from '../redux/actions/getVendorAction';
import { useDispatch } from "react-redux";

import { clearMessageRequest } from "../redux/actions/clearMessageAction";
import swal from "sweetalert";

let AddVendor = () => {

    const dispatch = useDispatch();

  let [state, setState] = useState({
    user: {
      vendor_name: "",
      email: "",
      mobile_number: "",
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


  const allstoredata = useSelector((state) => state.AddVendorDetails?.addVenderDetails);


const locationData = useSelector((state) =>  state.GetLocationDetails.locationDetails.Data);


const [invalidName, setInvalidName] = useState(false);
const [invalidEmail, setInvalidEmail] = useState(false);
const [invalidMobileNumber, setInvalidMobileNumber] = useState(false);


//validations
  const submitData = (e) => {
    e.preventDefault();
    if (user.username === "" || user.email === "" || user.mobile_number === "" || user.location === "") {
      alert("Fields are empty ")
    } else { 
      setInvalidName(false) 
      setInvalidEmail(false)
      setInvalidMobileNumber(false)
      if (!emailValidation(user.email)) {
        setInvalidEmail(true)
      }
      if(!numberValidation(user.mobile_number)) {
        setInvalidMobileNumber(true)
      }
      if(!nameValidation(user.username)){
        setInvalidName(true)
      }
      if(emailValidation(user.email) && numberValidation(user.mobile_number) && nameValidation(user.username))
    {
      dispatch(addVendorRequest(user))
    }
    }
  }

  useEffect(()=>{
    console.log("ghghghgff",allstoredata)
    if(allstoredata?.message ==='Vendor created successfully' && allstoredata?.status==='201'){
      // SuccessPopUp(allstoredata.message)
      swal({
        text: allstoredata.message,
        icon: "success",
        button: "OK",
      }).then(() => {
        dispatch(clearMessageRequest());
        setState((state) => ({
          user: {
            ...state.user,
            vendor_name: "",
            email: "",
            mobile_number: "",
            location: "",
          },
        }));
      });
    }
    else if(allstoredata?.message==='Unable to create Vendor... Please try again'){
      swal({
        text: allstoredata.message,
        icon: "warning",
        button: "OK",
      }).then(() => {
        dispatch(clearMessageRequest());
        setState((state) => ({
          user: {
            ...state.user,
            vendor_name: "",
            email: "",
            mobile_number: "",
            location: "",
          },
        }));
      });

    }

  },[allstoredata])

  useEffect(() => {
    dispatch(locationRequest());
  }, []);


  return (
    <>
      <p className="h3">Add Vendor</p>
      <hr />
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-8 m-auto">
            <div className="card shadow-xl">
              <div className="card-body cbody">
                <form onSubmit={submitData}>
                  <div className="form-group row sm">
                    <label
                      for="staticName"
                      className="col-sm-4 col-form-label text-end mt-3"
                    >
                      Name :
                    </label>
                    <div className="col-sm-4">
                      <input
                        name="vendor_name"
                        value={user.vendor_name}
                        onChange={updateInput}
                        type="text"
                        className="form-control mt-3"
                        id="staticName"
                        placeholder="Name"
                      />
                    </div>
                    <div className="row">                      
                        <div className="col-sm-3 mx-4"></div>
                        <div className="col-sm-5 ">
                        {invalidName &&  <p className ="text-danger mx-1">Name is Invalid</p>}                       
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      for="staticEmpId"
                      className="col-sm-4 col-form-label text-end mt-3"
                    >
                    
                      Email :
                    </label>
                    <div className="col-sm-4">
                      <input
                        name="email"
                        value={user.email}
                        onChange={updateInput}
                        type="text"
                        className="form-control mt-3"
                        id="staticEmail"
                        placeholder="email"
                      />
                    </div>
                    <div className="row">                      
                        <div className="col-sm-3 mx-4"></div>
                        <div className="col-sm-5 ">
                        {invalidEmail &&  <p className ="text-danger mx-1">Email is Invalid</p>}                       
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      for="inputMoble"
                      className="col-sm-4 col-form-label text-end mt-3"
                    >
                      Mobile Number :
                    </label>
                    <div className="col-sm-4">
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
                        {invalidMobileNumber &&  <p className ="text-danger mx-1">MobileNumber is Invalid</p>}                       
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      for="inputMoble"
                      className="col-sm-4 col-form-label text-end  mt-3"
                    >            
                      Location :
                    </label>
                    <div className="col-sm-4 form-group mt-3">
                      <select
                        name="location"
                        value={user.location}
                        onChange={updateInput}
                        className="form-select py-1 "
                        required
                      >
                        <option>Select</option>
                        
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

export default AddVendor;
