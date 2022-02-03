const plugin = require('tailwindcss/plugin');

const capitalizeFirst = plugin(function ({ addUtilities }) {
	const newUtilities = {
		'.capitalize-first:first-letter': {
			textTransform: 'uppercase',
		},
	};
	addUtilities(newUtilities, ['responsive', 'hover']);
});

module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {},
	variants: {
		extend: {
			backgroundColor: ['active'],
		},
	},
	plugins: [capitalizeFirst],
	important: true,
};
