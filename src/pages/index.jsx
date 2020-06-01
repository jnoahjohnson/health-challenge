import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Status from "../components/Status";
import { isLoggedIn } from "../utils/auth";
import { getVersion } from "../utils/data";
import PromptLogin from "../components/PromptLogin";
import UserDashboard from "../components/UserDashboard";

// const PrivateRoute = ({ component: Component, location, ...rest }) => {
//   if (!isLoggedIn() && location.pathname !== `/app/login`) {
//     // If we’re not logged in, redirect to the home page.
//     navigate(`/app/login`, { replace: true });
//     return null;
//   }

//   return <Component {...rest} />;
// };

// export default PrivateRoute;

const Index = () => {
  // useEffect(() => {
  //   const something = async () => {
  //     let remoteVersion = await getVersion();
  //     let localVersion = await window.localStorage.getItem("version");
  //     console.log("version: ", localVersion);
  //     if (
  //       localVersion === null ||
  //       localVersion === undefined ||
  //       localVersion !== remoteVersion
  //     ) {
  //       window.localStorage.removeItem("tasks");
  //       window.localStorage.removeItem("completed");
  //       window.localStorage.removeItem("weight");
  //       setVersion(remoteVersion);
  //     }

  //     window.localStorage.setItem("version", remoteVersion);
  //   };
  //   something();
  // }, []);
  return (
    <Layout>
      {/* <Status /> */}
      {isLoggedIn() ? <UserDashboard /> : <PromptLogin />}
    </Layout>
  );
};

export default Index;
