import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: {
					darkest: "hsl(218, 100%, 17%)",
					dark: "hsl(215, 96%, 32%)",
					medium: "hsl(212, 92%, 43%)",
					light: " hsl(206, 93%, 73%)",
					lightest: " hsl(202, 100%, 95%)",
				},
				neutral: {
					darkest: "hsl(210, 24%, 16%)",
					dark: "hsl(209, 18%, 30%)",
					medium: "hsl(211, 10%, 58%)",
					light: "hsl(210, 16%, 82%)",
					lightest: "hsl(216, 33%, 97%)",
					white: "hsl(216, 33%, 100%)",
				},
				accent: {
					red: {
						darkest: "hsl(348, 94%, 20%)",
						dark: "hsl(352, 90%, 35%)",
						medium: "hsl(356, 75%, 53%)",
						light: "hsl(360, 91%, 69%)",
						lightest: "hsl(360, 100%, 94%)",
					},
					green: {
						darkest: "hsl(170, 97%, 15%)",
						dark: "hsl(166, 72%, 28%)",
						medium: "  hsl(160, 51%, 49%)",
						light: " hsl(156, 73%, 74%)",
						lightest: " hsl(152, 68%, 94%)",
					},
					yellow: {
						darkest: "hsl(36, 77%, 49%)",
						dark: "hsl(42, 87%, 55%)",
						medium: "hsl(44, 92%, 63%)",
						light: " hsl(48, 95%, 76%)",
						lightest: "hsl(49, 100%, 96%)",
					},
				},
			},
			animation: {
				dropdown: "fadeInTopRight 0.2s",
				fadeInLeftSlow: "fadeInLeft 0.3s",
				fadeInLeft: "fadeInLeft 0.1s forward",
			},
		},
	},
	plugins: [],
};
export default config;