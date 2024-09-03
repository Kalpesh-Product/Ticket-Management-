import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import ExtraSpace from "../components/ExtraSpace";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { AutoComplete } from "antd";

const RegisterUser = () => {
  const navigate = useNavigate();

  // const [users, setUsers] = useState([]);

  // // Function to fetch all companies(incomplete !)
  // const fetchUsers = async () => {
  //   try {
  //     const responseFromBackend = await axios.get("/get-all-users");

  //     setUsers(responseFromBackend.data.users);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // // UseEffect to view companies
  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  // useState to hold signup form input values
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    company: "",
    password: "",
  });

  const [suggestions, setSuggestions] = useState([]);

  // Function to update signupForm state while typing in the inputs
  const updateSignupForm = (e) => {
    // Get the name & value of the inputs
    const target = e.target;
    const name = target.name;
    const value = target.value;

    // Update the state
    setSignupForm({
      ...signupForm,
      [name]: value,
    });
  };

  // Function to signup with the input values
  const signup = async () => {
    await axios.post("/signup-user", signupForm);

    setSignupForm({
      name: "",
      email: "",
      company: "",
      password: "",
    });
  };

  // Function to handle signup form submission
  const handleSignup = async (e) => {
    e.preventDefault();

    // Get the password and confirm-password values directly from the DOM
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Check if passwords match
    if (password !== confirmPassword) {
      // alert("Passwords do not match!");

      // Display a error toast
      toast.error("Passwords do not match!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return; // Stop the form submission if passwords don't match
    }

    try {
      await signup();
      // alert("Your Account has been Created. Login to continue.");

      // Display a success toast
      toast.success("Your Account has been Created. Login to continue.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      navigate("/login-user");
    } catch (error) {
      console.log(error);
    }
  };

  // const doubleFunctions = (e) => {
  //   updateSignupForm(e); // First function
  //   searchCompany(e); // Second function
  // };

  // const searchCompany = async (event) => {
  //   console.log(event.target.value);
  //   let key = event.target.value;
  //   if (key) {
  //     let result = await fetch(`/search-company/${key}`);
  //     result = await result.json();
  //     if (result) {
  //       setUsers(result);
  //     }
  //   } else {
  //     fetchUsers();
  //   }
  // };

  // const searchCompany = async (event) => {
  //   const key = event.target.value;
  //   if (key) {
  //     try {
  //       const response = await axios.get(`/search-by-company/${key}`);
  //       setSuggestions(response.data);
  //     } catch (error) {
  //       console.error("Error fetching company suggestions", error);
  //     }
  //   } else {
  //     setSuggestions([]); // Clear suggestions if input is empty
  //   }
  // };

  // const fetchCompanyNames = () => {};

  // const selectSuggestion = (companyName) => {
  //   setSignupForm((prevForm) => ({
  //     ...prevForm,
  //     company: companyName,
  //   }));
  //   setSuggestions([]); // Clear suggestions after selection
  // };

  // const handleInputChange = (e) => {
  //   updateSignupForm(e);
  //   fetchSuggestions(e.target.value);
  // };

  const handleInputChange = (e) => {
    const { value } = e.target;
    updateSignupForm(e);
    if (value.trim() === "") {
      setSuggestions([]); // Clear suggestions if input is empty
    } else {
      fetchSuggestions(value);
    }
  };

  // const fetchSuggestions = (value) => {
  //   // Replace with your logic to fetch suggestions
  //   const allSuggestions = [
  //     "Company A Pvt. Ltd.",
  //     "Company B Pvt. Ltd.",
  //     "Company C Pvt. Ltd.",
  //     "Company A Pvt. Ltd.", // Duplicate for testing
  //   ];

  //   // Filter suggestions based on input value and remove duplicates
  //   const newSuggestions = Array.from(
  //     new Set(
  //       allSuggestions.filter((suggestion) =>
  //         suggestion.toLowerCase().startsWith(value.toLowerCase())
  //       )
  //     )
  //   );

  //   setSuggestions(newSuggestions);
  // };

  // Function to fetch suggestions based on the input value
  const fetchSuggestions = async (value) => {
    try {
      const response = await axios.get(`/company-suggestions/${value.trim()}`);
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching company suggestions:", error);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSignupForm((prevForm) => ({
      ...prevForm,
      company: suggestion,
    }));
    setSuggestions([]);
  };

  return (
    <Layout>
      <section className="bg-gray-50 dark:bg-gray-900">
        <br />
        <br />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            User Registration
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSignup}>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your Name
                  </label>
                  <input
                    onChange={updateSignupForm}
                    value={signupForm.name}
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    onChange={updateSignupForm}
                    value={signupForm.email}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="company"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Company Name
                  </label>
                  <input
                    // onChange={doubleFunctions}
                    onChange={handleInputChange}
                    // onChange={updateSignupForm}
                    value={signupForm.company}
                    type="text"
                    name="company"
                    id="company"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Comp. Pvt. Ltd."
                    required
                  />
                  {suggestions.length > 0 && (
                    <div class="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full px-4 py-2 font-medium text-left rtl:text-right border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                  {/* Company suggestions start */}
                  {/* {suggestions.length > 0 && (
                    <div class="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => selectSuggestion(suggestion.company)}
                          type="button"
                          class="w-full px-4 py-2 font-medium text-left rtl:text-right border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                          {suggestion.company}
                        </button>
                      ))}
                    </div>
                  )} */}
                  {/* <div class="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    {users &&
                      users.map((user) => {
                        return (
                          <button
                            type="button"
                            class="w-full px-4 py-2 font-medium text-left rtl:text-right border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                            {user.company}
                          </button>
                        );
                      })}
                    <button
                      type="button"
                      class="w-full px-4 py-2 font-medium text-left rtl:text-right border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                      Messages
                    </button>
                  </div> */}
                  {/* company suggestions end */}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    onChange={updateSignupForm}
                    value={signupForm.password}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                {/* <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300">
                      I accept the{" "}
                      <Link
                        to="/"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                        Terms and Conditions
                      </Link>
                    </label>
                  </div>
                </div> */}
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login-user"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
        <ExtraSpace />
      </section>
    </Layout>
  );
};

export default RegisterUser;
