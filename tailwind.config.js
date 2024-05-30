/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: "var(--font-inter)",
        geist: "var(--font-geist-sans)",
        ibm: "var(--font-ibm)",
      },
      boxShadow: {
        confetti:
          "0px 0px 0px 1px #e2e8f0, 0px 1px 2px 0px rgba(0,0,0,.05), 0px -1px 1px 0px rgba(0,0,0,.05) inset,0px 1px 1px 0px hsla(0,0%,100%,.02) inset",
        input: `0px 1px 0px -1px rgba(0,0,0,0.05) inset, 0px 0px 0px 0.5px rgba(25,28,33,0.02) inset, 0px 0px 0px 0.5px rgba(25,28,33,0.08) inset`,
        badge: `0 0 #0000,0 0 #0000,0px 0px 0px 1px #94a3b8,0px 1px 2px 0px rgba(0,0,0,.13), 0px -1px 1px 0px rgba(0,0,0,.2) inset,0px 1px 1px 0px hsla(0,0%,100%,.05) inset`,
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
