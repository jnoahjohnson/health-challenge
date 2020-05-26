import React from "react";
import PropTypes from "prop-types";

const View = ({ title, children }) => (
  <div className="w-full bg-gray-100 rounded px-8 py-12 mb-4 h-auto">
    <div className="w-1/3"></div>
    <div className="bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4 md:mx-56 ">
      <h1 className="text-4xl font-bold text-mahogany">{title}</h1>

      <div className="my-2">{children}</div>
    </div>
    <div className="w-1/3"></div>
  </div>
);

View.propTypes = {
  title: PropTypes.string.isRequired,
};

export default View;
