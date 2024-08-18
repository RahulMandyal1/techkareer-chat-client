// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#EC6243",
        secondary: "#F6F6F6",
        tertiary: "#6E6E6E",
        dark: "#292929",
      },
    },
  },
  plugins: [
    // ...
    require("@tailwindcss/forms"),
  ],
}
