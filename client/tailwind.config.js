/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('../src/assets/feature-img2-free-img.jpg')",
        "header-pattern": "url('../src/assets/AdobeStock_269478900.jpg')",
        "rescue-paws": "url(../src/assets/rescueChowPaws.jpg)",
        "who-section": "url(../src/assets/AdobeStock_156099814.jpg)",
      },
      colors: {
        "grey-223": "#DFDFDF",
      },
      fontFamily: {
        love: "'Lovers Quarrel', cursive",
      },
    },
  },
  plugins: [],
};
