import React from "react";

const MiddleBody = (props) => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
        {props.children}
      </div>
    </section>
  );
};

export default MiddleBody;
