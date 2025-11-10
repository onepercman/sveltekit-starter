import { createBaseStore } from "$lib/shared/stores/base-store.svelte";
import { authService } from "$lib/modules/auth/auth-service";
import type { User, LoginRequest, LoginResponse, RegisterRequest } from "$lib/modules/auth/auth-types";

/**
 * Authentication store using Svelte 5 runes
 * Follows the pattern of selecting specific fields rather than the entire store
 * Implements singleton pattern for global state management
 */
class AuthStore {
	private static instance: AuthStore;

	private userStore = createBaseStore<User>(null);
	private tokenStore = createBaseStore<string>(null);

	/**
	 * Get user state - follow pattern of selecting specific fields
	 */
	get user() {
		return this.userStore;
	}

	/**
	 * Get token state
	 */
	get token() {
		return this.tokenStore;
	}

	/**
	 * Check if user is authenticated - derived state
	 */
	get isAuthenticated(): boolean {
		return !!this.userStore.data && !!this.tokenStore.data;
	}

	/**
	 * Get current user with derived data
	 */
	get currentUser() {
		const userData = this.userStore.data;
		const isAdmin = userData?.role === "admin";
		const displayName = userData?.name || userData?.email || "Unknown";

		return {
			user: userData,
			isAdmin,
			displayName,
		};
	}

	/**
	 * Login user with API integration
	 */
	async login(credentials: LoginRequest): Promise<void> {
		try {
			this.userStore.setLoading(true);
			this.userStore.clearError();
			this.tokenStore.clearError();

			// API call
			const response = await authService.login(credentials);
			
			// Update state
			this.userStore.setData(response.user);
			this.tokenStore.setData(response.token);

			// Persist to localStorage (client-side only)
			if (typeof window !== "undefined") {
				localStorage.setItem("auth_token", response.token);
				localStorage.setItem("auth_user", JSON.stringify(response.user));
			}
		} catch (error) {
			const message = error instanceof Error ? error.message : "Login failed";
			this.userStore.setError(message);
			this.tokenStore.setError(message);
		}
	}

	/**
	 * Register user with API integration
	 */
	async register(userData: RegisterRequest): Promise<void> {
		try {
			this.userStore.setLoading(true);
			this.userStore.clearError();
			this.tokenStore.clearError();

			// API call
			const response = await authService.register(userData);
			
			// Update state
			this.userStore.setData(response.user);
			this.tokenStore.setData(response.token);

			// Persist to localStorage (client-side only)
			if (typeof window !== "undefined") {
				localStorage.setItem("auth_token", response.token);
				localStorage.setItem("auth_user", JSON.stringify(response.user));
			}
		} catch (error) {
			const message = error instanceof Error ? error.message : "Registration failed";
			this.userStore.setError(message);
			this.tokenStore.setError(message);
		}
	}

	/**
	 * Logout user and clear persisted data
	 */
	logout(): void {
		// Clear state
		this.userStore.setData(null);
		this.tokenStore.setData(null);

		// Clear localStorage (client-side only)
		if (typeof window !== "undefined") {
			localStorage.removeItem("auth_token");
			localStorage.removeItem("auth_user");
		}
	}

	/**
	 * Refresh authentication token
	 */
	async refreshToken(): Promise<void> {
		try {
			const currentToken = this.tokenStore.data;
			if (!currentToken) {
				throw new Error("No token to refresh");
			}

			const response = await authService.refreshToken();
			
			// Update token only
			this.tokenStore.setData(response.token);
			
			// Update localStorage
			if (typeof window !== "undefined") {
				localStorage.setItem("auth_token", response.token);
				localStorage.setItem(
					"auth_user", 
					JSON.stringify(this.userStore.data)
				);
			}
		} catch (error) {
			const message = error instanceof Error ? error.message : "Token refresh failed";
			this.tokenStore.setError(message);
			// Force logout on refresh failure
			this.logout();
		}
	}

	/**
	 * Check if session is still valid and refresh if needed
	 */
	async verifySession(): Promise<void> {
		if (!this.isAuthenticated) {
			return;
		}

		try {
			// Verify current session
			const user = await authService.getProfile();
			this.userStore.setData(user);
		} catch {
			// Session invalid, logout
			this.logout();
		}
	}

	/**
	 * Clear errors
	 */
	clearErrors(): void {
		this.userStore.clearError();
		this.tokenStore.clearError();
	}

	/**
	 * Initialize store from persisted data
	 */
	private constructor() {
		// Initialize from localStorage on client side
		if (typeof window !== "undefined") {
			const storedToken = localStorage.getItem("auth_token");
			const storedUser = localStorage.getItem("auth_user");
			
			if (storedToken && storedUser) {
				try {
					this.tokenStore.setData(storedToken);
					this.userStore.setData(JSON.parse(storedUser));
				} catch {
					// Invalid stored data, clear it
					this.logout();
				}
			}
		}
	}

	/**
	 * Get singleton instance
	 */
	static getInstance(): AuthStore {
		if (!AuthStore.instance) {
			AuthStore.instance = new AuthStore();
		}
		return AuthStore.instance;
	}
}

// Export singleton instance for global state
export const authStore = AuthStore.getInstance();

// Type-safe reactive state access helpers
export function useAuthState() {
	return {
		user: authStore.user.data,
		isLoading: authStore.user.isLoading,
		error: authStore.user.error,
		isAuthenticated: authStore.isAuthenticated,
		currentUser: authStore.currentUser,
		actions: {
			login: authStore.login.bind(authStore),
			register: authStore.register.bind(authStore),
			logout: authStore.logout.bind(authStore),
			refreshToken: authStore.refreshToken.bind(authStore),
			verifySession: authStore.verifySession.bind(authStore),
			clearErrors: authStore.clearErrors.bind(authStore),
		},
	};
}
