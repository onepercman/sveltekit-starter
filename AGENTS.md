# AI Agents Guidelines

This document provides guidelines for AI agents working on this SvelteKit project that follows React-style conventions adapted for Svelte with modern Svelte 5 patterns.

## 🚀 Quick Reference (Critical Rules)
- **Language:** ALWAYS English for code and documentation
- **Documentation:** NEVER create markdown files unless explicitly requested
- **Package Manager:** ALWAYS `pnpm` - Never npm, yarn, bun
- **Svelte Version:** Use Svelte 5 runes ($state, $derived, $effect) for reactivity
- **Type Imports:** Always use `import type { ... }`
- **Barrel Exports:** Every folder has `index.ts` EXCEPT `modules/index.ts`
- **Styling:** ALWAYS `cn()` + design tokens only, NEVER hardcode colors
- **State:** Select specific fields `authStore.user.data` NOT entire store object
- **Icons:** Use `@lucide/svelte` components, NOT icon fonts or SVGs directly
- **Dependencies:** Prefer shadcn-svelte for UI components
- **Imports:** Use `$lib/` alias (SvelteKit standard), NOT `~/`
- **Relative Imports:** Avoid `../` imports, use `$lib/` alias instead

## 📁 Architecture

```
src/
├── lib/                      # Main library (SvelteKit standard)
│  ├── modules/              # Feature modules (NO index.ts here)
│  │  ├─ auth/
│  │  │  ├─ auth-types.ts
│  │  │  ├─ auth-store.ts
│  │  │  ├─ auth-service.ts
│  │  │  ├─ components/
│  │  │  │  └─ login-form.svelte
│  │  │  └─ index.ts ✓      # Barrel export
│  │  ├─ components.ts
│  │  └─ user/
│  │     └─ index.ts ✓
│  ├── shared/               # Cross-feature code
│  │  ├─ components/
│  │  │  ├─ ui/             # UI components
│  │  │  │  ├─ button.svelte
│  │  │  │  └─ index.ts ✓
│  │  │  ├─ theme-toggle.svelte
│  │  │  └─ index.ts ✓
│  │  ├─ utils/
│  │  │  ├─ cn.ts           # Class name utility
│  │  │  └─ index.ts ✓
│  │  ├─ stores/            # Svelte 5 rune-based stores
│  │  │  ├─ types.ts
│  │  │  ├─ base-store.ts
│  │  │  ├─ theme-store.ts
│  │  │  └─ index.ts ✓
│  │  ├─ services/          # API service layer
│  │  │  └─ base-service.ts
│  │  ├─ config/
│  │  │  └─ environment.ts
│  │  └─ lib/
│  │     └─ axios.ts        # HTTP client
│  ├── utils/               # Re-exported utils
│  │  └─ cn.ts
│  └── index.ts             # Main exports
└── routes/                 # SvelteKit routes
   └─ +page.svelte
```

**Barrel export rules:**
- Every feature/folder has `index.ts` ✓
- EXCEPT `lib/modules/index.ts` NEVER exists ✗
- Import: `import { Component } from "$lib/modules/auth"` ✓
- Import shared: `import { Button } from "$lib/shared/components/ui"` ✓
- Direct access: `import { cn } from "$lib/shared/utils"` ✓

## 📝 File Naming
- Files: `kebab-case` (e.g., `login-form.svelte`)
- Types: `[feature]-types.ts`
- Stores: `[feature]-store.ts` (using Svelte 5 runes)
- Services: `[feature]-service.ts`
- Components: `[component-name].svelte`
- Import utilities: `cn()` from `$lib/shared/utils`
- Icons: Use `@lucide/svelte` components

## 🎨 Styling Conventions

**Design Tokens:** `bg`, `fg`, `primary`, `secondary`, `success`, `danger`, `muted`, `border`
- ✓ `text-muted-fg` | ✗ `text-secondary`
- ✓ `bg-primary text-primary-fg` (pair bg/fg)
- ✗ NEVER hardcode: `bg-blue-500`

**className:** Layout ONLY (`w-*`, `h-*`, `m-*`, `p-*`, `flex`, `grid`, `gap-*`)
- ✓ Design via props: `intent="primary"` `size="lg"`
- ✗ `className="bg-blue-500 px-8"`

**cn() function:**
```typescript
import { cn } from "$lib/shared/utils";
// ✓
cn("base", condition && "extra")
// ✗
`${base} ${extra}`
```

## 🏗️ Component Development

### Before Making Changes
1. Check if component exists: `ls $shared/components/ui/[name].svelte`
2. Use existing components when possible
3. Keep components small and focused
4. Extract business logic from UI components

