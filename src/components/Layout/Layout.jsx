import React from "react";
import { NavigationBar } from "./NavigationBar";
import Footer from "./Footer";

const Layout = (props) => {
  return (
    <div>
      <NavigationBar />

      {props.children}

      <Footer />
    </div>
  );
};

export default Layout;
