import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const PageNotFound=()=>{
    const navigate = useNavigate();

    const [isModalShowing,setIsmodalShowing] = useState(true)

   const  modalHandleClose =()=>{
    setIsmodalShowing(false);
    sessionStorage.clear();
    localStorage.clear();
    navigate('/')
}

    return(
        <>
        <Modal show={isModalShowing}>
        <Modal.Body>
          <Modal.Title>Page Not Found</Modal.Title>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modalHandleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}

export default PageNotFound;