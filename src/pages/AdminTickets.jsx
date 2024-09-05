import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";

import AdminDashboard from "../components/AdminDashboard";
import MiddleBody from "../components/Layout/MiddleBody";
import ExtraSpace from "../components/ExtraSpace";
import axios from "axios";
import { Link } from "react-router-dom";

import { Button, Modal } from "flowbite-react";
import LayoutAdmin from "./../components/Layout/LayoutAdmin";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminTickets = () => {
  // array containing tickets (from tickets collection)
  const [tickets, setTickets] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);

  // array containing members (from members collection)
  const [members, setMembers] = useState([]);

  // form to update assignedMember in ticket DB
  const [assignMemberForm, setAssignMemberForm] = useState({
    _id: null,
    assignedMember: "",
  });

  // form to update assignedMember in ticket DB
  const [ticketDetails, setTicketDetails] = useState({
    _id: "",
    userName: "",
    userEmail: "",
    creatorEmail: "",
    userCompany: "",
    userDepartment: "",
    userMessage: "",
    status: "",
    assignedMember: "",
    memberAcceptedStatus: "",
    memberAcceptedDate: "",
    memberAcceptedTime: "",
    memberStatus: "",
    memberTimeRequired: "",
    memberMessageToAdmin: "",
    memberMessageToUser: "",
    resolvedStatus: "",
    reasonForDeleting: "",
    deletedStatus: "",
    date: "",
    time: "",
    createdAt: "",

    updatedAt: "",
  });

  // Function to get all tickets
  const fetchTickets = async () => {
    try {
      const responseFromBackend = await axios.get("/get-todays-tickets");

      console.log(responseFromBackend.data.tickets);
      setTickets(responseFromBackend.data.tickets);
    } catch (error) {
      console.log(error);
      setTickets([]);
    }
  };

  // UseEffect to view tickets
  useEffect(() => {
    fetchTickets();
    fetchMembers();
  }, []);

  // Function to get all members
  const fetchMembers = async () => {
    try {
      const responseFromBackend = await axios.get("/get-all-members");

      console.log(responseFromBackend.data.members); // Log the data to verify
      setMembers(responseFromBackend.data.members);
    } catch (error) {
      console.log(error);
    }
  };

  // View  details before delete
  const toggleAssignMemberForm = (
    ticketToBeDisplayedBeforeEditingAssignedMember
  ) => {
    // this function should preload the state with the values of the ticket we're editing
    // Get the current ticket
    // console.log(ticket);
    // Set state on update form
    setAssignMemberForm({
      assignedMember:
        ticketToBeDisplayedBeforeEditingAssignedMember.assignedMember,

      _id: ticketToBeDisplayedBeforeEditingAssignedMember._id,
    });

    console.log(assignMemberForm);
  };

  const assignMember = async (e) => {
    try {
      e.preventDefault();
      // User's selected reason
      const assignedMember = assignMemberForm.assignedMember;

      const responseFromBackend = await axios.put(
        `/update-assign-member/${assignMemberForm._id}`,
        {
          assignedMember: assignedMember,
        }
      );
      // console.log(responseFromBackend);

      // Update state
      // creating a duplicate of the tickets
      const newTickets = [...tickets];
      const ticketIndex = tickets.findIndex((ticket) => {
        return ticket._id === assignMemberForm._id; // finds the index of the ticket which is updated (ticket whose id was in the button). We find the index so that we can update the ticket at that index
      });

      newTickets[ticketIndex] = responseFromBackend.data.ticket; // The ticket at that particular index is now equal to the response we got from updating the ticket

      setTickets(newTickets);

      setAssignMemberForm({
        _id: null,

        assignedMember: "",
      });

      toast.success("Member assigned successfully.");
      // Optionally, update the members state to remove the deleted member

      setOpenModal(false);
      fetchMembers();
    } catch (error) {
      console.error("Error assigning member:", error);
      toast.error("Failed to assign member.");
    }
  };

  const updateAssignFormField = (e) => {
    // console.log("typed");

    const target = e.target;
    const name = target.name;
    const value = target.value;

    setAssignMemberForm({
      ...assignMemberForm,
      [name]: value,
    });

    // console.log({ name, value });
    console.log(assignMemberForm);
  };

  // View  details before delete
  const toggleTicketDetails = (ticketToBeDisplayedBeforeEditing) => {
    // this function should preload the state with the values of the ticket we're editing
    // Get the current ticket
    // console.log(ticket);
    // Set state on update form
    setTicketDetails({
      // userName: ticketToBeDisplayedBeforeEditing.userName,
      _id: ticketToBeDisplayedBeforeEditing._id,
      userName: ticketToBeDisplayedBeforeEditing.userName,
      userEmail: ticketToBeDisplayedBeforeEditing.userEmail,
      creatorEmail: ticketToBeDisplayedBeforeEditing.creatorEmail,
      userCompany: ticketToBeDisplayedBeforeEditing.userCompany,
      userDepartment: ticketToBeDisplayedBeforeEditing.userDepartment,
      userMessage: ticketToBeDisplayedBeforeEditing.userMessage,
      status: ticketToBeDisplayedBeforeEditing.status,
      assignedMember: ticketToBeDisplayedBeforeEditing.assignedMember,
      memberAcceptedStatus:
        ticketToBeDisplayedBeforeEditing.memberAcceptedStatus,
      memberAcceptedDate: ticketToBeDisplayedBeforeEditing.memberAcceptedDate,
      memberAcceptedTime: ticketToBeDisplayedBeforeEditing.memberAcceptedTime,
      memberStatus: ticketToBeDisplayedBeforeEditing.memberStatus,
      memberTimeRequired: ticketToBeDisplayedBeforeEditing.memberTimeRequired,
      memberMessageToAdmin:
        ticketToBeDisplayedBeforeEditing.memberMessageToAdmin,
      memberMessageToUser: ticketToBeDisplayedBeforeEditing.memberMessageToUser,
      resolvedStatus: ticketToBeDisplayedBeforeEditing.resolvedStatus,
      reasonForDeleting: ticketToBeDisplayedBeforeEditing.reasonForDeleting,
      deletedStatus: ticketToBeDisplayedBeforeEditing.deletedStatus,
      date: ticketToBeDisplayedBeforeEditing.date,
      time: ticketToBeDisplayedBeforeEditing.time,
      createdAt: ticketToBeDisplayedBeforeEditing.createdAt,

      updatedAt: ticketToBeDisplayedBeforeEditing.updatedAt,
    });
  };

  return (
    <LayoutAdmin>
      <MiddleBody>
        {/* <AdminDashboard /> */}
        {/* <br />
        <br /> */}

        {/* Modal Start */}
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
          {/* <form onSubmit={deleteTicket}> */}
          <form onSubmit={assignMember}>
            <Modal.Header>Assign Member</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                {/* <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    Sign in to our platform
                  </h3> */}
                <div>
                  <label
                    htmlFor="assignedMember"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Select a member
                  </label>
                  <select
                    name="assignedMember"
                    onChange={updateAssignFormField}
                    // value={assignMemberForm.assignedMember}
                    id="assignedMember"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option>Select</option>
                    {members &&
                      members.map((member) => {
                        return (
                          <option key={member._id} value={member.email}>
                            {member.name}
                          </option>
                        );
                      })}
                    {/* <option value="a@email.com">Member A</option>
                    <option value="b@email.com">Member B</option>
                    <option value="c@email.com">Member C</option>
                    <option value="d@email.com">Member D</option>
                    <option value="e@email.com">Member E</option>
                    <option value="f@email.com">Member F</option>
                    <option value="h@email.com">Member G</option>
                    <option value="g@email.com">Member H</option> */}
                  </select>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                type="submit"
                color="blue"
                // onClick={() => setOpenModal(false)}
                // onClick={deleteTicket}
              >
                Assign
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </form>
        </Modal>

        {/* Details Modal Start */}
        <Modal
          dismissible
          show={openDetailsModal}
          onClose={() => setOpenDetailsModal(false)}>
          <Modal.Header>Full Ticket Details</Modal.Header>
          <Modal.Body>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              {/* <div className="sm:col-span-2"> */}
              {/* <div className="w-full">
                <label
                  htmlFor="cname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                  //   onChange={updateCreateFormField}
                  // value={updateForm.userName}
                  type="text"
                  name="userName"
                  id="cname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Please Enter your name"
                  required
                  disabled
                />
              </div> */}
              {/* <div className="sm:col-span-2"> */}
              {/* <div className="w-full">
                <label
                  htmlFor="cemail"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  //   onChange={updateCreateFormField}
                  // value={updateForm.userEmail}
                  type="email"
                  name="userEmail"
                  id="cemail"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Please Enter your email"
                  required
                  disabled
                />
              </div> */}

              {/* <div className="w-full">
                <label
                  htmlFor="company"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Date
                </label>
                <input
                  //   onChange={updateCreateFormField}
                  // value={updateForm.date}
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
              </div> */}
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
                  Ticket ID : {ticketDetails._id}
                </label>
                <label
                  htmlFor="department"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  User Name : {ticketDetails.userName}
                </label>
                <label
                  htmlFor="department"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  User Email : {ticketDetails.userEmail}
                </label>
                <label
                  htmlFor="department"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Company : {ticketDetails.userCompany}
                </label>
                <label
                  htmlFor="department"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Department : {ticketDetails.userDepartment}
                </label>
                <label
                  htmlFor="department"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  User Message : {ticketDetails.userMessage}
                </label>
                <label
                  htmlFor="department"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Status : {ticketDetails.status}
                </label>
                <label
                  htmlFor="department"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Assigned Member : {ticketDetails.assignedMember}
                </label>
                <label
                  htmlFor="department"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Date : {ticketDetails.date}
                </label>
                <label
                  htmlFor="department"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Time : {ticketDetails.time}
                </label>

                {/* <select
                  name="userDepartment"
                  // onChange={updateUpdateFormField}
                  // value={updateForm.userDepartment}
                  id="department"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option>Select</option>
                  <option>IT</option>
                  <option>Admin</option>
                  <option>HR</option>
                  <option>Tech</option>
                </select> */}
              </div>

              {/* <div className="sm:col-span-2">
                <label
                  htmlFor="cotherdetails"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Enter Message
                </label>
                <textarea
                  // onChange={updateUpdateFormField}
                  // value={updateForm.userMessage}
                  name="userMessage"
                  id="cotherdetails"
                  rows={8}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Please enter your message here"
                />
              </div> */}
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
            {/* <Button
              type="submit"
              color="blue"
              // onClick={() => setOpenDetailsModal(false)}
              onClick={updateTicket}>
              Save Changes
            </Button> */}
            <Button color="gray" onClick={() => setOpenDetailsModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

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
                  User email
                </th>
                <th scope="col" className="px-6 py-3">
                  Company
                </th>
                <th scope="col" className="px-6 py-3">
                  Department
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  Message
                </th> */}
                {/* <th scope="col" className="px-6 py-3">
                  Ticket ID
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Full Details
                </th>
                <th scope="col" className="px-6 py-3">
                  Assigned Member
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  Assign Member
                </th> */}
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
                        {ticket.userEmail}
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {ticket.userCompany}
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {ticket.userDepartment}
                      </th>
                      {/* <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {ticket.userMessage}
                      </th> */}
                      {/* <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {ticket._id}
                      </th> */}

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
                        {ticket.status}
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <Button
                          size="xs"
                          color="blue"
                          onClick={() => {
                            toggleTicketDetails(ticket);
                            setOpenDetailsModal(true);
                          }}>
                          View Full Details
                        </Button>
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {/* {ticket.assignedMember} */}
                        {ticket.assignedMember === "No available member" ? (
                          <Button
                            size="xs"
                            color="blue"
                            // onClick={() => handleAssignMember(ticket._id)}
                            // onClick={() => setOpenModal(true)}
                            onClick={() => {
                              toggleAssignMemberForm(ticket);
                              setOpenModal(true);
                            }}>
                            Assign Member
                          </Button>
                        ) : (
                          ticket.assignedMember
                        )}
                      </th>
                      {/* <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <Link
                          to={`/assign-member/${ticket._id}`}
                          className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          Assign Member
                        </Link>
                      </th> */}
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

export default AdminTickets;
