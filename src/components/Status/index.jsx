import React from "react";
import { Link, navigate } from "@reach/router";
import { getUser, isLoggedIn, logout } from "../../utils/auth";

export default () => {
  let details;
  if (!isLoggedIn()) {
    details = (
      <p className="text-right px-5 max-w-screen-lg">
        <Link to="/app/login">
          <u>Log in</u>
        </Link>
      </p>
    );
  } else {
    const { displayName, email } = getUser();
    details = (
      <p className="text-right px-5 ">
        Logged in as {displayName} ({email}
        )!
        {` `}
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            logout().then(() => navigate(`/app/login`));
          }}
        >
          <u>Log out</u>
        </a>
      </p>
    );
  }

  return <div className="bg-red-800 text-white py-1 ">{details}</div>;
};
