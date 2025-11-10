/**
 * Environment configuration
 * Centralizes environment variables and configuration
 */

export const Config = {
	// Public environment variables (accessible on client and server)
	PUBLIC_API_URL: import.meta.env.PUBLIC_API_URL || "http://localhost:5173/api",
	PUBLIC_APP_NAME: import.meta.env.PUBLIC_APP_NAME || "SvelteKit App",

	// Server-only environment variables access
	// Use these in server-side code or API routes
	get PRIVATE_DATABASE_URL() {
		return import.meta.env.DATABASE_URL || "";
	},

	get PRIVATE_SECRET_KEY() {
		return import.meta.env.SECRET_KEY || "";
	},
} as const;

export type Config = typeof Config;
