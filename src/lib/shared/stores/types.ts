/**
 * Common store types for reactive state management
 */

export interface StoreWithError<T> {
	data: T | null;
	error: string | null;
	isLoading: boolean;
}
