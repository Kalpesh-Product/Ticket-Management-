import React from "react";
import Layout from "../components/Layout/Layout";
import AdminDashboard from "../components/AdminDashboard";
import MiddleBody from "../components/Layout/MiddleBody";
import ExtraSpace from "../components/ExtraSpace";

const AdminMessages = () => {
  return (
    <Layout>
      <MiddleBody>
        <AdminDashboard />
        <br />
        <br />
        <div className="mx-auto block max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            ID: kjhjkhhkj
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Unable to resolve the issue
          </p>
        </div>
        <ExtraSpace />
        <ExtraSpace />
      </MiddleBody>
    </Layout>
  );
};

export default AdminMessages;
