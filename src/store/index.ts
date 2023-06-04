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
	const { set, subscribe, update } = writable<State>(initialState);

	const setSelectedItems = (selectedItems: Project[]) => {
		update((state) => {
			if (selectedItems.length) {
				let leftPointer = 0;
				let rightPointer = 0;
				const initState = [...state.items];

				//rightPointer - указывает только на нужный
				//leftPointer - указывает на все элементы
				while (leftPointer <= selectedItems.length - 1) {
					const isEqual = selectedItems[leftPointer].ticker === initState[rightPointer].ticker;

					if (isEqual) {
						initState[rightPointer] = { ...selectedItems[leftPointer] };
						rightPointer = leftPointer + 2;
						leftPointer++;
						console.log('iteration?', selectedItems, initState);

						continue;
					} else {
						initState[rightPointer] = { ...initState[rightPointer], isSelected: false };
					}

					if (rightPointer === initState.length - 1) {
						rightPointer = leftPointer + 2;
						leftPointer++;
					} else {
						rightPointer++;
					}
				}
				return {
					...state,
					dialogInitItems: [...initState],
					selectedItems: [...selectedItems],
					items: [...initState]
				};
			} else {
				return {
					...state,
					selectedItems: [],
					dialogInitItems: state.items.map((item) => ({ ...item, isSelected: false }))
				};
			}
		});
	};

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

	return { subscribe, setSelectedItems, toggleDialog, setInitialItems, setItems };
}

export const projectsStore = ProjectStore(initState);
