<script lang="ts">
	import type { ButtonTheme } from './types';

	export let text = '';
	export let theme: ButtonTheme = 'primary';
</script>

<button class={`button button_theme-${theme}`} on:click>{text}</button>

<style lang="scss">
	.button {
		padding: 6px 0;
		border-radius: 6px;

		&_theme {
			&-primary {
				background-color: #14c393;
				color: #ffffff;
			}
			&-secondary {
				border: 1px solid #e7eaf3;
				background-color: #ffffff;
				color: #2f354d;
			}
		}

		width: 100%;
		text-align: center;
	}
</style>
