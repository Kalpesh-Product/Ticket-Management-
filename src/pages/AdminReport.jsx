import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";

import AdminDashboard from "../components/AdminDashboard";
import MiddleBody from "../components/Layout/MiddleBody";
import ExtraSpace from "../components/ExtraSpace";
import axios from "axios";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import { Button } from "flowbite-react";
import LayoutAdmin from "../components/Layout/LayoutAdmin";

const AdminReport = () => {
  const [tickets, setTickets] = useState([]);

  // Function to get all tickets
  const fetchTickets = async () => {
    try {
      const responseFromBackend = await axios.get("/get-all-tickets");

      setTickets(responseFromBackend.data.tickets);
    } catch (error) {
      console.log(error);
    }
  };

  // UseEffect to view tickets
  useEffect(() => {
    fetchTickets();
  }, []);

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

  const searchHandle = async (event) => {
    // console.log(event.target.value);

    let key = event.target.value;

    if (key) {
      let result = await fetch(`http://localhost:8080/search-by-time/${key}`);
      result = await result.json();
      if (result) {
        setTickets(result);
      }
    } else {
      fetchTickets();
    }
  };

  const searchByName = async (event) => {
    let key = event.target.value;

    if (key) {
      let result = await fetch(`http://localhost:8080/search-by-name/${key}`);
      result = await result.json();
      if (result) {
        setTickets(result);
      }
    } else {
      fetchTickets();
    }
  };

  const searchByCompany = async (event) => {
    let key = event.target.value;

    if (key) {
      let result = await fetch(
        `http://localhost:8080/search-by-company/${key}`
      );
      result = await result.json();
      if (result) {
        setTickets(result);
      }
    } else {
      fetchTickets();
    }
  };

  const searchByDepartment = async (event) => {
    let key = event.target.value;

    if (key) {
      let result = await fetch(
        `http://localhost:8080/search-by-department/${key}`
      );
      result = await result.json();
      if (result) {
        setTickets(result);
      }
    } else {
      fetchTickets();
    }
  };

  const searchByMember = async (event) => {
    let key = event.target.value;

    if (key) {
      let result = await fetch(`http://localhost:8080/search-by-member/${key}`);
      result = await result.json();
      if (result) {
        setTickets(result);
      }
    } else {
      fetchTickets();
    }
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
        <br />
        <div className="flex">
          <div className="mx-4">
            <label
              htmlFor="small-input"
              className="inline mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Search by name : &nbsp;
            </label>
            <input
              onChange={searchByName}
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
              onChange={searchByCompany}
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
              onChange={searchByDepartment}
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
              onChange={searchByMember}
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
              onChange={searchHandle}
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
                <th scope="col" className="px-6 py-3">
                  Message
                </th>
                <th scope="col" className="px-6 py-3">
                  Ticket ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
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
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {ticket.userMessage}
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {ticket._id}
                      </th>

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
