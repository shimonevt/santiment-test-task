<script lang="ts">
	import Button from '../Button/index.svelte';
	import VirtualList from 'webkit/ui/VirtualList/index.svelte';
	import InputWithIcon from 'webkit/ui/InputWithIcon.svelte';
	import type { Project as ProjectType } from '@/types/project';
	import Project from '../Project/index.svelte';
	import type { ToggleListEventDispatcher } from '@/types/events';
	import { createEventDispatcher } from 'svelte';

	export let projects: ProjectType[] = [];
	
	const dispatch = createEventDispatcher<ToggleListEventDispatcher>();

	const toggleMode = () => {
		dispatch('toggleList');
	};
</script>

<div class="project-list">
	<InputWithIcon icon="search" w="12" placeholder="Search for asset" on:input />
	<div class="project-list__virtual-list">
		<VirtualList itemHeight={16} pageSize={200} renderAmount={8} items={projects} let:item>
			<Project
				alt={item.slug}
				id={item.ticker}
				imgSrc={item.logoUrl}
				label={item.name}
				secondLabel={item.ticker}
				isSelected={item.isSelected}
			/>
		</VirtualList>
	</div>
	<Button text="Edit assets" on:click={toggleMode} />
</div>

<style lang="scss">
	.project-list {
		background: #ffffff;
		border: 1px solid #e7eaf3;
		border-radius: 8px;
		padding: 16px;
		height: 423px;

		&__virtual-list {
			height: calc(100% - 136px);
			margin-top: 16px;
			margin-bottom: 36px;
			padding-left: 6px;
		}

		&__button {
			margin-top: 32px;
		}
	}
</style>
