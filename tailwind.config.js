/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',
    "/tw-elements/dist/js/**/*.js"
  ],
  variants: {
      inset: ["group-hover"],
    },
  theme: {
    extend: {},
    safelist: ['animate-[slide-in-up_1s_ease-in-out]']
  },
  plugins: [require("/tw-elements/dist/plugin.cjs")],
}

