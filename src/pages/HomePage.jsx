import React from "react";
import { Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import MiddleBody from "../components/Layout/MiddleBody";
import ExtraSpace from "../components/ExtraSpace";

const HomePage = () => {
  return (
    <Layout>
      <MiddleBody>
        <section className="bg-white dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
              <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                Please select your role to continue
              </h2>
            </div>
            {/* <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0"> */}
            {/* <div className="space-y-8  sm:gap-6 "> */}
            <div className="space-y-8 sm:gap-6 sm:space-y-0 sm:flex sm:justify-center sm:gap-x-6">
              {/* Pricing Card */}
              <div className="min-w-[200px] flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                <Link
                  to="/login-user"
                  className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">
                  User
                </Link>
              </div>
              {/* Pricing Card */}
              <div className="min-w-[200px] flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                <Link
                  to="/login-admin"
                  className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">
                  Admin
                </Link>
              </div>
              {/* Pricing Card */}
              <div className="min-w-[200px] flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                <Link
                  to="/login-member"
                  className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">
                  Member
                </Link>
              </div>
            </div>
          </div>
        </section>

        <ExtraSpace />
        <ExtraSpace />
      </MiddleBody>
    </Layout>
  );
};

export default HomePage;
