import React from "react";
import { Link } from "gatsby";

const Header = () => (
  <div class="w-full items-center justify-between bg-red-700 ">
    <nav class="w-11/12 mx-auto flex items-center justify-between p-6 bg-transparent max-w-screen-lg">
      <div class="items-left w-1/2 text-white mr-6 text-left">
        <span class="font-semibold text-xl">2020 Health Challenge</span>
      </div>
      <div class="w-1/2 mt-1 text-md flex flex-row-reverse">
        <Link to="/app/profile">
          <a class="block text-white hover:text-grey-500 mr-4">Leaderboard</a>
        </Link>
        <Link to="/">
          <a class="block text-white hover:text-grey-500 mr-4">Home</a>
        </Link>
      </div>
    </nav>
  </div>
);

export default Header;
