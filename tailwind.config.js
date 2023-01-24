/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
    "!./node_modules", // 
  ],
  theme: {
    fontSize: {
      H1font: ["3.7rem", {}],
      textFont: [
        "1.5rem",
        {
          lineHeight: "2.1rem",
      
        },
      ],
    
    },

    extend: {
      screens: {
        'nl': '800px',
       
      },
      height:{
        '80vh': "80vh",
      },
      maxWidth: {
        '46rem': '46rem',
      },

      colors: {
        "lightBeige": "#F7F3EB",
        
      },
    },
  },
  plugins: [],
};
