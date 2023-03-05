import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaThList,
  FaSearchPlus,
  FaUserTie,
  FaUserAlt,
  FaPlusSquare,
  FaCartPlus,
} from "react-icons/fa";
import image1 from "../assets/logo.png";

let SideBar = ({ children }) => {
  const menuItem = [
    {
      path: "/userlist",
      name: "User List",
      icon: <FaUserAlt />,
    },
    {
      path: "/assetlist",
      name: "Asset List",
      icon: <FaThList />,
    },
    {
      path: "/modellist",
      name: "Model List",
      icon: <FaThList />,
    },
    {
      path: "/venderlist",
      name: "Vender List",
      icon: <FaThList />,
    },
    {
      path: "/adduser",
      name: "Add User",
      icon: <FaPlusSquare />,
    },
    {
      path: "/addasset",
      name: "Add Asset",
      icon: <FaPlusSquare />,
    },
    {
      path: "/addvendor",
      name: "Add Vendor",
      icon: <FaPlusSquare />,
    },
    {
      path: "/modeladdition",
      name: "Add Model",
      icon: <FaCartPlus />,
    },
    {
      path: "/assettracking",
      name: "Asset Tracking",
      icon: <FaSearchPlus />,
    },
    {
      path: "/modelownership",
      name: "Device Ownership",
      icon: <FaUserTie />,
    },
  ];

  return (
    <>
      <div className="contain ">
        <div className="sidebar">
          <div className="top">
            <img src={image1} alt="" />
          </div>
          <div className="sidemap">
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
        </div>
        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
