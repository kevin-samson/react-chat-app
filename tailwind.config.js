module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				chat: {
					header: "#383F44",
					list: "#2C2D2C",
					body: "#323333",
				},
				other: {
					chatB: "#333341",
					sbubble: "#665CFF",
					rbubble: "#383F44",
					darkb: "#2b2b2f",
					muted: "#adb5bd",
				},
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
