require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const path = require(`path`);
module.exports = {
  siteMetadata: {
    title: `2020 Summer Health Challenge`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `2020 Health Challenge`,
        short_name: `2020 Challenge`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#c53030`,
        display: `standalone`,
        icon: `src/images/favicon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/app/*`] },
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        features: {
          auth: true,
          database: true,
          firestore: true,
          storage: false,
          messaging: false,
          functions: false,
          performance: false,
        },
      },
    },
  ],
};
