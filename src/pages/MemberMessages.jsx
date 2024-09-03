import React from "react";
import Layout from "../components/Layout/Layout";
import MemberDashboardButton from "../components/MemberDashboardButton";
import MiddleBody from "../components/Layout/MiddleBody";

const MemberMessages = () => {
  return (
    <Layout>
      <MiddleBody>
        <MemberDashboardButton />
        <br />
        <br />
        <div className="mx-auto block max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions
          </p>
        </div>
      </MiddleBody>
    </Layout>
  );
};

export default MemberMessages;
