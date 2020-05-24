import React from "react";
import Layout from "../components/Layout";
import View from "../components/View";
import Status from "../components/Status";
import PropTypes from "prop-types";
import { isLoggedIn } from "../utils/auth";
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

const Index = () => (
  <Layout>
    <Status />
    {isLoggedIn() ? <UserDashboard /> : <PromptLogin />}
  </Layout>
);

export default Index;
