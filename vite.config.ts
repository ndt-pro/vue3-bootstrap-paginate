import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import typescript2 from 'rollup-plugin-typescript2';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/index.ts'),
			name: 'Vue3-Bootstrap-Paginate',
			fileName: (format) => `vue3-bootstrap-paginate.${format}.js`,
		},
		rollupOptions: {
			external: ['vue'],
			output: {
				// Provide global variables to use in the UMD build
				// Add external deps here
				globals: {
					vue: 'Vue',
				},
			},
		},
	},
	plugins: [
		vue(),
		typescript2({
			check: false,
			include: ['src/components/*.vue'],
			tsconfigOverride: {
				compilerOptions: {
					sourceMap: true,
					declaration: true,
					declarationMap: true,
				},
				exclude: ['vite.config.ts', 'main.ts'],
			},
		}),
	],
});
