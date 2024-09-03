import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
// import AdminDashboard from "../components/AdminDashboard";
import MiddleBody from "../components/Layout/MiddleBody";
import ExtraSpace from "../components/ExtraSpace";
// import { Button } from "flowbite-react";
import axios from "axios";
import LayoutAdmin from "../components/Layout/LayoutAdmin";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminMembers = () => {
  const [members, setMembers] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  //   const [email, setEmail] = useState("");

  // useState to hold signup form input values
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    // company: "",
    password: "",
  });

  // Function to get all members
  const fetchMembers = async () => {
    try {
      const responseFromBackend = await axios.get("/get-all-members");

      setMembers(responseFromBackend.data.members);
    } catch (error) {
      console.log(error);
    }
  };

  // UseEffect to view members
  useEffect(() => {
    fetchMembers();
  }, []);

  const changeToUnavailable = async (idOfTheMemberToBeChanged) => {
    const responseFromBackend = await axios.put(
      `/change-member-to-unavailable/${idOfTheMemberToBeChanged}`
    );
    // console.log(responseFromBackend);

    // Update state
    // creating a duplicate of the members
    const newMembers = [...members];
    const memberIndex = members.findIndex((member) => {
      return member._id === idOfTheMemberToBeChanged; // finds the index of the member which is updated (member whose id was in the button). We find the index so that we can update the member at that index
    });

    newMembers[memberIndex] = responseFromBackend.data.member; // The member at that particular index is now equal to the response we got from updating the member

    setMembers(newMembers);
  };

  const changeToAvailable = async (idOfTheMemberToBeChanged) => {
    const responseFromBackend = await axios.put(
      `/change-member-to-available/${idOfTheMemberToBeChanged}`
    );
    // console.log(responseFromBackend);

    // Update state
    // creating a duplicate of the members
    const newMembers = [...members];
    const memberIndex = members.findIndex((member) => {
      return member._id === idOfTheMemberToBeChanged; // finds the index of the member which is updated (member whose id was in the button). We find the index so that we can update the member at that index
    });

    newMembers[memberIndex] = responseFromBackend.data.member; // The member at that particular index is now equal to the response we got from updating the member

    setMembers(newMembers);
  };

  // Function to get all members
  const autoAssignMember = async () => {
    try {
      console.log("autoAssignMember function triggered");
      const responseFromBackend = await axios.put("/auto-assign-member");

      // setMembers(responseFromBackend.data.members);
      console.log(responseFromBackend);
    } catch (error) {
      console.log(error);
    }
  };

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

      // Fetch the updated list of members
      fetchMembers();

      //   navigate("/admin-members");

      // Reload the page to show the new entry
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // Function to delete a member
  const deleteMember = async (idOfTheMemberToBeDeleted) => {
    await axios.delete(`/delete-member/${idOfTheMemberToBeDeleted}`);

    const newMemberArray = [...members].filter((member) => {
      return member._id !== idOfTheMemberToBeDeleted;
    });

    setMembers(newMemberArray);

    // Display a success toast
    toast.success("Member Deleted.", {
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

  return (
    <LayoutAdmin>
      <MiddleBody>
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
        <br />
        <br />
        <h2 className="mb-5 text-2xl text-center font-bold text-gray-900 dark:text-white">
          List Of Members
        </h2>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 max-w-4xl m-auto">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Member name
                </th>
                <th scope="col" className="px-6 py-3">
                  Availability
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {members &&
                members.map((member) => {
                  return (
                    <tr
                      key={member._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {member.name}
                      </th>

                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {/* {member.availability} */}
                        {member.availability === "Available" ? (
                          <Button
                            onClick={() => changeToUnavailable(member._id)}
                            size="xs"
                            color="success">
                            Available (Mark as Unavailable)
                          </Button>
                        ) : (
                          <Button
                            onClick={() => {
                              changeToAvailable(member._id);
                              autoAssignMember();
                            }}
                            size="xs"
                            color="failure">
                            Unavailable (Mark as Aavailable)
                          </Button>
                        )}
                      </th>

                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <Button
                          onClick={() => deleteMember(member._id)}
                          size="xs"
                          color="failure">
                          Delete
                        </Button>
                      </th>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          <ExtraSpace />
          <ExtraSpace />
          <ExtraSpace />
        </div>
      </MiddleBody>
    </LayoutAdmin>
  );
};

export default AdminMembers;
