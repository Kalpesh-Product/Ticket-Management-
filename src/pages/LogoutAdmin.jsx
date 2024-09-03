import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LogoutAdmin = () => {
  const navigate = useNavigate();

  // State to hold logged in status
  const [loggedIn, setLoggedIn] = useState(null);

  const logout = async () => {
    await axios.get("/admin-logout");

    setLoggedIn(false);

    navigate("/");

    // alert("You are now logged out.");

    // Display a success toast
    toast.success("You are now logged out", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  useEffect(() => {
    logout();
  }, []);
  return <h1>...</h1>;
};

export default LogoutAdmin;
