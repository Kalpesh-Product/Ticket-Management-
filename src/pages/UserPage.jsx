import React, { useEffect, useState } from "react";
// import Layout from "../components/Layout/Layout";
import LayoutUserLoggedIn from "../components/Layout/LayoutUserLoggedIn";
import MiddleBody from "../components/Layout/MiddleBody";
import ExtraSpace from "../components/ExtraSpace";
import axios from "axios";
// import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "flowbite-react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);

  const [messages, setMessages] = useState([]);
  const [isOtherSelected, setIsOtherSelected] = useState(false);

  // state to hold the values of inputs
  const [createForm, setCreateForm] = useState({
    // userName: "",
    userName: "",
    userEmail: "",
    creatorEmail: params.email,
    userCompany: "",
    userDepartment: "",
    userMessage: "",
    // ticketDate: new Date().toISOString().split("T")[0],
    // time: new Date().toTimeString().split(":").slice(0, 2).join(":"),
  });

  const loggedInUserEmail = params.email;
  let selectedOption = null;
  // console.log(loggedInUserEmail);

  // // Function to get all tickets
  // const fetchTickets = async () => {
  //   try {
  //     const responseFromBackend = await axios.get(
  //       `/get-all-tickets/${params.email}`
  //     );

  //     setTickets(responseFromBackend.data.tickets);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // UseEffect to view tickets
  useEffect(() => {
    // fetchTickets();
    fetchASingleUser();
  }, []);

  // Function to update the state (ticket object) as the user types
  const updateCreateFormField = (e) => {
    // console.log("typed");

    const target = e.target;
    const name = target.name;
    const value = target.value;

    setCreateForm({
      ...createForm,
      [name]: value,
    });

    // console.log({ name, value });
    // console.log(createForm);
  };

  // Function to create a ticket
  const createTicket = async (e) => {
    e.preventDefault();

    // Create a ticket
    const responseFromBackend = await axios.post("/create-ticket", createForm);

    // Update state
    setTickets([...tickets, responseFromBackend.data.ticket]);
    // console.log(responseFromBackend);

    // Clear form state
    setCreateForm({
      userName: createForm.userName,
      userEmail: createForm.userEmail,
      creatorEmail: params.email,
      userCompany: createForm.userCompany,
      userDepartment: "",
      userMessage: "",
      // ticketDate: "",
      // time: "",
    });

    // console.log(createForm);

    // Navigate to list of tickets after creating
    // navigate("/list-of-tickets");

    // Display a success toast
    toast.success("New ticket has been raised.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    // Navigate to user tickets
    navigate(`/user-tickets/${params.email}`);
  };

  // Fetching a single user
  const fetchASingleUser = async () => {
    const responseFromBackend = await axios.get(
      `/get-a-single-user/${params.email}`
    );

    // console.log(responseFromBackend);

    // prefill form inputs
    // Clear form state
    setCreateForm({
      userName: responseFromBackend.data.user.name,
      userEmail: responseFromBackend.data.user.email,
      creatorEmail: params.email,
      userCompany: responseFromBackend.data.user.company,
      userDepartment: "",
      userMessage: "",
    });
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setCreateForm((prevForm) => ({
  //     ...prevForm,
  //     [name]: value,
  //   }));
  // };

  // // function to confirm & delete ticket
  // const confirmAndDeleteTicket = async (idOfTheTicketToBeDeleted) => {
  //   const userConfirmed = window.confirm(
  //     "Are you sure you want to delete this ticket?"
  //   );

  //   if (userConfirmed) {
  //     try {
  //       const responseFromBackend = await axios.put(
  //         `/delete-ticket/${idOfTheTicketToBeDeleted}`
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

  //       toast.success("Ticket deleted successfully.");
  //       // Optionally, update the tickets state to remove the deleted ticket
  //     } catch (error) {
  //       console.error("Error deleting ticket:", error);
  //       toast.error("Failed to delete ticket.");
  //     }
  //   }
  // };

  const viewMessages = async (option) => {
    let selectedOption = option; // Save the selected option value inside a variable

    // Check if the option is "Other" to toggle visibility
    // setIsOtherSelected(selectedOption === "Other");

    // if (selectedOption === "Other") {
    //   setIsOtherSelected(true);
    //   console.log("Other is selected");
    // } else {
    //   setIsOtherSelected(false);
    //   console.log("Other is not selected");
    // }

    const responseFromBackend = await axios.get(
      `/view-selected-messages/${selectedOption}`
    );
    // const responseFromBackend = await axios.get(
    //   `/view-selected-messages/Admin`
    // );
    console.log(responseFromBackend);
    // console.log(responseFromBackend.data.client);
    // console.log(responseFromBackend.data.client.clientName);
    // console.log(responseFromBackend.data.client.clientEmail);
    // console.log(params);

    // setMessages({
    //   message: responseFromBackend.data.messages.message,
    //   messageDepertment: responseFromBackend.data.messages.messageDepertment,
    //   // clientEmail: responseFromBackend.data.client.clientEmail,
    //   // clientPhone: responseFromBackend.data.client.clientPhone,
    //   // clientAddress: responseFromBackend.data.client.clientAddress,
    //   // clientOtherDetails: responseFromBackend.data.client.clientOtherDetails,
    // });

    setMessages(responseFromBackend.data.messages);

    console.log(messages);
  };

  const handleOptionChange = (e) => {
    const { value } = e.target;
    updateCreateFormField(e); // Update the form field
    viewMessages(value); // Call viewMessages with the selected option value
  };

  const handleOptionOtherChange = (e) => {
    const { value } = e.target;
    updateCreateFormField(e);

    if (value === "Other") {
      setIsOtherSelected(true);
      console.log("Option is selected");
    } else {
      setIsOtherSelected(false);
      console.log("Option is selected");
      // viewMessages(value);
    }
  };

  return (
    <LayoutUserLoggedIn>
      <MiddleBody>
        <section>
          {/* <div className="flex flex-col p-6 mx-auto max-w-xs text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
            <Link
              to="/logout-user"
              className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-red-900">
              Logout
            </Link>
          </div> */}
          <div>
            <section className="bg-white dark:bg-gray-900">
              <h2 className="mb-4 text-2xl text-center font-bold text-gray-900 dark:text-white">
                User Dashboard
              </h2>
              <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl text-center font-bold text-gray-900 dark:text-white">
                  Raise a New Ticket
                </h2>
                <form onSubmit={createTicket}>
                  <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    {/* <div className="sm:col-span-2"> */}
                    <div className="w-full">
                      <label
                        htmlFor="cname"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Name
                      </label>
                      <input
                        onChange={updateCreateFormField}
                        value={createForm.userName}
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
                        onChange={updateCreateFormField}
                        value={createForm.userEmail}
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
                        onChange={updateCreateFormField}
                        value={createForm.userCompany}
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
                        onChange={updateCreateFormField}
                        value={createForm.date}
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
                        // onChange={updateCreateFormField}
                        onChange={handleOptionChange}
                        value={createForm.userDepartment}
                        id="department"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option>Select</option>
                        <option value="IT">IT</option>
                        <option value="Admin">Admin</option>
                        <option value="HR">HR</option>
                        <option value="Tech">Tech</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="cotherdetails"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Select Message
                      </label>
                      {/* <textarea
                        onChange={updateCreateFormField}
                        value={createForm.userMessage}
                        name="userMessage"
                        id="cotherdetails"
                        rows={8}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Please enter your message here"
                      /> */}

                      <select
                        name="userMessage"
                        // onChange={updateCreateFormField}
                        // onChange={updateCreateFormField}
                        onChange={handleOptionOtherChange}
                        value={createForm.userMessage}
                        id="cotherdetails"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option>Select</option>
                        {messages &&
                          messages.map((message) => {
                            return (
                              <option key={message._id} value={message.message}>
                                {message.message}
                              </option>
                            );
                          })}
                        {/* <option value="Other">Other</option> */}

                        {/* Conditionally render "Other" if there are messages */}
                        {messages && messages.length > 0 && (
                          <option value="Other">Other</option>
                        )}
                        {/* <option value="IT">IT</option>
                        <option value="Admin">Admin</option>
                        <option value="HR">HR</option>
                        <option value="Tech">Tech</option> */}
                      </select>
                    </div>

                    {isOtherSelected && (
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="cotherdetails"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Enter Message
                        </label>
                        <textarea
                          onChange={updateCreateFormField}
                          value={createForm.userMessage}
                          name="userMessage"
                          id="cotherdetails"
                          rows={8}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Please enter your message here"
                        />
                      </div>
                    )}

                    {/* Conditionally display the element if "Other" is selected */}
                    {/* {isOtherSelected && (
                      <div
                        style={{
                          marginTop: "1000px",
                          padding: "1000px",
                          background: "lightblue",
                        }}>
                        This element is displayed because "Other" was selected.
                        <input type="text" />
                      </div>
                    )} */}
                    <input
                      type="hidden"
                      onChange={updateCreateFormField}
                      value="Pending"
                      name="status"
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                      Raise a Ticket
                    </button>
                  </div>
                </form>
              </div>
            </section>
            <br />
            <br />
          </div>
        </section>
        {/* <h2 className="mb-5 text-2xl text-center font-bold text-gray-900 dark:text-white">
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
                            <Button size="xs" color="blue">
                              Edit
                            </Button>
                            <Button
                              onClick={() => confirmAndDeleteTicket(ticket._id)}
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
        </div> */}
      </MiddleBody>
    </LayoutUserLoggedIn>
  );
};

export default UserPage;
