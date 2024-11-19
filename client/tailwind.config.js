export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Fira Code"', "monospace"], // Override the default sans-serif font
      },
    },
  },
  plugins: [],
};
