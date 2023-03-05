import React from "react";
import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import EditUser from "../componets/EditUser";
import { Link } from "react-router-dom";
import {
  getUserListRequest,
  deleteUserRequest,
} from "../redux/actions/getUserListAction";
import { useSelector, useDispatch } from "react-redux";
import AddAssetModel from "../componets/AddAssetModel";
import RemoveAssetModel from "../componets/RemoveAssetModel";
import PagePagination from "../componets/PagePagination";
import { SuccessPopUp, WarningPopUp } from "../utils/SuccessPopUp";
import DeletePopup from "../utils/DeletePopup";
import DeleteModelPopup from '../componets/DeleteModelPopup'


import { clearMessageRequest } from "../redux/actions/clearMessageAction";
import swal from "sweetalert";

let UserList = () => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [detailsToEdit, setDetailsToEdit] = useState();
  const [showAddAssetModel, setShowAddAssetModel] = useState(false);
  const [showAvailableAsset, setShowAvailableAsset] = useState("");
  const [showRemoveAssetModel, setShowRemoveAssetModel] = useState(false);
  const [employeeId, setEmployeeId] = useState("");

  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [deletingId, setDeletingId] = useState();

  const addAssethandle = (emp) => {
    setShowAddAssetModel(true);
    const employeeData = emp;
    setShowAvailableAsset(emp);
  };

  const removeAssethandle = (emp) => {
    setShowRemoveAssetModel(true);
    const employeeID = emp;
    setEmployeeId(employeeID);
    console.log("cool", emp, employeeID);
    // dispatch(getAssignAssetRequiest(employeeID))
  };

  const closeModel = () => {
    setShowAddAssetModel(false);
    setShowRemoveAssetModel(false);
  };
  const Closehandle = () => setShowAddAssetModel(false);
  const Closehandlee = () => setShowRemoveAssetModel(false);

  const handleShow = (emp) => {
    setDetailsToEdit(emp);
    setShow(true);
  };

  const handleClose = () => setShow(false);


  const [isModelWithId,setIsModelWithId] = useState("")  
  const setDeleteUserWithId=(modelWithId)=>{
    setIsModelWithId(modelWithId)
  }

//.. TODO : Remove this PopUp and Implement Jagannath PopUp
  const deleteCanclePopUp=()=>{
    // setIsDeleteClicked(false);
    setIsModelWithId("")
    setDeletingId("");
  }
  const deleteUserPopUp = () => {
    dispatch(deleteUserRequest(deletingId));
    // setIsDeleteClicked(false);
    setIsModelWithId("")
    setDeletingId("");
  };
  const deleteUser = (deleteId) => {
    setIsDeleteClicked(true);
    setDeletingId(deleteId);

    // WarningPopUp();
    // dispatch(deleteUserRequest(deleteId));
  };

  //.....



  const handleChange = (e) => {
    setDetailsToEdit(e.target.value);
  };

  const userData = useSelector(
    (state) => state.UserListDetails?.userDetails?.Data
  );

  const assignedAsset = useSelector(
    (state) => state.GetAssetOfUser?.assignAsset?.Data
  );

  const [perPage, setPerPage] = useState(userData?.slice(0, 10));
  const [currentPage, setCurrentPage] = useState(1);

  const pageHandler = (pageNumber) => {
    setPerPage(userData?.slice(pageNumber * 10 - 10, pageNumber * 10));
    setCurrentPage(pageNumber);
  };

  const deletedUserData = useSelector(
    (state) => state.DeletedUser?.deletedDetails
  );
  const updatedUserData = useSelector(
    (state) => state.UpdateUserDetails.updatedDetails
  );

  useEffect(() => {
    pageHandler(1);
  }, [userData]);

  useEffect(() => {
    dispatch(getUserListRequest());
    if (deletedUserData?.message) {
      // SuccessPopUp(deletedUserData.message);
        swal({
          text: deletedUserData.message,
          icon: "success",
          button: "OK",
        }).then(() => {
          dispatch(clearMessageRequest());
        });
      }
    
  }, [deletedUserData, updatedUserData,deletedUserData.message]);

  return (
    <>
      <p className="h3">User list</p>
      <hr />
      <div className="table-responsive-md overflow-auto">
        <table className="table table-striped table-hover">
          <thead className="thead sticky-top bg-secondary text-white">
            <tr>
              <th>Sl.No</th>
              <th>Employee Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Role</th>
              <th>Location</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {perPage &&
              perPage?.map((emp) => {
                return (
                  <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <th>{emp.employeeId}</th>
                    <td>{emp.username}</td>
                    <td>{emp.email}</td>
                    <td>{emp.mobileNumber}</td>
                    <td>{emp.role}</td>
                    <td>{emp.location} </td>
                    <td>
                      <Link>
                        <i
                          className="fa fa-edit"
                          onClick={() => handleShow(emp)}
                        ></i>
                      </Link>
                    </td>
                    <td>
                      <a href="">
                        <i
                          className="fa fa-trash"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={(event) => {
                            event.preventDefault();
                            deleteUser(emp.id);
                            setDeleteUserWithId(event.target.dataset.bsTarget)
                          }}
                        ></i>
                      </a>
                    </td>
                    <td>
                      <Link>
                        <button
                          className=" btn btn-sm"
                          onClick={() => addAssethandle(emp)}
                        >
                          Add Asset
                        </button>
                      </Link>
                    </td>
                    <td>
                      <Link>
                        <button
                          className="btn btn-sm"
                          onClick={() => removeAssethandle(emp.id)}
                        >
                          Remove Asset
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditUser
            detailsToEdit={detailsToEdit}
            handleChange={handleChange}
            handleClose={handleClose}
          />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save Changes 
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>

      <Modal show={showAddAssetModel} size="lg" onHide={Closehandle}>
        <Modal.Body>
          <AddAssetModel
            employee={showAvailableAsset}
            closeModel={closeModel}
          />
        </Modal.Body>
      </Modal>

      {/* Remove Aseet Model */}

      <Modal show={showRemoveAssetModel} size="lg" onHide={Closehandlee}>
        <Modal.Body>
          <RemoveAssetModel
            employee={assignedAsset}
            empId={employeeId}
            closeModel={closeModel}
          />
        </Modal.Body>
      </Modal>

      {/* {isDeleteClicked && <DeletePopup deleteUserPopUp={deleteUserPopUp} deleteCanclePopUp={deleteCanclePopUp}/>} */}
      {isModelWithId && <DeleteModelPopup setId={isModelWithId} text="Are you sure to delete this User ?" heading="Delete User" deleteUserPopUp={deleteUserPopUp} deleteCanclePopUp={deleteCanclePopUp}/>}
      <PagePagination
        data={userData}
        pageHandler={pageHandler}
        currentPage={currentPage}
        itemsPerPage={10}
      />
    </>
  );
};

export default UserList;
