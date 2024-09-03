import React from "react";
// import { NavigationBar } from "./NavigationBar";
import Footer from "./Footer";
import { NavBarAdmin } from "./NavBarAdmin";

const LayoutAdmin = (props) => {
  return (
    <div>
      <NavBarAdmin />

      {props.children}

      <Footer />
    </div>
  );
};

export default LayoutAdmin;
