/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'finoscale-blue': '#0056b3', 
        'table-header': '#f2f4f7',
      },
    },
  },
  plugins: [],
}