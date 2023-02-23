export type DispatchAction = {
	type: string;
	payload?: any;
};

export type buttonPropsType = {
	title: string;
	onPress: () => void;
	disabled?: boolean;
};

export type ModalPropsType = {
	open: boolean;
	onHide: () => void;
	title?: string;
	message?: string;
};
