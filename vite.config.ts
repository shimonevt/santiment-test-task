import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

process.env.GQL_SERVER_URL = 'https://api-stage.santiment.net/graphql';
process.env.IS_DEV_MODE = process.env.NODE_ENV !== 'production';
process.env.MEDIA_PATH = '/node_modules/san-webkit/lib';
process.env.ICONS_PATH = '/node_modules/san-webkit/lib/icons';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: [
			{
				find: '@',
				replacement: '/src'
			},

			{ find: 'webkit', replacement: __dirname + '/node_modules/san-webkit/lib/' },
			{ find: 'san-webkit', replacement: __dirname + '/node_modules/san-webkit/' }
		]
	},

	define: {
		'process.browser': true,
		'process.env': process.env,
		'process.env.IS_DEV_MODE': process.env.IS_DEV_MODE
	}
});
