<script lang="ts">
import {
	ArrowRight,
	Check,
	Code,
	Github,
	Mail,
	Rocket,
	Shield,
	Sparkles,
	Twitter,
	Zap,
} from "@lucide/svelte"
import { ThemeToggle } from "$lib/shared/components"
import { Button } from "$lib/shared/components/ui"
</script>

<!-- Hero Section -->
<section class="relative min-h-screen bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
	<!-- Theme Toggle -->
	<div class="absolute top-6 right-6 z-50">
		<ThemeToggle size="md" />
	</div>

	<!-- Animated Background -->
	<div class="absolute inset-0 overflow-hidden pointer-events-none">
		<div class="absolute top-1/4 -left-48 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
		<div class="absolute bottom-1/4 -right-48 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
	</div>

	<div class="relative container mx-auto px-6 pt-32 pb-20">
		<div class="max-w-4xl mx-auto text-center space-y-8">
			<!-- Badge -->
			<div class="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
				<Sparkles class="h-4 w-4 text-primary" />
				<span class="text-sm font-medium text-primary">Powered by Svelte 5</span>
			</div>

			<!-- Heading -->
			<div class="space-y-6">
				<h1 class="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
					Build Beautiful
					<span class="block mt-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
						Landing Pages
					</span>
				</h1>
				<p class="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
					A modern SvelteKit starter template with production-ready patterns, stunning UI components, and best practices built-in.
				</p>
			</div>

			<!-- CTA Buttons -->
			<div class="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
				<Button size="lg" class="group">
					Get Started
					<ArrowRight class="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
				</Button>
				<Button variant="outline" size="lg">
					<Github class="mr-2 h-4 w-4" />
					View on GitHub
				</Button>
			</div>

			<!-- Stats -->
			<div class="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
				<div class="space-y-1">
					<div class="text-3xl font-bold text-foreground">10K+</div>
					<div class="text-sm text-muted-foreground">Downloads</div>
				</div>
				<div class="space-y-1">
					<div class="text-3xl font-bold text-foreground">4.9★</div>
					<div class="text-sm text-muted-foreground">Rating</div>
				</div>
				<div class="space-y-1">
					<div class="text-3xl font-bold text-foreground">100%</div>
					<div class="text-sm text-muted-foreground">Open Source</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Scroll Indicator -->
	<div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
		<div class="w-6 h-10 border-2 border-muted-foreground/20 rounded-full flex justify-center p-1">
			<div class="w-1 h-3 bg-primary rounded-full animate-pulse"></div>
		</div>
	</div>
</section>

