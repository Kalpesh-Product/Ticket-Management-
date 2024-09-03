import React, { useEffect, useState } from "react";
import LayoutUserLoggedIn from "../components/Layout/LayoutUserLoggedIn";
import MiddleBody from "../components/Layout/MiddleBody";
import ExtraSpace from "../components/ExtraSpace";
import axios from "axios";
// import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

// import { Button } from "flowbite-react";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserTickets = () => {
  const params = useParams();

  const [tickets, setTickets] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  // state to hold the values of reason inputs
  const [deleteForm, setDeleteForm] = useState({
    id: null,
    reasonForDeleting: "",
  });

  // state to hold the values of update form
  const [updateForm, setUpdateForm] = useState({
    id: null,
    userName: "",
    userEmail: "",
    userCompany: "",
    date: "",
    userDepartment: "",
    userMessage: "",
  });

  // Function to get all tickets
  const fetchTickets = async () => {
    try {
      const responseFromBackend = await axios.get(
        `/get-all-tickets/${params.email}`
      );

      setTickets(responseFromBackend.data.tickets);
    } catch (error) {
      console.log(error);
    }
  };

  // UseEffect to view tickets
  useEffect(() => {
    fetchTickets();
    fetchASingleUser();
  }, []);

  //   // Function to update the state (ticket object) as the user types
  //   const updateCreateFormField = (e) => {
  //     // console.log("typed");

  //     const target = e.target;
  //     const name = target.name;
  //     const value = target.value;

  //     setDeleteForm({
  //       ...deleteForm,
  //       [name]: value,
  //     });

  //     // console.log({ name, value });
  //     // console.log(deleteForm);
  //   };

  // Function to create a ticket
  //   const createTicket = async (e) => {
  //     e.preventDefault();

  //     // Create a ticket
  //     const responseFromBackend = await axios.post("/create-ticket", deleteForm);

  //     // Update state
  //     setTickets([...tickets, responseFromBackend.data.ticket]);
  //     // console.log(responseFromBackend);

  //     // Clear form state
  //     setDeleteForm({
  //       userName: deleteForm.userName,
  //       userEmail: deleteForm.userEmail,
  //       creatorEmail: params.email,
  //       userCompany: deleteForm.userCompany,
  //       userDepartment: "",
  //       userMessage: "",
  //       // ticketDate: "",
  //       // time: "",
  //     });

  //     console.log(deleteForm);

  //     // Navigate to list of tickets after creating
  //     // navigate("/list-of-tickets");

  //     // Display a success toast
  //     toast.success("New ticket has been raised.", {
  //       position: "top-right",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //   };

  // Fetching a single user
  const fetchASingleUser = async () => {
    const responseFromBackend = await axios.get(
      `/get-a-single-user/${params.email}`
    );

    console.log(responseFromBackend);

    // prefill form inputs
    // Clear form state
    // setDeleteForm({
    //   userName: responseFromBackend.data.user.name,
    //   userEmail: responseFromBackend.data.user.email,
    //   creatorEmail: params.email,
    //   userCompany: responseFromBackend.data.user.company,
    //   userDepartment: "",
    //   userMessage: "",
    // });
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setDeleteForm((prevForm) => ({
  //     ...prevForm,
  //     [name]: value,
  //   }));
  // };

  // function to confirm & delete ticket
  //   const confirmAndDeleteTicket = async (idOfTheTicketToBeDeleted) => {
  //     const userConfirmed = window.confirm(
  //       "Are you sure you want to delete this ticket?"
  //     );

  //     if (userConfirmed) {
  //       try {
  //         const responseFromBackend = await axios.put(
  //           `/delete-ticket/${idOfTheTicketToBeDeleted}`
  //         );
  //         // console.log(responseFromBackend);

  //         // Update state
  //         // creating a duplicate of the tickets
  //         const newTickets = [...tickets];
  //         const ticketIndex = tickets.findIndex((ticket) => {
  //           return ticket._id === idOfTheTicketToBeDeleted; // finds the index of the ticket which is updated (ticket whose id was in the button). We find the index so that we can update the ticket at that index
  //         });

  //         newTickets[ticketIndex] = responseFromBackend.data.ticket; // The ticket at that particular index is now equal to the response we got from updating the ticket

  //         setTickets(newTickets);

  //         toast.success("Ticket deleted successfully.");
  //         // Optionally, update the tickets state to remove the deleted ticket
  //       } catch (error) {
  //         console.error("Error deleting ticket:", error);
  //         toast.error("Failed to delete ticket.");
  //       }
  //     }
  //   };

  //   const submitReason = (e) => {
  //     e.preventDefault();
  //     // reasonForDeleting();
  //   };

  //   const reasonForDeleting = async (idOfTheTicketToBeDeleted) => {
  //     // update on submitting reason
  //     try {
  //       const userReason = deleteForm.reasonForDeleting;

  //       const responseFromBackend = await axios.put(
  //         `/users-reason-for-deleting-ticket/${idOfTheTicketToBeDeleted}`,
  //         {
  //           reasonForDeleting: userReason,
  //         }
  //       );
  //       // console.log(responseFromBackend);

  //       // Update state
  //       // creating a duplicate of the tickets
  //       const newTickets = [...tickets];
  //       const ticketIndex = tickets.findIndex((ticket) => {
  //         return ticket._id === idOfTheTicketToBeDeleted; // finds the index of the ticket which is updated (ticket whose id was in the button). We find the index so that we can update the ticket at that index
  //       });

  //       newTickets[ticketIndex] = responseFromBackend.data.ticket; // The ticket at that particular index is now equal to the response we got from updating the ticket

  //       setTickets(newTickets);

  //       //   toast.success("Ticket deleted successfully.");
  //       // Optionally, update the tickets state to remove the deleted ticket

  //       //   setOpenModal(false);
  //       deleteTicket(idOfTheTicketToBeDeleted);
  //     } catch (error) {
  //       console.error("Error deleting ticket:", error);
  //       //   toast.error("Failed to delete ticket.");
  //     }
  //   };

  const updateTicket = async (e) => {
    try {
      e.preventDefault();

      // User's selected reason
      const userDepartment = updateForm.userDepartment;
      const userMessage = updateForm.userMessage;

      const responseFromBackend = await axios.put(
        `/user-edit-ticket/${updateForm._id}`,
        {
          userDepartment: userDepartment,
          userMessage: userMessage,
        }
      );
      // console.log(responseFromBackend);

      // Update state
      // creating a duplicate of the tickets
      const newTickets = [...tickets];
      const ticketIndex = tickets.findIndex((ticket) => {
        return ticket._id === updateForm._id; // finds the index of the ticket which is updated (ticket whose id was in the button). We find the index so that we can update the ticket at that index
      });

      newTickets[ticketIndex] = responseFromBackend.data.ticket; // The ticket at that particular index is now equal to the response we got from updating the ticket

      setTickets(newTickets);

      setUpdateForm({
        _id: null,

        userName: "",
        userEmail: "",
        userCompany: "",
        date: "",
        userDepartment: "",
        userMessage: "",
      });

      toast.success("Ticket updated successfully.");
      // Optionally, update the tickets state to remove the updated ticket

      setOpenEditModal(false);
    } catch (error) {
      console.error("Error updating ticket:", error);
      toast.error("Failed to update ticket.");
    }
  };

  const deleteTicket = async (e) => {
    try {
      e.preventDefault();
      // User's selected reason
      const userReason = deleteForm.reasonForDeleting;

      const responseFromBackend = await axios.put(
        `/delete-ticket/${deleteForm._id}`,
        {
          reasonForDeleting: userReason,
        }
      );
      // console.log(responseFromBackend);

      // Update state
      // creating a duplicate of the tickets
      const newTickets = [...tickets];
      const ticketIndex = tickets.findIndex((ticket) => {
        return ticket._id === deleteForm._id; // finds the index of the ticket which is updated (ticket whose id was in the button). We find the index so that we can update the ticket at that index
      });

      newTickets[ticketIndex] = responseFromBackend.data.ticket; // The ticket at that particular index is now equal to the response we got from updating the ticket

      setTickets(newTickets);

      setDeleteForm({
        _id: null,

        reasonForDeleting: "",
      });

      toast.success("Ticket deleted successfully.");
      // Optionally, update the tickets state to remove the deleted ticket

      setOpenModal(false);
    } catch (error) {
      console.error("Error deleting ticket:", error);
      toast.error("Failed to delete ticket.");
    }
  };

  const updateUpdateFormField = (e) => {
    // console.log("typed");

    const target = e.target;
    const name = target.name;
    const value = target.value;

    setUpdateForm({
      ...updateForm,
      [name]: value,
    });

    // console.log({ name, value });
    console.log(updateForm);
  };

  const updateCreateFormField = (e) => {
    // console.log("typed");

    const target = e.target;
    const name = target.name;
    const value = target.value;

    setDeleteForm({
      ...deleteForm,
      [name]: value,
    });

    // console.log({ name, value });
    console.log(deleteForm);
  };

  // View  details before delete
  const toggleDeleteForm = (ticketToBeDisplayedBeforeDeleting) => {
    // this function should preload the state with the values of the ticket we're editing
    // Get the current ticket
    // console.log(ticket);
    // Set state on update form
    setDeleteForm({
      reasonForDeleting: ticketToBeDisplayedBeforeDeleting.reasonForDeleting,

      _id: ticketToBeDisplayedBeforeDeleting._id,
    });
  };

  // View  details before delete
  const toggleUpdateForm = (ticketToBeDisplayedBeforeEditing) => {
    // this function should preload the state with the values of the ticket we're editing
    // Get the current ticket
    // console.log(ticket);
    // Set state on update form
    setUpdateForm({
      userName: ticketToBeDisplayedBeforeEditing.userName,
      userEmail: ticketToBeDisplayedBeforeEditing.userEmail,
      userCompany: ticketToBeDisplayedBeforeEditing.userCompany,
      date: ticketToBeDisplayedBeforeEditing.date,
      userDepartment: ticketToBeDisplayedBeforeEditing.userDepartment,
      userMessage: ticketToBeDisplayedBeforeEditing.userMessage,
      _id: ticketToBeDisplayedBeforeEditing._id,
    });
  };

  return (
    <LayoutUserLoggedIn>
      <MiddleBody>
        {/* <Button color="blue" onClick={() => setOpenModal(true)}>
          Add a new Member
        </Button> */}
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
          <form onSubmit={deleteTicket}>
            <Modal.Header>Reason For Deleting?</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                {/* <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    Sign in to our platform
                  </h3> */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="reasonForDeleting"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Why do you want to delete this ticket?
                  </label>
                  <select
                    name="reasonForDeleting"
                    onChange={updateCreateFormField}
                    value={deleteForm.reasonForDeleting}
                    id="reasonForDeleting"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option>Select Reason</option>
                    <option>Ticket was created by accident</option>
                    <option>Assign to a different member</option>
                    <option>Other</option>
                    {/* <option>Tech</option> */}
                  </select>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                type="submit"
                color="failure"
                // onClick={() => setOpenModal(false)}
                // onClick={deleteTicket}
              >
                Delete
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
        <form>
          <Modal
            dismissible
            show={openEditModal}
            onClose={() => setOpenEditModal(false)}>
            <Modal.Header>Edit Ticket</Modal.Header>
            <Modal.Body>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                {/* <div className="sm:col-span-2"> */}
                <div className="w-full">
                  <label
                    htmlFor="cname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Name
                  </label>
                  <input
                    //   onChange={updateCreateFormField}
                    value={updateForm.userName}
                    type="text"
                    name="userName"
                    id="cname"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Please Enter your name"
                    required
                    disabled
                  />
                </div>
                {/* <div className="sm:col-span-2"> */}
                <div className="w-full">
                  <label
                    htmlFor="cemail"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Email
                  </label>
                  <input
                    //   onChange={updateCreateFormField}
                    value={updateForm.userEmail}
                    type="email"
                    name="userEmail"
                    id="cemail"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Please Enter your email"
                    required
                    disabled
                  />
                </div>

                <div className="w-full">
                  {/* <div className="sm:col-span-2"> */}
                  <label
                    htmlFor="company"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Company Name
                  </label>
                  <input
                    //   onChange={updateCreateFormField}
                    value={updateForm.userCompany}
                    type="text"
                    name="userCompany"
                    id="company"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Please enter company name"
                    required
                    disabled
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="company"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Date
                  </label>
                  <input
                    //   onChange={updateCreateFormField}
                    value={updateForm.date}
                    type="date"
                    name="ticketDate"
                    id="company"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Please enter company name"
                    required
                    defaultValue={new Date().toISOString().split("T")[0]}
                    // value={new Date().toISOString().split("T")[0]}
                    disabled
                  />
                </div>
                {/* <input
                      onChange={handleInputChange}
                      value={createForm.time}
                      type="hidden"
                      name="time"
                      id="time"
                    /> */}
                {/* <div> */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="department"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Select department
                  </label>
                  <select
                    name="userDepartment"
                    onChange={updateUpdateFormField}
                    value={updateForm.userDepartment}
                    id="department"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option>Select</option>
                    <option>IT</option>
                    <option>Admin</option>
                    <option>HR</option>
                    <option>Tech</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="cotherdetails"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Enter Message
                  </label>
                  <textarea
                    onChange={updateUpdateFormField}
                    value={updateForm.userMessage}
                    name="userMessage"
                    id="cotherdetails"
                    rows={8}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Please enter your message here"
                  />
                </div>
              </div>
              {/* <div className="flex justify-center">
                <button
                  type="submit"
                  className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                  Submit a Ticket
                </button>
              </div> */}
            </Modal.Body>
            <Modal.Footer>
              <Button
                type="submit"
                color="blue"
                // onClick={() => setOpenEditModal(false)}
                onClick={updateTicket}>
                Save Changes
              </Button>
              <Button color="gray" onClick={() => setOpenEditModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </form>

        <h2 className="mb-5 text-2xl text-center font-bold text-gray-900 dark:text-white">
          List Of Tickets Raised
        </h2>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 max-w-4xl m-auto">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  User name
                </th>
                <th scope="col" className="px-6 py-3">
                  Ticket ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Department
                </th>

                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Message
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {tickets &&
                tickets.map((ticket) => {
                  return (
                    <tr
                      key={ticket._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {ticket.userName}
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {ticket._id}
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {ticket.date}
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {ticket.time}
                      </th>

                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {ticket.userDepartment}
                      </th>

                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {ticket.status}
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {ticket.memberMessageToUser}
                      </th>
                      <th
                        scope="row"
                        className="flex space-x-2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {ticket.deletedStatus !== "Deleted" && (
                          <>
                            <Button
                              size="xs"
                              color="blue"
                              onClick={() => {
                                toggleUpdateForm(ticket);
                                setOpenEditModal(true);
                              }}>
                              Edit
                            </Button>
                            <Button
                              //   onClick={() => confirmAndDeleteTicket(ticket._id)}
                              //   onClick={() => reasonForDeleting(ticket._id)}
                              onClick={() => {
                                toggleDeleteForm(ticket);
                                setOpenModal(true);
                              }}
                              size="xs"
                              color="failure">
                              Delete
                            </Button>
                          </>
                        )}
                      </th>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          <ExtraSpace />
          <ExtraSpace />
        </div>
      </MiddleBody>
    </LayoutUserLoggedIn>
  );
};

export default UserTickets;
