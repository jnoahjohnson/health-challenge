import React from "react";
import { Helmet } from "react-helmet";

import Header from "../Header";

// Global styles and component-specific styles.
import "./global.css";
import styles from "./main.module.css";

const Layout = ({ children }) => (
  <div>
    <Helmet title="2020 Health Challenge">
      <link rel="apple-touch-icon" sizes="114x114" href="apple-114.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="apple-72.png" />
      <link rel="apple-touch-icon" href="maskable-icon.png" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    </Helmet>
    <Header />
    <main className={styles.main}>{children}</main>
  </div>
);

export default Layout;
