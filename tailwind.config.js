module.exports = {
	mode: 'jit',
	purge: [
		'src/pages/**/*.{js,ts,jsx,tsx}',
		'src/components/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
		fontFamily: {
			rpg: ['W95FA', 'ui-monospace'],
		},
		extend: {
			backgroundImage: (theme) => ({
				shop: 'url(/img/shopbg.png)',
			}),
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
