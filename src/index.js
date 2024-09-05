import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import axios from "axios";

// axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.baseURL = "https://ticket-management-backend-two.vercel.app";
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
