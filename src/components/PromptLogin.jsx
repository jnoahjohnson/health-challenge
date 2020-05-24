import React from "react";
import View from "./View";
import { Link } from "gatsby";

const PromptLogin = () => (
  <View title="Welcome">
    <p>
      We are excited to be doing the 2020 Summer Health challenge! Login using
      the button below to get started!
    </p>
    <br />
    <p class="text-center">
      <button
        class="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline self-center"
        type="button"
      >
        <Link to="/app/profile">Login</Link>
      </button>
    </p>
  </View>
);

export default PromptLogin;
