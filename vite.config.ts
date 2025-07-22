import { paraglideVitePlugin } from '@inlang/paraglide-js';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			disableAsyncLocalStorage: true,
			strategy: ['url', 'cookie', 'baseLocale']
		})
	],
	server: {
		allowedHosts: ['localhost', '127.0.0.1', '0.0.0.0', 'egret-settling-ghost.ngrok-free.app']
	}
});
