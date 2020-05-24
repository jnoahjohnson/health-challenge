import React from "react";
import { Link } from "gatsby";

const Header = () => (
  <div className="w-full items-center justify-between bg-red-700 ">
    <nav className="w-11/12 mx-auto flex items-center justify-between p-6 bg-transparent max-w-screen-lg">
      <div className="items-left w-1/2 text-white mr-6 text-left">
        <span className="font-semibold text-xl">2020 Health Challenge</span>
      </div>
      <div className="w-1/2 mt-1 text-md flex flex-row-reverse">
        <Link to="/app/profile">
          <a className="block text-white hover:text-grey-500 mr-4">
            Leaderboard
          </a>
        </Link>
        <Link to="/">
          <a className="block text-white hover:text-grey-500 mr-4">Home</a>
        </Link>
      </div>
    </nav>
  </div>
);

export default Header;
