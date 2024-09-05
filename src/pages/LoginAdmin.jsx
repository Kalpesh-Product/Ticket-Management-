import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import ExtraSpace from "../components/ExtraSpace";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginAdmin = () => {
  const navigate = useNavigate();

  // State to hold logged in status
  const [loggedIn, setLoggedIn] = useState(null);

  // state to hold the values of login form inputs
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  // Function to update login form while typing
  const updateLoginForm = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    // now we update the state
    setLoginForm({
      ...loginForm, // creates a duplicate of the loginForm object
      [name]: value, // this will find the keys (name attributes) and update its values (value attributes) to whatever is changed by the JS event.
    });
  };

  // Function to login with the input values
  const login = async () => {
    const res = await axios.post("/admin-login", loginForm);

    setLoggedIn(true);

    setLoginForm({
      email: "",
      password: "",
    });

    // alert("You are now logged in");
    // Display a success toast
    toast.success("You are now logged in", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    // Navigate to homepage
    navigate("/admin-tickets");
  };

  // Function to handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login();
    } catch (error) {
      console.log(error);
      // alert("Please make sure that you've entered all details correctly");

      // Display a error toast
      toast.error(
        "Please make sure that you've entered all details correctly!",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
  };

  return (
    <Layout>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            to="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            Admin Login
          </Link>
          <div className="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    onChange={updateLoginForm}
                    value={loginForm.email}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    onChange={updateLoginForm}
                    value={loginForm.password}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
        <ExtraSpace />
      </section>
    </Layout>
  );
};

export default LoginAdmin;
