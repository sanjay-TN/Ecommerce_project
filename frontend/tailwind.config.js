/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Sora"', "sans-serif"],
        body: ['"DM Sans"', "sans-serif"]
      },
      colors: {
        brand: {
          blue: "#0f59c7",
          yellow: "#f6c000",
          ink: "#172337",
          mist: "#eef3fb",
          sky: "#86c7ff",
          peach: "#ffd9ad"
        }
      },
      boxShadow: {
        soft: "0 18px 45px rgba(16, 72, 164, 0.12)",
        glow: "0 28px 80px rgba(15, 89, 199, 0.20)",
        panel: "0 18px 45px rgba(17, 24, 39, 0.08)"
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, rgba(11,54,117,0.98), rgba(15,89,199,0.96) 55%, rgba(59,163,255,0.92))",
        "panel-gradient": "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.74))",
        "mesh-warm": "radial-gradient(circle at 20% 20%, rgba(255,217,173,0.95), transparent 28%), radial-gradient(circle at 82% 14%, rgba(134,199,255,0.9), transparent 22%), linear-gradient(180deg, rgba(255,255,255,0.9), rgba(241,245,255,0.85))"
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        pulseSoft: "pulseSoft 4s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.75" },
          "50%": { opacity: "1" }
        }
      }
    }
  },
  plugins: []
};
