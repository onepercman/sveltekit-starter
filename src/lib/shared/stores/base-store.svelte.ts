import type { StoreWithError } from "$lib/shared/stores/types";

/**
 * Base store factory with Svelte 5 runes for reactive state management
 * @param initialData Initial data state
 * @returns Store with error and loading state management
 */
export function createBaseStore<T>(initialData: T | null = null) {
	let isLoading = $state(false);
	let error = $state<string | null>(null);
	let data = $state<T | null>(initialData);

	const clearError = () => {
		error = null;
	};

	const setLoading = (loading: boolean) => {
		isLoading = loading;
	};

	const setError = (errorMessage: string) => {
		error = errorMessage;
		isLoading = false;
	};

	const setData = (newData: T | null) => {
		data = newData;
		error = null;
		isLoading = false;
	};

	const reset = () => {
		data = initialData;
		error = null;
		isLoading = false;
	};

	// Return reactive store object
	return Object.freeze({
		// Reactive getters (Svelte 5 runes automatically make these reactive)
		get data() {
			return data;
		},
		get error() {
			return error;
		},
		get isLoading() {
			return isLoading;
		},
		// Actions
		setData,
		setError,
		clearError,
		setLoading,
		reset,
		// Utility method for loading state with data
		fetchAndSet: async (fetcher: () => Promise<T>) => {
			setLoading(true);
			try {
				const result = await fetcher();
				setData(result);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Unknown error");
			}
		},
	}) as StoreWithError<T> & {
		setData: (data: T | null) => void;
		setError: (error: string) => void;
		setLoading: (loading: boolean) => void;
		clearError: () => void;
		reset: () => void;
		fetchAndSet: (fetcher: () => Promise<T>) => Promise<void>;
	};
}

/**
 * Create a derived store with Svelte 5 runes
 * @param baseStore The base reactive store
 * @param deriveFn Function to derive new state from base state
 * @returns Derived store with computed values
 */
export function createDerivedStore<T, R>(
	baseStore: ReturnType<typeof createBaseStore<T>>,
	deriveFn: (data: T | null) => R | null
) {
	const derived = $derived(baseStore.data ? deriveFn(baseStore.data) : null);

	return {
		// Reactive getters
		get data() {
			return baseStore.data;
		},
		get derived() {
			return derived;
		},
		get error() {
			return baseStore.error;
		},
		get isLoading() {
			return baseStore.isLoading;
		},
	};
}
