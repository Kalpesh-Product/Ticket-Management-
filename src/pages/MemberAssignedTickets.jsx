import React, { useEffect, useState } from "react";

import MemberDashboardButton from "../components/MemberDashboardButton";
import MiddleBody from "../components/Layout/MiddleBody";
import ExtraSpace from "../components/ExtraSpace";
import axios from "axios";
import { Button } from "flowbite-react";
import { useParams } from "react-router-dom";
import LayoutMemberLoggedIn from "../components/Layout/LayoutMemberLoggedIn";

const MemberAssignedTickets = () => {
  const params = useParams();

  const [tickets, setTickets] = useState([]);

  // Function to get all tickets
  const fetchTickets = async () => {
    try {
      const responseFromBackend = await axios.get(
        `/get-member-assigned-tickets/${params.email}`
      );

      setTickets(responseFromBackend.data.tickets);
    } catch (error) {
      console.log(error);
    }
  };

  // UseEffect to view tickets
  useEffect(() => {
    fetchTickets();
  }, []);

  //  Function to accept ticket
  const acceptTicket = async (idOfTheTicketToBeAccepted) => {
    const responseFromBackend = await axios.put(
      `/member-accept-ticket/${idOfTheTicketToBeAccepted}`
    );
    // console.log(responseFromBackend);

    // Update state
    // creating a duplicate of the tickets
    const newTickets = [...tickets];
    const ticketIndex = tickets.findIndex((ticket) => {
      return ticket._id === idOfTheTicketToBeAccepted; // finds the index of the ticket which is updated (ticket whose id was in the button). We find the index so that we can update the ticket at that index
    });

    newTickets[ticketIndex] = responseFromBackend.data.ticket; // The ticket at that particular index is now equal to the response we got from updating the ticket
    console.log(responseFromBackend.data.ticket);
    setTickets(newTickets);

    fetchTickets();
  };

  // const cannotResolve = async (idOfTheTicketToBeClosed) => {
  //   const responseFromBackend = await axios.put(
  //     `/cannot-resolve-ticket/${idOfTheTicketToBeClosed}`
  //   );
  //   // console.log(responseFromBackend);

  //   // Update state
  //   // creating a duplicate of the tickets
  //   const newTickets = [...tickets];
  //   const ticketIndex = tickets.findIndex((ticket) => {
  //     return ticket._id === idOfTheTicketToBeClosed; // finds the index of the ticket which is updated (ticket whose id was in the button). We find the index so that we can update the ticket at that index
  //   });

  //   newTickets[ticketIndex] = responseFromBackend.data.ticket; // The ticket at that particular index is now equal to the response we got from updating the ticket

  //   setTickets(newTickets);
  // };

  return (
    <LayoutMemberLoggedIn>
      <MiddleBody>
        <h2 className="mb-4 text-2xl text-center font-bold text-gray-900 dark:text-white">
          Member Dashboard
        </h2>
        {/* <MemberDashboardButton />
        <br /> */}
        <br />
        <h2 className="mb-5 text-xl text-center font-bold text-gray-900 dark:text-white">
          List Of Assigned Tickets
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
                <th scope="col" className="px-6 py-3">
                  Message
                </th>
                <th scope="col" className="px-6 py-3">
                  Ticket ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Date & Time
                </th>

                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  Change status
                </th>
                <th scope="col" className="px-6 py-3">
                  Not Being Resolved
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
                        <Button
                          onClick={() => acceptTicket(ticket._id)}
                          size="xs"
                          color="blue">
                          Accept Ticket
                        </Button>
                      </th>

                      {/* <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <Button
                          onClick={() => cannotResolve(ticket._id)}
                          size="xs"
                          color="failure">
                          Cannot Resolve
                        </Button>
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
    </LayoutMemberLoggedIn>
  );
};

export default MemberAssignedTickets;
