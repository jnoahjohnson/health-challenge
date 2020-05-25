import React from "react";
import { Link } from "gatsby";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fixed(width: 190) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  return (
    <div className="w-full items-center justify-between bg-gray-100 ">
      <nav className="w-11/12 mx-auto flex items-center justify-between p-6 bg-transparent max-w-screen-lg">
        {/* <div className="items-left w-1/2 text-white mr-6 text-left"> */}
        {/* <span className="font-semibold text-xl">2020 Health Challenge</span> */}

        {/* </div> */}
        <Img fixed={data.file.childImageSharp.fixed} />
        <div className="w-1/2 mt-1 text-md flex flex-row-reverse">
          <Link to="/app/profile">
            <a className="block text-black hover:text-grey-500 mr-4">
              Leaderboard
            </a>
          </Link>
          <Link to="/">
            <a className="block text-black hover:text-grey-500 mr-4">Home</a>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
