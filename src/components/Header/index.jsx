import React from "react";
import { Link } from "gatsby";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import LoginButton from "../LoginButton";

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fixed(width: 190) {
            ...GatsbyImageSharpFixed_noBase64
          }
        }
      }
    }
  `);

  return (
    <div className="w-full items-center justify-between bg-white">
      <nav className="w-11/12 mx-auto flex items-center justify-center md:flex-row md:justify-between flex-col p-6 bg-transparent max-w-screen-lg">
        {/* <div className="items-left w-1/2 text-white mr-6 text-left"> */}
        {/* <span className="font-semibold text-xl">2020 Health Challenge</span> */}

        {/* </div> */}
        <Img loading="eager" fixed={data.file.childImageSharp.fixed} />
        <div className="md:w-1/2 w-full mt-1 text-right flex items-center justify-center md:justify-end mt-4 md:mt-0 flex-wrap flex-row">
          <Link to="/">
            <h1 className="block text-blue text-lg hover:text-mahogany mr-4 mb-3 md:mb-0">
              Home
            </h1>
          </Link>
          <Link to="/app/profile">
            <h1 className="block text-blue text-lg hover:text-mahogany mr-4 mb-3 md:mb-0">
              Leaderboard
            </h1>
          </Link>
          <LoginButton />
        </div>
      </nav>
    </div>
  );
};

export default Header;
