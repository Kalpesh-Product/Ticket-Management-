import React from "react";
import Footer from "./Footer";
import { NavBarUserLoggedIn } from "./NavBarUserLoggedIn";

const LayoutUserLoggedIn = (props) => {
  return (
    <div>
      <NavBarUserLoggedIn />

      {props.children}

      <Footer />
    </div>
  );
};

export default LayoutUserLoggedIn;
