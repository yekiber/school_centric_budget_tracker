/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Fixed file path issue
  ],
  theme: {
    extend: {
      // Custom font family
      fontFamily: {
        outfit: ["Outfit", "sans-serif"], // Add Outfit font globally
      },
      
      // Keyframes for animations
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "50%": { transform: "translateX(5px)" },
          "75%": { transform: "translateX(-5px)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },

      // Animation utilities
      animation: {
        shake: "shake 0.5s ease-in-out infinite",
        gradient: "gradient 5s ease infinite",
        float: "float 3s ease-in-out infinite",
      },
    },

    // Responsive breakpoints
    screens: {
      sm: "640px",    // Small screens (phones)
      md: "768px",    // Medium screens (tablets)
      lg: "1024px",   // Large screens (laptops)
      xl: "1280px",   // Extra large screens (desktops)
      "2xl": "1536px", // 2X large screens (large desktops)
    },
  },
  plugins: [], // Ensure plugins array is correctly placed
};
