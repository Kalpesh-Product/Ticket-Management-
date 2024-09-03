import React from "react";
import { Link } from "react-router-dom";
import MiddleBody from "./Layout/MiddleBody";

const MemberDashboardButton = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-2 px-4 mx-auto max-w-screen-xl lg:py-4 lg:px-6">
        {/* <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0"> */}
        <div className="space-y-8  sm:gap-6 ">
          <div className="flex flex-col p-6 mx-auto max-w-xs text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
            <Link
              to="/logout-member"
              className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-red-900">
              Logout
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemberDashboardButton;
