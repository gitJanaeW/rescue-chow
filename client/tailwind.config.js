/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('../src/assets/feature-img2-free-img.jpg')",
        "header-pattern": "url('../src/assets/AdobeStock_269478900.jpg')",
      },
      colors: {
        "grey-223": "#DFDFDF",
      },
    },
  },
  plugins: [],
};
