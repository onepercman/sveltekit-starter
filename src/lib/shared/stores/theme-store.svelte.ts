/**
 * Theme store for managing light/dark mode
 * Default to dark mode
 */

type Theme = "light" | "dark";

function createThemeStore() {
	let theme = $state<Theme>("dark");
	let mounted = $state(false);

	// Initialize theme from localStorage or default to dark
	if (typeof window !== "undefined") {
		const stored = localStorage.getItem("theme") as Theme | null;
		theme = stored || "dark";

		// Apply theme to document
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
		mounted = true;
	}

	function toggle() {
		theme = theme === "light" ? "dark" : "light";

		if (typeof window !== "undefined") {
			// Update localStorage
			localStorage.setItem("theme", theme);

			// Update document class
			if (theme === "dark") {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
		}
	}

	function setTheme(newTheme: Theme) {
		theme = newTheme;

		if (typeof window !== "undefined") {
			localStorage.setItem("theme", theme);

			if (theme === "dark") {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
		}
	}

	return {
		get theme() {
			return theme;
		},
		get mounted() {
			return mounted;
		},
		toggle,
		setTheme,
	};
}

export const themeStore = createThemeStore();
