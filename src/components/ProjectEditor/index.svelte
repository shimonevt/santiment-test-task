<script context="module" lang="ts">
	import { dialogs } from 'webkit/ui/Dialog';
	import DialogInner from './index.svelte';
	export const showEditorDialog = (props: Record<string, any>) => dialogs.show(DialogInner, props);

	export const closeEditorDialog = () => dialogs.hide(0);
</script>

<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Dialog from 'webkit/ui/Dialog/Dialog.svelte';
	import VirtualList from 'webkit/ui/VirtualList/index.svelte';
	import InputWithIcon from 'webkit/ui/InputWithIcon.svelte';

	import Button from '../Button/index.svelte';
	import Project from '../Project/index.svelte';
	import { projectsStore } from '@/store/index';
	import { closeEditorDialog as closeEditorDialogHandler } from './index.svelte';
	import type { Project as ProjectType } from '@/types/project';
	import type { Unsubscriber } from 'svelte/store';

	export let DialogPromise;

	let list: ProjectType[] = [];
	let displayedList: ProjectType[];
	let queryString = '';

	let unsubscribe: Unsubscriber;
	let closeDialog: ((skipLockChecks?: boolean | undefined) => void) | undefined;

	$: displayedList =
		queryString?.length !== 0
			? (displayedList = list.filter(filterByName))
			: (displayedList = list);

	onMount(() => {
		projectsStore.toggleDialog();
		unsubscribe = projectsStore.subscribe((state) => {
			list = state.dialogInitItems;
		});
	});

	function onUnmount() {
		projectsStore.toggleDialog();
		unsubscribe();
	}

	onDestroy(onUnmount);

	function onCancelClick() {
		closeEditorDialogHandler();
	}

	function handleProjectChange(ev: CustomEvent<ProjectType>) {
		list = list.map((item) => {
			if (item.slug === ev.detail.slug) return { ...ev.detail };

			return { ...item };
		});
	}

	function handleChangeSave() {
		projectsStore.setItems(list);
		closeEditorDialogHandler();
	}

	function filterByName(item: ProjectType) {
		return item.name.toLowerCase().includes(queryString);
	}

	function handleInputChange(ev: Event) {
		if (ev && typeof (ev.target as HTMLInputElement)?.value !== 'undefined') {
			queryString = (ev.target as HTMLInputElement).value;
		}
	}
</script>

<Dialog {...$$props} bind:closeDialog title="Edit assets">
	<div class="dialog__search">
		<InputWithIcon
			icon="search"
			w="12"
			placeholder="Search for asset"
			on:input={handleInputChange}
		/>
	</div>
	<div class="dialog__virtual-list">
		<VirtualList itemHeight={16} pageSize={200} renderAmount={10} items={displayedList} let:item>
			<Project
				alt={item.slug}
				id={item.ticker}
				imgSrc={item.logoUrl}
				label={item.name}
				secondLabel={item.ticker}
				isSelected={item.isSelected}
				isEditing={true}
				on:changeProject={handleProjectChange}
			/>
		</VirtualList>
	</div>
	<div class="dialog__btn-group">
		<div class="dialog__btn-container">
			<Button text="Apply changes" on:click={handleChangeSave} />
		</div>
		<div class="dialog__btn-container">
			<Button text="Cancel" theme="secondary" on:click={onCancelClick} />
		</div>
	</div>
</Dialog>

<style lang="scss">
	.dialog {
		&__virtual-list {
			height: 278px;
			margin-top: 16px;
			margin-bottom: 36px;
			margin-left: 22px;
			margin-right: 16px;
		}

		&__search {
			margin: 13px 16px 16px 22px;
		}

		&__btn-group {
			display: flex;
			gap: 12px;
			padding-left: 22px;
			margin-bottom: 16px;
		}

		&__btn-container {
			width: 120px;
		}
	}
</style>