### Component Structure (Svelte 5)
```svelte
<script lang="ts">
  import { cn } from "$lib/shared/utils";
  import { Mail, Lock } from "@lucide/svelte";
  import type { ClassValue } from "$lib/shared/utils";
  
  // Props with type imports only
  export let intent: "primary" | "secondary" = "primary";
  export let size: "sm" | "md" | "lg" = "md";
  export let disabled = false;
  
  // Component state with Svelte 5 runes
  const email = $state("");
  const password = $state("");
  const showPassword = $state(false);
  
  // Derived state
  const isValid = $derived(email.length > 0 && password.length > 0);
  
  // Actions
  async function handleSubmit() {
    // Handle form submission
  }
</script>

<!-- Template with tokens and icons -->
<button
  class={cn(
    "inline-flex items-center justify-center rounded-md",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    size === "sm" && "px-3 py-1.5 text-sm",
    size === "md" && "px-4 py-2 text-sm",
    size === "lg" && "px-6 py-3 text-base",
    intent === "primary" && "bg-primary text-primary-fg hover:bg-primary/90",
    intent === "secondary" && "bg-secondary text-secondary-fg hover:bg-secondary/90",
    disabled && "opacity-50 cursor-not-allowed"
  )}
  {disabled}
  on:click={handleSubmit}
>
  <Mail class="h-4 w-4 mr-2" />
  <slot />
</button>
```

## 🔄 State Management

### Store Pattern (Svelte 5 Runes)
```typescript
// auth-store.ts - follow specific field selection
class AuthStore {
  private userStore = createBaseStore<User>(null);
  
  get user() { return this.userStore; }
  get token() { return this.tokenStore; }
  get isAuthenticated(): boolean { 
    return !!this.userStore.data && !!this.tokenStore.data;
  }
  
  // Computed/derived state with $derived
  get currentUser() {
    const isAdmin = $derived(this.userStore.data?.role === "admin");
    const displayName = $derived(
      this.userStore.data?.name || this.userStore.data?.email || "Unknown"
    );
    return { user: this.userStore.data, isAdmin, displayName };
  }
}

// Hook for type-safe reactive state access
export function useAuthState() {
  return {
    user: authStore.user.data,
    isLoading: authStore.user.isLoading,
    error: authStore.user.error,
    isAuthenticated: authStore.isAuthenticated,
    currentUser: authStore.currentUser,
    actions: { ... }
  };
}

// Usage in组件:
<script>
  import { useAuthState } from "./auth-store";
  const { user, isLoading, error, actions } = useAuthState();
</script>

<!-- Reactive template -->
{#if user}
  <p>Welcome, {user.name}!</p>
{/if}
```

### Service Layer Pattern
```typescript
// auth-service.ts - Class with singleton export
class AuthService extends BaseService<User> {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    // Implementation
  }
}
export const authService = new AuthService();
```

## 🌐 API Development

### Configuration
- API client: `$lib/shared/lib/axios.ts` (NOT `$lib/shared/api/`)
- Types: Define in same axios file
- Environment: `$lib/shared/config/environment.ts`
- Direct imports: `import { axiosInstance } from "$lib/shared/lib/axios"`

### Error Handling
- Always include `error: string | null | string[]` in stores
- Implement `clearError` method
- Use try-catch with proper error messages
- Validation messages from API

### API Response Pattern
```typescript
interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
}

interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
```

## 🛠️ Development Commands

### Essential Commands
```bash
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm test             # Run tests
pnpm lint             # Check linting
pnpm format           # Format code
pnpm check            # Type checking
pnpm lint:fix          # Fix linting issues
```

### Before Commit
1. `pnpm format` - Format code
2. `pnpm lint:fix` - Fix linting
3. `pnpm check` - Type check
4. `pnpm test` - Run tests

## ✅ What TO Do

- Use Svelte 5 features ($state, $effect)
- Follow the established file and folder structure
- Write tests for new components and services
- Use proper TypeScript with `import type`
- Select specific store fields, not entire store
- Use design tokens with `cn()` function
- Implement proper error boundaries
- Extract business logic to services

## ❌ What NOT to Do

- NEVER create `modules/index.ts` - this directory must not have barrel export
- Don't hardcode colors in components
- Don't import entire store object
- Don't use template literals for className
- Don't add dependencies without alternatives
- Don't modify global configurations unnecessarily
- Don't break existing functionality without tests
- Don't commit sensitive data or API keys

## 🎯 Best Practices

### Performance
- Use dynamic imports: `const Component = lazy(() => import('$lib/Component.svelte'));`
- Optimize bundle size with code splitting
- Use Svelte reactivity effectively ($state, $derived)
- Add skeleton/loading states

### Security
- Sanitize all user inputs
- Use environment variables for secrets
- Implement proper CORS policies
- Validate data on both client and server
- Never expose private env vars to client code

### Accessibility
- Use semantic HTML5 elements
- Provide proper alt text for images
- Ensure keyboard navigation
- Include ARIA labels where needed
- Test with screen readers

### SSR Safety
- Check browser APIs: `if (typeof window !== "undefined")`
- Use browser-only state with `$effect(() => {})`
- Handle localStorage safely
- Test hydration

## 🔧 Getting Help
- SvelteKit docs: https://kit.svelte.dev/
- Check existing similar components
- Use browser dev tools for debugging
- Check network tab for API issues
- Follow established patterns in existing code