<!-- Features Section -->
<section class="py-24 px-6 bg-muted/30">
	<div class="container mx-auto max-w-6xl">
		<!-- Section Header -->
		<div class="text-center space-y-4 mb-16">
			<div class="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
				<Zap class="h-4 w-4 text-primary" />
				<span class="text-sm font-medium text-primary">Features</span>
			</div>
			<h2 class="text-4xl md:text-5xl font-bold">Everything You Need</h2>
			<p class="text-xl text-muted-foreground max-w-2xl mx-auto">
				Built with modern tools and best practices to help you ship faster
			</p>
		</div>

		<!-- Feature Grid -->
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			<!-- Feature 1 -->
			<div class="group p-6 bg-background rounded-2xl border hover:border-primary/50 hover:shadow-lg transition-all duration-200">
				<div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
					<Rocket class="h-6 w-6 text-primary" />
				</div>
				<h3 class="text-xl font-semibold mb-2">Lightning Fast</h3>
				<p class="text-muted-foreground leading-relaxed">
					Built on Vite and SvelteKit for instant HMR and blazing fast builds. Ship performant apps by default.
				</p>
			</div>

			<!-- Feature 2 -->
			<div class="group p-6 bg-background rounded-2xl border hover:border-primary/50 hover:shadow-lg transition-all duration-200">
				<div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
					<Shield class="h-6 w-6 text-primary" />
				</div>
				<h3 class="text-xl font-semibold mb-2">Type Safe</h3>
				<p class="text-muted-foreground leading-relaxed">
					Full TypeScript support with strict type checking. Catch errors before they reach production.
				</p>
			</div>

			<!-- Feature 3 -->
			<div class="group p-6 bg-background rounded-2xl border hover:border-primary/50 hover:shadow-lg transition-all duration-200">
				<div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
					<Code class="h-6 w-6 text-primary" />
				</div>
				<h3 class="text-xl font-semibold mb-2">Modern Stack</h3>
				<p class="text-muted-foreground leading-relaxed">
					Svelte 5 runes, Tailwind CSS, shadcn-svelte components, and more. Best tools for the job.
				</p>
			</div>

			<!-- Feature 4 -->
			<div class="group p-6 bg-background rounded-2xl border hover:border-primary/50 hover:shadow-lg transition-all duration-200">
				<div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
					<Sparkles class="h-6 w-6 text-primary" />
				</div>
				<h3 class="text-xl font-semibold mb-2">Beautiful UI</h3>
				<p class="text-muted-foreground leading-relaxed">
					Pre-built components with dark mode, animations, and accessible design patterns out of the box.
				</p>
			</div>

			<!-- Feature 5 -->
			<div class="group p-6 bg-background rounded-2xl border hover:border-primary/50 hover:shadow-lg transition-all duration-200">
				<div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
					<Zap class="h-6 w-6 text-primary" />
				</div>
				<h3 class="text-xl font-semibold mb-2">DX Focused</h3>
				<p class="text-muted-foreground leading-relaxed">
					Hot reload, TypeScript, ESLint, Prettier, and more. Everything configured for the best developer experience.
				</p>
			</div>

			<!-- Feature 6 -->
			<div class="group p-6 bg-background rounded-2xl border hover:border-primary/50 hover:shadow-lg transition-all duration-200">
				<div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
					<Check class="h-6 w-6 text-primary" />
				</div>
				<h3 class="text-xl font-semibold mb-2">Production Ready</h3>
				<p class="text-muted-foreground leading-relaxed">
					SEO optimized, performance tested, and deployment ready. Launch your project with confidence.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="py-24 px-6 bg-gradient-to-br from-primary to-primary/80">
	<div class="container mx-auto max-w-4xl text-center space-y-8">
		<div class="space-y-4">
			<h2 class="text-4xl md:text-5xl font-bold text-primary-foreground">
				Ready to Build Something Amazing?
			</h2>
			<p class="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
				Join developers building modern web applications with SvelteKit and ship faster than ever.
			</p>
		</div>

		<div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
			<Button variant="secondary" size="lg" class="bg-background text-foreground hover:bg-background/90">
				Get Started Free
			</Button>
			<Button variant="outline" size="lg" class="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
				View Documentation
			</Button>
		</div>

		<!-- Social Proof -->
		<div class="pt-8 flex items-center justify-center gap-8 text-primary-foreground/80">
			<div class="flex items-center gap-2">
				<Check class="h-4 w-4" />
				<span class="text-sm">No credit card required</span>
			</div>
			<div class="flex items-center gap-2">
				<Check class="h-4 w-4" />
				<span class="text-sm">100% open source</span>
			</div>
		</div>
	</div>
</section>

<!-- Footer -->
<footer class="py-12 px-6 bg-background border-t">
	<div class="container mx-auto max-w-6xl">
		<div class="grid md:grid-cols-4 gap-8 mb-8">
			<!-- Brand -->
			<div class="space-y-4">
				<div class="flex items-center gap-2">
					<div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
						<Rocket class="h-5 w-5 text-primary-foreground" />
					</div>
					<span class="font-bold text-lg">SvelteKit</span>
				</div>
				<p class="text-sm text-muted-foreground">
					Build beautiful landing pages with modern tools and best practices.
				</p>
			</div>

			<!-- Links -->
			<div class="space-y-4">
				<h4 class="font-semibold">Product</h4>
				<ul class="space-y-2 text-sm text-muted-foreground">
					<li><a href="#" class="hover:text-foreground transition-colors">Features</a></li>
					<li><a href="#" class="hover:text-foreground transition-colors">Pricing</a></li>
					<li><a href="#" class="hover:text-foreground transition-colors">Changelog</a></li>
				</ul>
			</div>

			<div class="space-y-4">
				<h4 class="font-semibold">Resources</h4>
				<ul class="space-y-2 text-sm text-muted-foreground">
					<li><a href="#" class="hover:text-foreground transition-colors">Documentation</a></li>
					<li><a href="#" class="hover:text-foreground transition-colors">Examples</a></li>
					<li><a href="#" class="hover:text-foreground transition-colors">API Reference</a></li>
				</ul>
			</div>

			<div class="space-y-4">
				<h4 class="font-semibold">Connect</h4>
				<div class="flex gap-4">
					<a href="#" class="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
						<Github class="h-5 w-5" />
					</a>
					<a href="#" class="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
						<Twitter class="h-5 w-5" />
					</a>
					<a href="#" class="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
						<Mail class="h-5 w-5" />
					</a>
				</div>
			</div>
		</div>

		<div class="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
			<p>© 2024 SvelteKit Starter. All rights reserved.</p>
			<div class="flex gap-6">
				<a href="#" class="hover:text-foreground transition-colors">Privacy</a>
				<a href="#" class="hover:text-foreground transition-colors">Terms</a>
				<a href="#" class="hover:text-foreground transition-colors">Cookies</a>
			</div>
		</div>
	</div>
</footer>
