import React from 'react'
import { useState,useEffect } from 'react';
import { Modal} from "react-bootstrap";
import ChangePassword from "../componets/ChangePassword";
import { logoutRequiest } from "../redux/actions/loginAction";
import { clearMessageRequest } from "../redux/actions/clearMessageAction";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate  } from "react-router-dom";
function TopNavbar() {
  let UserDetails = sessionStorage.getItem("LoginDetails");
  let UserDetailsSession = JSON.parse(UserDetails);
  console.log("Dileep", UserDetailsSession);
  const [open, setOpen] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const [detailsToEdit, setDetailsToEdit] = useState();
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.GetLogoutDetails?.userDetails);
  console.log(userData);

const handleNavigate=()=>{
  dispatch(logoutRequiest(UserDetails));
   
 }
 
 useEffect(() => {
  console.log("kkk",userData );
  dispatch(clearMessageRequest())
  sessionStorage.clear();

  navigate("/");
}, [userData]);

  const handleShow = () => {
    console.log("aaa idhd");
    setShow(true);
  };

  const handleChange = (e) => {
    setDetailsToEdit(e.target.value);
  };

  return (
    <nav className="navbar-dark mainnav ">
        <div className="row">
            <div className="col">
            <div className="nav justify-content-center">
            <h3 className="nav-menu p-3">Asset Management System</h3>
             </div>
            </div>
            {(UserDetailsSession?.message === "logged in successfully" &&
          UserDetailsSession?.status === "200" ) && (
            <div className="logout">
            <i className="fa fa-user " onClick={()=>setOpen(!open)}></i>
            {
              open &&
              <div className="back ">
              <ul> 

              <li className="p-2"  onClick={() => handleShow()}> <i className="fa fa-key"></i>  Reset Password</li>
              <li className="p-2" onClick={handleNavigate} ><i className="fa fa-power-off" ></i> Logout</li>
              <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Change Password</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>                          
                          <ChangePassword
                            // detailsToEdit={detailsToEdit}
                            handleChange={handleChange}
                            handleClose={handleClose}
                          />
                        </Modal.Body>
                      </Modal>
                    </ul>
              
            </div>
            }
            
          </div>
          )}
        </div>
        
    </nav>
  )
}

export default TopNavbar