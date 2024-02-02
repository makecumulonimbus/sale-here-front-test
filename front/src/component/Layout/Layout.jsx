import React from "react";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="layout-bg">
        <div className="layout-logo">
          <img src={logo} alt="logo" onClick={()=> navigate("/")} className="cursor-pointer"/>
        </div>
        <div className="layout-body">
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
