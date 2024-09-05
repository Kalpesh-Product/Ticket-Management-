import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";

import AdminDashboard from "../components/AdminDashboard";
import MiddleBody from "../components/Layout/MiddleBody";
import ExtraSpace from "../components/ExtraSpace";
import axios from "axios";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import { Button, Modal } from "flowbite-react";
import LayoutAdmin from "../components/Layout/LayoutAdmin";

const AdminReport = () => {
  const [tickets, setTickets] = useState([]);

  // combined search
  const [nameFilter, setNameFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [memberFilter, setMemberFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const [openDetailsModal, setOpenDetailsModal] = useState(false);

  // Function to get all tickets
  const fetchTickets = async () => {
    try {
      const responseFromBackend = await axios.get("/get-all-tickets-sorted");

      setTickets(responseFromBackend.data.tickets);
    } catch (error) {
      console.log(error);
    }
  };

  // UseEffect to view tickets
  // useEffect(() => {
  //   fetchTickets();
  // }, []);
  useEffect(() => {
    // fetchTickets();
    searchTickets();
  }, [nameFilter, companyFilter, departmentFilter, memberFilter, dateFilter]);

  // Define headers for CSV (Optional)
  const headers = [
    { label: "User Name", key: "userName" },
    { label: "User Email", key: "userEmail" },
    { label: "Company", key: "userCompany" },
    { label: "Department", key: "userDepartment" },
    { label: "Message", key: "userMessage" },
    { label: "Ticket ID", key: "_id" },
    { label: "Date & Time", key: "createdAt" },
    { label: "Status", key: "status" },
    { label: "Assigned Member", key: "assignedMember" },
  ];

  // const searchHandle = async (event) => {
  //   // console.log(event.target.value);

  //   let key = event.target.value;

  //   if (key) {
  //     let result = await fetch(`http://localhost:8080/search-by-time/${key}`);
  //     result = await result.json();
  //     if (result) {
  //       setTickets(result);
  //     }
  //   } else {
  //     fetchTickets();
  //   }
  // };

  // const searchByName = async (event) => {
  //   let key = event.target.value;

  //   if (key) {
  //     let result = await fetch(`http://localhost:8080/search-by-name/${key}`);
  //     result = await result.json();
  //     if (result) {
  //       setTickets(result);
  //     }
  //   } else {
  //     fetchTickets();
  //   }
  // };

  // const searchByCompany = async (event) => {
  //   let key = event.target.value;

  //   if (key) {
  //     let result = await fetch(
  //       `http://localhost:8080/search-by-company/${key}`
  //     );
  //     result = await result.json();
  //     if (result) {
  //       setTickets(result);
  //     }
  //   } else {
  //     fetchTickets();
  //   }
  // };

  // const searchByDepartment = async (event) => {
  //   let key = event.target.value;

  //   if (key) {
  //     let result = await fetch(
  //       `http://localhost:8080/search-by-department/${key}`
  //     );
  //     result = await result.json();
  //     if (result) {
  //       setTickets(result);
  //     }
  //   } else {
  //     fetchTickets();
  //   }
  // };

  // const searchByMember = async (event) => {
  //   let key = event.target.value;

  //   if (key) {
  //     let result = await fetch(`http://localhost:8080/search-by-member/${key}`);
  //     result = await result.json();
  //     if (result) {
  //       setTickets(result);
  //     }
  //   } else {
  //     fetchTickets();
  //   }
  // };

  const searchTickets = async () => {
    let query = {};

    if (nameFilter) query.name = nameFilter;
    if (companyFilter) query.company = companyFilter;
    if (departmentFilter) query.department = departmentFilter;
    if (memberFilter) query.member = memberFilter;
    if (dateFilter) query.date = dateFilter;

    const queryString = new URLSearchParams(query).toString();

    let result = await fetch(
      `http://localhost:8080/search-tickets?${queryString}`
    );
    result = await result.json();

    if (result) {
      setTickets(result);
    }
  };

  // // Event handlers for each filter input
  // const handleNameChange = (event) => {
  //   setNameFilter(event.target.value);
  //   searchTickets();
  // };

  // const handleCompanyChange = (event) => {
  //   setCompanyFilter(event.target.value);
  //   searchTickets();
  // };

  // const handleDepartmentChange = (event) => {
  //   setDepartmentFilter(event.target.value);
  //   searchTickets();
  // };

  // const handleMemberChange = (event) => {
  //   setMemberFilter(event.target.value);
  //   searchTickets();
  // };

  // const handleDateChange = (event) => {
  //   setDateFilter(event.target.value);
  //   searchTickets();
  // };

  const handleNameChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleCompanyChange = (event) => {
    setCompanyFilter(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setDepartmentFilter(event.target.value);
  };

  const handleMemberChange = (event) => {
    setMemberFilter(event.target.value);
  };

  const handleDateChange = (event) => {
    setDateFilter(event.target.value);
  };

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
        {/* <AdminDashboard />
        <br />
        <br /> */}
        <h2 className="mb-5 text-2xl text-center font-bold text-gray-900 dark:text-white">
          Report Of Tickets Raised
        </h2>

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

        <br />
        <div className="flex">
          <div className="mx-4">
            <label
              htmlFor="small-input"
              className="inline mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Search by name : &nbsp;
            </label>
            <input
              // onChange={searchByName}
              onChange={handleNameChange}
              type="text"
              id="small-input"
              className=" p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="mx-4">
            <label
              htmlFor="small-input"
              className="inline mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Search by company : &nbsp;
            </label>
            <input
              // onChange={searchByCompany}
              onChange={handleCompanyChange}
              type="text"
              id="small-input"
              className=" p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="mx-4">
            <label
              htmlFor="small-input"
              className="inline mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Search by department : &nbsp;
            </label>
            <input
              // onChange={searchByDepartment}
              onChange={handleDepartmentChange}
              type="text"
              id="small-input"
              className=" p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="mx-4">
            <label
              htmlFor="small-input"
              className="inline mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Search by member : &nbsp;
            </label>
            <input
              // onChange={searchByMember}
              onChange={handleMemberChange}
              type="text"
              id="small-input"
              className=" p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="mx-4">
            <label
              htmlFor="small-input"
              className="inline mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Search by date : &nbsp;
            </label>
            <input
              // onChange={searchHandle}
              onChange={handleDateChange}
              type="date"
              id="small-input"
              className=" p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>

        <br />
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
                </th>
                <th scope="col" className="px-6 py-3">
                  Ticket ID
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Date
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
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {ticket._id}
                      </th> */}

                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {ticket.createdAt}
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
                        {ticket.assignedMember}
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
          <br />
          {/* button to export */}
          {/* <CSVLink
            data={tickets}
            headers={headers}
            filename={"tickets-report.csv"}
            className="mx-auto">
            <Button color="blue">Export Data</Button>
          </CSVLink> */}

          <Button color="blue">
            {" "}
            <CSVLink
              data={tickets}
              headers={headers}
              filename={"tickets-report.csv"}
              className="mx-auto">
              Export Data
            </CSVLink>
          </Button>

          {/* <CSVLink
            data={tickets}
            headers={headers}
            filename={"tickets.csv"}
            className="btn btn-primary">
            Export
          </CSVLink> */}

          <ExtraSpace />
          <ExtraSpace />
          <ExtraSpace />
        </div>
      </MiddleBody>
    </LayoutAdmin>
  );
};

export default AdminReport;
