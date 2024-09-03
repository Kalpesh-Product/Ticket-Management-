import React from "react";
// import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import ExtraSpace from "../components/ExtraSpace";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminAddMember = () => {
  //   const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  //   const [email, setEmail] = useState("");

  // useState to hold signup form input values
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    // company: "",
    password: "",
  });

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
    await axios.post("/signup-member", signupForm);

    setSignupForm({
      name: "",
      email: "",
      //   company: "",
      password: "",
    });
  };

  // Function to handle signup form submission
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await signup();
      // alert("Your Account has been Created. Login to continue.");

      // Display a success toast
      toast.success("New member has been added.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // Close the modal only after the form submission is successful
      setOpenModal(false);

      //   navigate("/admin-members");

      // Reload the page to show the new entry
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-2 px-4 mx-auto max-w-screen-xl lg:py-4 lg:px-6">
        {/* <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0"> */}
        <div className="space-y-8  sm:gap-6 ">
          {/* Pricing Card */}
          <div className="flex flex-col p-6 mx-auto max-w-xs text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
            <Button color="blue" onClick={() => setOpenModal(true)}>
              Add a new Member
            </Button>
            <Modal
              dismissible
              show={openModal}
              onClose={() => setOpenModal(false)}>
              <form onSubmit={handleSignup}>
                <Modal.Header>Add a new member</Modal.Header>
                <Modal.Body>
                  <div className="space-y-6">
                    {/* <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    Sign in to our platform
                  </h3> */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Member Name
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
                        Member email
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
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Member password
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
                    {/* <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox id="remember" />
                      <Label htmlFor="remember">Remember me</Label>
                    </div>
                    <a
                      href="#"
                      className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">
                      Lost Password?
                    </a>
                  </div> */}
                    {/* <div className="w-full">
                    <Button>Log in to your account</Button>
                  </div> */}
                    {/* <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                    Not registered?&nbsp;
                    <a
                      href="#"
                      className="text-cyan-700 hover:underline dark:text-cyan-500">
                      Create account
                    </a>
                  </div> */}
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    type="submit"
                    color="blue"
                    // onClick={() => setOpenModal(false)}
                  >
                    Create Member
                  </Button>
                  <Button color="gray" onClick={() => setOpenModal(false)}>
                    Close
                  </Button>
                </Modal.Footer>
              </form>
            </Modal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminAddMember;
