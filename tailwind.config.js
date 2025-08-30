// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#73ab35",   // Main color (greenish)
          secondary: "#f86113", // Secondary (orange)
        },
        text: {
          title: "#354c5c",     // Title color
          body: "#364c5c",      // Body text color
        },
        accent: {
          pink: "#ea1e79",      // Pink tags
          yellow: "#ffd819",    // Tags / review stars
          green: "#2cba6c",     // Extra green tags
          teal: "#33aba0",      // Light blue/teal tags
          blue: "#0070ba",      // Accent blue text
        },
        neutral: {
          line: "#dde1e8",      // Borders / lines
          background: "#ececec" // Backgrounds
        }
      },
    },
  },
  plugins: [],
};
