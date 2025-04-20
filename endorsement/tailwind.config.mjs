// tailwind.config.mjs
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        // Important: Add this if consumers will need to customize styles
        "./node_modules/crotus/dist/**/*.js"
    ],
    darkMode: 'class', // or 'media'
    theme: {
        extend: {
            // Your custom theme extensions
        },
    },
    plugins: [],
}