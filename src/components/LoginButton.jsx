import React from "react";
import { navigate } from "@reach/router";
import { isLoggedIn, logout } from "../utils/auth";

const LoginButton = () => {
  const clickHandler = () => {
    if (isLoggedIn()) {
      logout().then(() => navigate(`/app/login`));
    } else {
      navigate(`/app/login`);
    }
  };
  return (
    <button
      onClick={clickHandler}
      className="bg-blue hover:bg-mahogany text-white font-bold py-2 px-4 rounded-full font-sans text-lg"
    >
      {isLoggedIn() ? "Log out" : "Log in"}
    </button>
  );
};

export default LoginButton;
