import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { loginRequiest } from "../redux/actions/loginAction";
import image1 from "../assets/logituit.png";
import { emailValidation } from "../utils/Validations";
import EditUser from "../componets/EditUser";
import { isUserIdle } from "../redux/actions/isUserIdleAction";

let Login = () => { 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.GetLoginDetails?.userDetails);
  console.log(userData);

  let UserDetails = sessionStorage.getItem("LoginDetails");
  let UserDetailsSession = JSON.parse(UserDetails);

  let [state, setState] = useState({
    user: {
      email: "",
      password: "",
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

  const [isModalShowing, setIsmodalShowing] = useState(false);
  const [modalText, setModalText] = useState("");
  const modalHandleClose = () => setIsmodalShowing(false);

  const loginDetails = (event) => {
    event.preventDefault();
    if (user.email == "" || user.password == "") {
      setIsmodalShowing(true);
      setModalText(" Found  Empty Field");
    } else {
      if (emailValidation(user.email)) {
        dispatch(loginRequiest(user));
      } else {
        setIsmodalShowing(true);
        setModalText("Invalid Email Address");
      }
    }
  };

  useEffect(() => {
    console.log(UserDetailsSession);
    if (UserDetailsSession !== null && userData?.length !== 0) {
      if (UserDetailsSession.status === "400") {
        alert("Email Not found in data base");
      } else if(UserDetailsSession.role ==='User') {
        navigate("/userPage");
      }else if(UserDetailsSession.role === 'Admin'){
        navigate("/userlist")
      }
    }
  }, [userData]);

  return (
    <>
      <div className="container-fluid mt-5 ">
        <div className="row ">
          <div className="col-md-6 m-auto ">
            <div className="card shadow-lg p-3 mb-5 bg-white rounded ">
              <div>
                <img className="logo" src={image1} alt="" />
              </div>

              <div className="card-body mt-2 mx-5">
                <form onSubmit={loginDetails} action="">
                  <div className="form-group my-2 mx-5">
                    <label htmlFor="" className="mb-2">
                      Username or Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      onChange={updateInput}
                      placeholder="Username"
                      className="form-control my-2"
                    />
                  </div>
                  <div className="form-group my-3 mx-5">
                    <label htmlFor="" className="my-3 ">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      onChange={updateInput}
                      placeholder="password"
                      className="form-control"
                    />
                  </div>
                  <Link className="text-primary align-center">Forget password</Link>
                  <div className="text-center mt-4 mb-5">
                    <input type="submit" value="Login" className="button" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={isModalShowing}>
        <Modal.Body>
          <Modal.Title>{modalText}</Modal.Title>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modalHandleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;
