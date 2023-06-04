export type ChangeProjectEvent = {
	slug: string;
	ticker: string;
	logoUrl: string;
	name: string;
	isSelected?: boolean;
};

export type SaveChangesEventDispatcher = { saveChanges: ChangeProjectEvent[] };

export type ChangeProjectEventDispatcher = { changeProject: ChangeProjectEvent };

export type ToggleListEventDispatcher = { toggleList: Record<any, any> };

export type AppEventDispatcher<T = ToggleListEventDispatcher | ChangeProjectEventDispatcher> = T;
