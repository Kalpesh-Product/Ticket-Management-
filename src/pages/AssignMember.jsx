import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import ExtraSpace from "../components/ExtraSpace";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AssignMember = () => {
  const params = useParams();
  const navigate = useNavigate();

  //   const [tickets, setTickets] = useState([]);

  const [updateForm, setUpdateForm] = useState({
    _id: null,
    assignedMember: "",
  });

  // change input values while updating
  const handleUpdateFieldChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setUpdateForm({
      ...updateForm,
      [name]: value,
    });
  };

  // function to update ticket
  const AssignMember = async (e) => {
    e.preventDefault();

    const newUpdatedTicketName = updateForm.assignedMember;

    // send the update request
    const responseFromBackend = await axios.put(
      `/update-assign-member/${params.id}`,
      {
        assignedMember: newUpdatedTicketName,
      }
    );

    // clear update form state
    setUpdateForm({
      _id: null,
      assignedMember: "",
    });

    // navigate to list of tickets
    navigate("/admin-tickets");
  };

  return (
    <Layout>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            to="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            Assign Member
          </Link>
          <div className="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Assign A Member To The Ticket
              </h1>
              <form onSubmit={AssignMember} className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Select a member
                  </label>
                  <select
                    name="assignedMember"
                    onChange={handleUpdateFieldChange}
                    value={updateForm.assignedMember}
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option>Select</option>
                    <option value="a@email.com">Member A</option>
                    <option value="b@email.com">Member B</option>
                    <option value="c@email.com">Member C</option>
                    <option value="d@email.com">Member D</option>
                    <option value="e@email.com">Member E</option>
                    <option value="f@email.com">Member F</option>
                    <option value="h@email.com">Member G</option>
                    <option value="g@email.com">Member H</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Assign Member
                </button>
              </form>
            </div>
          </div>
        </div>
        <ExtraSpace />
      </section>
    </Layout>
  );
};

export default AssignMember;
