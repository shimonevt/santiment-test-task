<script lang="ts">
	import type { ChangeProjectEvent } from '@/types/events';
	import { createEventDispatcher } from 'svelte';
	import Checkbox from 'webkit/ui/Checkbox.svelte';

	const dispatch = createEventDispatcher<{ changeProject: ChangeProjectEvent }>();

	export let isEditing = false;
	export let isSelected: boolean | undefined;
	export let id = '';
	export let imgSrc = '';
	export let label = '';
	export let secondLabel = '';
	export let alt = 'alt';

	const handleCheckboxClick = () => {
		dispatch('changeProject', {
			slug: alt,
			ticker: id,
			logoUrl: imgSrc,
			name: label,
			isSelected: !isSelected,
		});
		isSelected = !isSelected;
	};
</script>

<div class={`project ${isEditing ? 'project_edit-mode' : ''}`} {id}>
	<label
		class="project__inner"
		for={id}
		on:click={handleCheckboxClick}
		on:keypress|self={handleCheckboxClick}
	>
		{#if isEditing}
			<div class="project__checkbox">
				<Checkbox on:click={handleCheckboxClick} bind:isActive={isSelected} />
			</div>
		{/if}
		<img class="project__icon" src={imgSrc} {alt} />
		<span class="project__label">{label}</span>
		<span class="project__second-label">{secondLabel}</span>
	</label>
</div>

<style lang="scss">
	.project {
		display: flex;
		align-items: center;
		padding: 6px 0;
		gap: 0 6px;
		&__icon {
			width: 16px;
			height: 16px;
		}

		&__label {
			color: #2f354d;
		}
		&__second-label {
			color: #9faac4;
		}

		.project__inner {
			display: inherit;
			gap: inherit;
		}

		&_edit-mode {
			.project__inner,
			.project__inner > * {
				cursor: pointer;
			}
			.project__checkbox {
				margin-right: 12px;
			}
		}
	}
</style>
