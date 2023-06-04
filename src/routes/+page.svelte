<script lang="ts">
	import { showEditorDialog } from '@/components/ProjectEditor/index.svelte';
	import 'webkit/styles/main.css';

	import { getAllProjects } from '@/api';
	import { onMount } from 'svelte';
	import ProjectList from '../components/ProjectList/index.svelte';
	import type { Project as ProjectType } from '@/types/project';
	import type { ChangeProjectEvent } from '@/types/events';

	import { projectsStore } from '@/store';

	let windows: any[] = [];
	let listItems: ProjectType[];
	let displayedItems: ProjectType[];
	let isDialogOpened: boolean | undefined;
	let queryString: string = '';

	$: displayedItems =
		queryString.length !== 0
			? (displayedItems = listItems.filter(filterByName))
			: (displayedItems = listItems);

	projectsStore.subscribe((value) => {
		listItems = value.selectedItems;
		isDialogOpened = value.isDialogOpened;
	});

	onMount(async () => {
		await getAllProjects().then((projects) => {
			if (projects) {
				projectsStore.setInitialItems(projects);
			}
		});
	});

	function filterByName(item: ProjectType) {
		return item.name.toLowerCase().includes(queryString);
	}

	function handleChangeSave(ev: CustomEvent<ChangeProjectEvent[]>) {
		projectsStore.setSelectedItems(ev.detail);
	}

	function onToggle() {
		showEditorDialog({ strict: true, saveChanges: handleChangeSave }).then((window) => {
			windows.push(window);
			windows = windows;
		});
	}

	function handleInputChange(ev: Event) {
		if (ev && typeof (ev.target as HTMLInputElement)?.value !== 'undefined') {
			queryString = (ev.target as HTMLInputElement).value;
		}
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<main>
	<div>
		<ProjectList projects={displayedItems} on:toggleList={onToggle} on:input={handleInputChange} />
	</div>
</main>

<style lang="scss">
</style>
