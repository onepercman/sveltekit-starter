<script lang="ts">
	import { useAuthState } from "$lib/modules/auth/auth-store";
	import { Mail, Lock, AlertCircle, Eye, EyeOff } from "@lucide/svelte";
	import { cn } from "$lib/shared/utils";

	// Reactive form state with Svelte 5 runes
	let email = $state("");
	let password = $state("");
	let showPassword = $state(false);

	// Use auth state hook for reactive access
	const { user, isLoading, error, actions } = useAuthState();

	// Form validation with derived state
	const isValid = $derived(email.length > 0 && password.length > 0);

	async function handleSubmit() {
		if (!isValid) return;

		await actions.login({ email, password });
	}

	function togglePassword() {
		showPassword = !showPassword;
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === "Enter" && isValid) {
			handleSubmit();
		}
	}
</script>

<div class="w-full space-y-6">
	<div class="space-y-2">
		<h2 class="text-2xl font-bold text-fg">Welcome back</h2>
		<p class="text-sm text-muted-fg">
			Sign in to your account to continue
		</p>
	</div>

	<form
		class={cn("space-y-4", isLoading && "opacity-50")}
		onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}
	>
		<!-- Email Field -->
		<div class="space-y-2">
			<label for="email" class="text-sm font-medium text-fg flex items-center gap-2">
				<Mail class="h-4 w-4" />
				Email
			</label>
			<div class="relative">
				<input
					id="email"
					name="email"
					type="email"
					required
					autocomplete="email"
					bind:value={email}
					class="w-full rounded-md border border-border bg-bg px-3 py-2 pl-10 text-sm text-fg placeholder:text-muted-fg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
					placeholder="you@example.com"
					disabled={isLoading}
					onkeydown={handleKeyDown}
				/>
				<Mail class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-fg" />
			</div>
		</div>

		<!-- Password Field -->
		<div class="space-y-2">
			<label for="password" class="text-sm font-medium text-fg flex items-center gap-2">
				<Lock class="h-4 w-4" />
				Password
			</label>
			<div class="relative">
				<input
					id="password"
					name="password"
					type={showPassword ? "text" : "password"}
					required
					autocomplete="current-password"
					bind:value={password}
					class="w-full rounded-md border border-border bg-bg px-3 py-2 pl-10 pr-10 text-sm text-fg placeholder:text-muted-fg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
					placeholder="••••••••"
					disabled={isLoading}
					onkeydown={handleKeyDown}
				/>
				<Lock class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-fg" />
				<button
					type="button"
					class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-fg hover:text-fg transition-colors"
					onclick={togglePassword}
					disabled={isLoading}
				>
					{#if showPassword}
						<EyeOff class="h-4 w-4" />
					{:else}
						<Eye class="h-4 w-4" />
					{/if}
				</button>
			</div>
		</div>

		<!-- Submit Button -->
		<button
			type="submit"
			class="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-fg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
			disabled={!isValid || isLoading}
		>
			{#if isLoading}
				<div class="h-4 w-4 animate-spin rounded-full border-2 border-primary-fg border-t-transparent"></div>
				<span>Signing in...</span>
			{:else}
				<span>Sign in</span>
			{/if}
		</button>

		<!-- Error Message -->
		{#if error}
			<div class="rounded-md bg-danger/10 border border-danger/20 px-3 py-3 text-sm text-danger flex items-start gap-2">
				<AlertCircle class="h-4 w-4 mt-0.5 flex-shrink-0" />
				<span>{error}</span>
			</div>
		{/if}
	</form>

	<!-- Additional Options -->
	<div class="flex items-center justify-between text-sm">
		<label class="flex items-center gap-2 text-muted-fg hover:text-fg cursor-pointer">
			<input type="checkbox" class="rounded border-border" />
			<span>Remember me</span>
		</label>
		<a href="/forgot-password" class="text-primary hover:text-primary/80 transition-colors">
			Forgot password?
		</a>
	</div>
</div>
