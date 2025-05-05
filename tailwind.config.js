/** @type {import('nativewind').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                border: "#E5E7EB", // Fallback for hsl(var(--border))
                input: "#F9FAFB", // Fallback for hsl(var(--input))
                ring: "#3B82F6", // Fallback for hsl(var(--ring))
                background: "#FFFFFF",
                foreground: "#111827", // Fallback for hsl(var(--foreground))
                primary: "#B22222",
                secondary: "#FFE5E5",
                text: "#333333",
                textLight: "#666666",
                destructive: {
                    DEFAULT: "#EF4444",
                    foreground: "#FFFFFF",
                },
                muted: {
                    DEFAULT: "#E5E7EB",
                    foreground: "#6B7280",
                },
                accent: {
                    DEFAULT: "#6B7280",
                    foreground: "#FFFFFF",
                },
                popover: {
                    DEFAULT: "#FFFFFF",
                    foreground: "#374151",
                },
                card: {
                    DEFAULT: "#FFFFFF",
                    foreground: "#111827",
                },
            },
            borderRadius: {
                lg: "0.5rem",
                md: "calc(0.5rem - 2px)",
                sm: "calc(0.5rem - 4px)",
            },
            fontFamily: {
                sans: ["Inter-Regular", "sans-serif"],
                medium: ["Inter-Medium", "sans-serif"],
                bold: ["Inter-Bold", "sans-serif"],
            },
        },
    },
    plugins: [],
};
