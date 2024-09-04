import React, { useEffect, useState } from "react";

import MemberDashboardButton from "../components/MemberDashboardButton";
import MiddleBody from "../components/Layout/MiddleBody";
import ExtraSpace from "../components/ExtraSpace";
import axios from "axios";
import { Button, Modal } from "flowbite-react";
import { useParams } from "react-router-dom";
import LayoutMemberLoggedIn from "../components/Layout/LayoutMemberLoggedIn";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MemberAcceptedTickets = () => {
  const params = useParams();

  const [tickets, setTickets] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  // state to hold the values of inputs in cannot resolve popup
  const [cannotResolveForm, setCannotResolveForm] = useState({
    _id: null,
    memberMessageToAdmin: "",
  });

  // Function to get all tickets
  const fetchTickets = async () => {
    try {
      const responseFromBackend = await axios.get(
        `/get-member-accepted-tickets/${params.email}`
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

  // const closeTicket = () => {};
  const closeTicket = async (idOfTheTicketToBeClosed) => {
    const responseFromBackend = await axios.put(
      `/close-ticket/${idOfTheTicketToBeClosed}`
    );
    // console.log(responseFromBackend);

    // Update state
    // creating a duplicate of the tickets
    const newTickets = [...tickets];
    const ticketIndex = tickets.findIndex((ticket) => {
      return ticket._id === idOfTheTicketToBeClosed; // finds the index of the ticket which is updated (ticket whose id was in the button). We find the index so that we can update the ticket at that index
    });

    newTickets[ticketIndex] = responseFromBackend.data.ticket; // The ticket at that particular index is now equal to the response we got from updating the ticket

    setTickets(newTickets);
  };

  // const MemberCannotResolveTicket = async (
  //   idOfTheTicketWhichCannotBeResolved
  // ) => {
  //   const memberMessageToAdmin = cannotResolveForm.memberMessageToAdmin;

  //   const responseFromBackend = await axios.put(
  //     `/member-cannot-resolve-ticket/${idOfTheTicketWhichCannotBeResolved}`,
  //     {
  //       memberMessageToAdmin: memberMessageToAdmin,
  //     }
  //   );
  //   // console.log(responseFromBackend);

  //   // Update state
  //   // creating a duplicate of the tickets
  //   const newTickets = [...tickets];
  //   const ticketIndex = tickets.findIndex((ticket) => {
  //     return ticket._id === idOfTheTicketWhichCannotBeResolved; // finds the index of the ticket which is updated (ticket whose id was in the button). We find the index so that we can update the ticket at that index
  //   });

  //   newTickets[ticketIndex] = responseFromBackend.data.ticket; // The ticket at that particular index is now equal to the response we got from updating the ticket

  //   setTickets(newTickets);
  //   // fetchTickets();
  //   setOpenModal(false);

  //   setCannotResolveForm({
  //     _id: null,
  //     memberMessageToAdmin: "",
  //   });
  // };

  const MemberCannotResolveTicket = async (e) => {
    try {
      e.preventDefault();

      // User's selected reason
      // const userDepartment = updateForm.userDepartment;
      // const userMessage = updateForm.userMessage;

      const memberMessageToAdmin = cannotResolveForm.memberMessageToAdmin;

      // const responseFromBackend = await axios.put(
      //   `/user-edit-ticket/${updateForm._id}`,
      //   {
      //     userDepartment: userDepartment,
      //     userMessage: userMessage,
      //   }
      // );

      const responseFromBackend = await axios.put(
        `/member-cannot-resolve-ticket/${cannotResolveForm._id}`,
        {
          memberMessageToAdmin: memberMessageToAdmin,
        }
      );
      // console.log(responseFromBackend);

      // Update state
      // creating a duplicate of the tickets
      const newTickets = [...tickets];
      const ticketIndex = tickets.findIndex((ticket) => {
        return ticket._id === cannotResolveForm._id; // finds the index of the ticket which is updated (ticket whose id was in the button). We find the index so that we can update the ticket at that index
      });

      newTickets[ticketIndex] = responseFromBackend.data.ticket; // The ticket at that particular index is now equal to the response we got from updating the ticket

      setTickets(newTickets);

      setCannotResolveForm({
        _id: null,
        memberMessageToAdmin: "",
      });

      toast.success("Message sent successfully.");
      // Optionally, update the tickets state to remove the updated ticket

      setOpenModal(false);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send.");
    }
  };

  // const submitCannotResolveForm = (e) => {
  //   e.preventDefault();

  //   MemberCannotResolveTicket();
  // };

  // Function to update the state (ticket object) as the user types
  const updateCannotResolveFormField = (e) => {
    // console.log("typed");

    const target = e.target;
    const name = target.name;
    const value = target.value;

    setCannotResolveForm({
      ...cannotResolveForm,
      [name]: value,
    });

    // console.log({ name, value });
    // console.log(cannotResolveForm);
  };

  const toggleCannotResolveForm = (ticketToBeDisplayed) => {
    // Set state on update form
    setCannotResolveForm({
      memberMessageToAdmin: ticketToBeDisplayed.memberMessageToAdmin,

      _id: ticketToBeDisplayed._id,
    });
  };

  return (
    <LayoutMemberLoggedIn>
      <MiddleBody>
        <h2 className="mb-4 text-2xl text-center font-bold text-gray-900 dark:text-white">
          Member Dashboard
        </h2>

        {/* Modal Start */}
        <form>
          <Modal
            dismissible
            show={openModal}
            onClose={() => setOpenModal(false)}>
            {/* <form onSubmit={deleteTicket}> */}
            {/* <form onSubmit={submitCannotResolveForm}> */}
            <Modal.Header>Please Explain The Issue</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                {/* <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    Sign in to our platform
                  </h3> */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="memberMessageToAdmin"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Enter Message For The Admin
                  </label>
                  <textarea
                    onChange={updateCannotResolveFormField}
                    value={cannotResolveForm.memberMessageToAdmin}
                    name="memberMessageToAdmin"
                    id="memberMessageToAdmin"
                    rows={8}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Please enter your message here"
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                type="submit"
                color="blue"
                // onClick={() => setOpenModal(false)}
                onClick={MemberCannotResolveTicket}>
                Sumbit Message
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </form>
        {/* <MemberDashboardButton />
        <br /> */}
        <br />
        <h2 className="mb-5 text-xl text-center font-bold text-gray-900 dark:text-white">
          List Of Accepted Tickets
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
                  Change status
                </th>
                <th scope="col" className="px-6 py-3">
                  Not Being Resolved
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
                        {/* <button>Change to Closed</button> */}
                        <Button
                          onClick={() => closeTicket(ticket._id)}
                          size="xs"
                          color="success">
                          Mark as Closed
                        </Button>
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <Button
                          // onClick={() => cannotResolve(ticket._id)}
                          onClick={() => {
                            setOpenModal(true);
                            toggleCannotResolveForm(ticket);
                          }}
                          size="xs"
                          color="failure">
                          Cannot Resolve
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
    </LayoutMemberLoggedIn>
  );
};

export default MemberAcceptedTickets;
