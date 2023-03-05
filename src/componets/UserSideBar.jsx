import React from "react";
import { NavLink } from "react-router-dom";
import image1 from "../assets/logo.png";
import {
  FaUserFriends,
  } from "react-icons/fa";


let UserSideBar = ({ children }) => {
    const menuItem = [
      {
        path: "/userPage",
        name: "Asset Assigned",
        icon: <FaUserFriends />
      },
    ];
  


  return (
    <>
      <div className="contain ">
        <div className="sidebar">
          <div className="top">
            <img src={image1} alt="" />
          </div>
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="link"
              activeclassName="active"
            >
              <div className="icon">{item.icon}</div>
              <div className="link_text">{item.name}</div>
            </NavLink>
          ))}
        </div>
        <main>{children}</main>
      </div>
    </>
  );
}

export default UserSideBar;
