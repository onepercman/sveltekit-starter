import axios, { type InternalAxiosRequestConfig, type AxiosError } from "axios";
import { Config } from "$lib/shared/config/environment";

/**
 * Axios instance configuration
 * Centralized HTTP client for API requests
 */
export const axiosInstance = axios.create({
	baseURL: Config.PUBLIC_API_URL,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

/**
 * API response types
 */
export interface ApiResponse<T = unknown> {
	data: T;
	message?: string;
	success: boolean;
}

export interface PaginationParams {
	page?: number;
	limit?: number;
}

export interface PaginatedResponse<T> {
	items: T[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

// Request interceptor for adding auth token (if needed)
axiosInstance.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		// Add auth token if available
		// const token = getAuthToken();
		// if (token) {
		//   config.headers.Authorization = `Bearer ${token}`;
		// }
		return config;
	},
	(error: AxiosError) => Promise.reject(error)
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
	(response) => response,
	(error: AxiosError) => {
		// Handle common errors here
		if (error.response?.status === 401) {
			// Handle unauthorized access
		}
		return Promise.reject(error);
	}
);
