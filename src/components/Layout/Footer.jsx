import React from "react";

const Footer = () => {
  return (
    <footer className=" bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2024&nbsp;
        <a href="https://flowbite.com/" className="hover:underline">
          {/* Ticket Manager™ */}
          WoNo
        </a>
        . All Rights Reserved.
      </span>
    </footer>
  );
};

export default Footer;
