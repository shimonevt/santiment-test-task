import type { Project } from '@/types/project';
import type { State } from '@/types/state';
import { writable } from 'svelte/store';

const initState: State = {
	items: [],
	isDialogOpened: false,
	selectedItems: [],
	dialogInitItems: []
};

function ProjectStore(initialState: State) {
	const {  subscribe, update } = writable<State>(initialState);

	const setItems = (items: Project[]) => {
		const selectedItems = items.filter((item) => item.isSelected === true);

		update((state) => ({
			...state,
			dialogInitItems: [...items],
			selectedItems: [...selectedItems]
		}));
	};

	const toggleDialog = () =>
		update((state) => ({ ...state, isDialogOpened: !state.isDialogOpened }));

	const setInitialItems = (items: Project[]) => {
		update((state) => ({ ...state, dialogInitItems: items, items }));
	};

	return { subscribe, toggleDialog, setInitialItems, setItems };
}

export const projectsStore = ProjectStore(initState);
