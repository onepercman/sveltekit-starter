import { BaseService } from "$lib/shared/services/base-service";
import { axiosInstance, type ApiResponse } from "$lib/shared/lib/axios";
import { Config } from "$lib/shared/config/environment";
import type { User, LoginRequest, LoginResponse, RegisterRequest } from "$lib/modules/auth/auth-types";

/**
 * Authentication service
 * Handles all authentication-related API calls with proper error handling
 * Integrates with the centralized axios instance for consistent API communication
 */
class AuthService extends BaseService {
	constructor() {
		super("/auth");
	}

	/**
	 * Login user with credentials
	 * @param credentials User login credentials
	 * @returns Login response with user data and token
	 */
	async login(credentials: LoginRequest): Promise<LoginResponse> {
		const response = await axiosInstance.post<ApiResponse<LoginResponse>>(
			`${this.apiPath}/login`,
			credentials
		);

		if (!response.data.success) {
			throw new Error(response.data.message || "Login failed");
		}

		return response.data.data!;
	}

	/**
	 * Register new user
	 * @param userData User registration data
	 * @returns Login response with user data and token
	 */
	async register(userData: RegisterRequest): Promise<LoginResponse> {
		const response = await axiosInstance.post<ApiResponse<LoginResponse>>(
			`${this.apiPath}/register`,
			userData
		);

		if (!response.data.success) {
			throw new Error(response.data.message || "Registration failed");
		}

		return response.data.data!;
	}

	/**
	 * Refresh authentication token
	 * @returns New token response
	 */
	async refreshToken(): Promise<{ token: string }> {
		const response = await axiosInstance.post<ApiResponse<{ token: string }>>(
			`${this.apiPath}/refresh`
		);

		if (!response.data.success) {
			throw new Error(response.data.message || "Token refresh failed");
		}

		return response.data.data!;
	}

	/**
	 * Logout user (server-side)
	 * Removes token from server and invalidates session
	 */
	async logout(): Promise<void> {
		await axiosInstance.post(`${this.apiPath}/logout`);
	}

	/**
	 * Get current user profile
	 * @returns Current user data
	 */
	async getProfile(): Promise<User> {
		const response = await axiosInstance.get<ApiResponse<User>>(`${this.apiPath}/profile`);

		if (!response.data.success) {
			throw new Error(response.data.message || "Failed to fetch profile");
		}

		return response.data.data!;
	}

	/**
	 * Update user profile
	 * @param data Partial user data to update
	 * @returns Updated user data
	 */
	async updateProfile(data: Partial<User>): Promise<User> {
		const response = await axiosInstance.patch<ApiResponse<User>>(
			`${this.apiPath}/profile`,
			data
		);

		if (!response.data.success) {
			throw new Error(response.data.message || "Failed to update profile");
		}

		return response.data.data!;
	}

	/**
	 * Change user password
	 * @param oldPassword Current user password
	 * @param newPassword New password to set
	 */
	async changePassword(oldPassword: string, newPassword: string): Promise<void> {
		const response = await axiosInstance.post<ApiResponse<void>>(
			`${this.apiPath}/change-password`,
			{ oldPassword, newPassword }
		);

		if (!response.data.success) {
			throw new Error(response.data.message || "Failed to change password");
		}
	}

	/**
	 * Request password reset email
	 * @param email User email address
	 */
	async forgotPassword(email: string): Promise<void> {
		const response = await axiosInstance.post<ApiResponse<void>>(
			`${this.apiPath}/forgot-password`,
			{ email }
		);

		if (!response.data.success) {
			throw new Error(response.data.message || "Failed to send reset email");
		}
	}

	/**
	 * Reset password with token
	 * @param token Password reset token
	 * @param newPassword New password
	 */
	async resetPassword(token: string, newPassword: string): Promise<void> {
		const response = await axiosInstance.post<ApiResponse<void>>(
			`${this.apiPath}/reset-password`,
			{ token, newPassword }
		);

		if (!response.data.success) {
			throw new Error(response.data.message || "Failed to reset password");
		}
	}

	/**
	 * Verify email with token
	 * @param token Email verification token
	 */
	async verifyEmail(token: string): Promise<void> {
		const response = await axiosInstance.post<ApiResponse<void>>(
			`${this.apiPath}/verify-email`,
			{ token }
		);

		if (!response.data.success) {
			throw new Error(response.data.message || "Failed to verify email");
		}
	}

	/**
	 * Enable two-factor authentication
	 * @returns TOTP secret and QR code data
	 */
	async enableTwoFactor(): Promise<{ secret: string; qrCode: string }> {
		const response = await axiosInstance.post<ApiResponse<{ secret: string; qrCode: string }>>(
			`${this.apiPath}/2fa/enable`
		);

		if (!response.data.success) {
			throw new Error(response.data.message || "Failed to enable 2FA");
		}

		return response.data.data!;
	}

	/**
	 * Disable two-factor authentication
	 * @param password User password for verification
	 */
	async disableTwoFactor(password: string): Promise<void> {
		const response = await axiosInstance.post<ApiResponse<void>>(
			`${this.apiPath}/2fa/disable`,
			{ password }
		);

		if (!response.data.success) {
			throw new Error(response.data.message || "Failed to disable 2FA");
		}
	}
}

// Export singleton instance for consistent service access across the application
export const authService = new AuthService();
