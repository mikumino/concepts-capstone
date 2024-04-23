/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {

    },
  },
  daisyui: {
    themes: [
        {
            dark: {
                ...require("daisyui/src/theming/themes")["dark"],
                "primary": "#1DB954",
                "secondary": "#2174d4",
                "base-100": "191414",
                "base-300": "141010",
                "base-content": "f6f4f4",
            }
        }
    ]
  },
  plugins: [require("daisyui")],
};
