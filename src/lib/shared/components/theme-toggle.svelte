<script lang="ts">
	import { themeStore } from "$lib/shared/stores/theme-store.svelte";
	import { Sun, Moon } from "@lucide/svelte";
	import { cn } from "$lib/shared/utils";

	interface Props {
		class?: string;
		size?: "sm" | "md" | "lg";
	}

	const { class: className, size = "md" }: Props = $props();

	const sizeClasses = {
		sm: "h-8 w-8",
		md: "h-10 w-10",
		lg: "h-12 w-12"
	};

	const iconSizes = {
		sm: "h-4 w-4",
		md: "h-5 w-5",
		lg: "h-6 w-6"
	};
</script>

<button
	type="button"
	onclick={() => themeStore.toggle()}
	class={cn(
		"relative inline-flex items-center justify-center rounded-full",
		"bg-background border border-border",
		"text-foreground hover:bg-muted",
		"transition-all duration-200",
		"focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
		sizeClasses[size],
		className
	)}
	aria-label="Toggle theme"
>
	{#if themeStore.mounted}
		<div class="relative {iconSizes[size]}">
			{#if themeStore.theme === "dark"}
				<Moon class={cn(iconSizes[size], "absolute inset-0 transition-all duration-200 rotate-0 scale-100")} />
			{:else}
				<Sun class={cn(iconSizes[size], "absolute inset-0 transition-all duration-200 rotate-0 scale-100")} />
			{/if}
		</div>
	{:else}
		<div class={cn(iconSizes[size], "animate-pulse bg-muted rounded")}></div>
	{/if}
</button>
