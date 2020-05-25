const tailwind = require("tailwindcss");

module.exports = () => ({
  plugins: [require("autoprefixer"), tailwind("./tailwind.config.js")],
});
