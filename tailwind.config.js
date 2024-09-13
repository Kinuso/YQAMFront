/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#FFFFF7",
        tomato: "#ED5945",
        melon: "#F6ACA2",
        lightJet: "#585054",
        darkJet: "#383235",
      },
      fontFamily: {
        Fontin: ["Fontin"],
        Montserrat: ["Montserrat"],
      },
      backgroundImage: {
        backGroundhomepage: "url('assets/image/backGroundhomepage.jpg')",
      },
    },
  },
  plugins: [],
};
