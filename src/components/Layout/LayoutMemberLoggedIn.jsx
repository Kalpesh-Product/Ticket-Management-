import React from "react";
import Footer from "./Footer";
import { NavBarMemberLoggedIn } from "./NavBarMemberLoggedIn";

const LayoutMemberLoggedIn = (props) => {
  return (
    <div>
      <NavBarMemberLoggedIn />

      {props.children}

      <Footer />
    </div>
  );
};

export default LayoutMemberLoggedIn;
