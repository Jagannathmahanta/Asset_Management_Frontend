import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "font-awesome/css/font-awesome.css";
import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SideBar from "./componets/SideBar";
import { useNavigate } from "react-router-dom";
import UserList from "./pages/UserList";
import AddUser from "./pages/AddUser";
import AssetList from "./pages/AssetList";
import AddAsset from "./pages/AddAsset";
import VenderList from "./pages/VenderList";
import ModelAddition from "./pages/ModelAddition";
import AssetTracking from "./pages/AssetTracking";
import ModelOwnership from "./pages/DeviceOwnership";
import PageNotFound from "./pages/PageNotFound";
import AddVendor from "./pages/AddVendor";
import ModelList from "./pages/ModalList";
import UserPage from "./pages/Userpage";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import UserSideBar from "./componets/UserSideBar";
import TopNavbar from "./componets/TopNavbar";

export function App() {
  const location = useLocation();
  const navigate = useNavigate();

  let UserDetails = sessionStorage.getItem("LoginDetails");
  let UserDetailsSession = JSON.parse(UserDetails);

  return (
    <>
         <TopNavbar/>   
      <Routes>
        {(UserDetailsSession?.message === "logged in successfully" &&
          UserDetailsSession?.status === "200" && UserDetailsSession?.role === 'Admin') && (
            <>
              <Route
                element={
                  <SideBar>
                    <Outlet />
                  </SideBar>
                }
              >
                <Route path="/userlist" element={<UserList />} />
                <Route path="/assetlist" element={<AssetList />} />
                <Route path="/adduser" element={<AddUser />} />
                <Route path="/addasset" element={<AddAsset />} />
                <Route path="/venderlist" element={<VenderList />} />
                <Route path="/modeladdition" element={<ModelAddition />} />
                <Route path="/assettracking" element={<AssetTracking />} />
                <Route path="/addvendor" element={<AddVendor />} />
                <Route path="/modellist" element={<ModelList />} />
                <Route path="/modelownership" element={<ModelOwnership />} />
                <Route path="/userPage" element={<UserPage/>}/>
              </Route>
            </>
          )}
          {
             (UserDetailsSession?.message === "logged in successfully" &&
             UserDetailsSession?.status === "200" && UserDetailsSession?.role  === "User") && (
               <>
                <Route
                           element={
                             <UserSideBar>
                               <Outlet />
                             </UserSideBar>
                           }
                         >  
                         <Route path="/userPage" element={<UserPage/>}/>
                         </Route>
               </>
             )
          }
          

        {/* // )} */}
        <Route path="/" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
