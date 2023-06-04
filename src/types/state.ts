import type { Project } from './project';

export type State = {
	items: Project[];
	isDialogOpened: boolean;
	selectedItems: Project[];
	dialogInitItems: Project[];
};
