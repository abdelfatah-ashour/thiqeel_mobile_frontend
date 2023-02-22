import { Text, StyleSheet } from 'react-native';

export function HeadingSM({ children, ...props }: any) {
	return <Text style={styles.HeadingSM}>{children}</Text>;
}

export function HeadingMD({ children, ...props }: any) {
	return (
		<Text style={styles.HeadingMD} {...props}>
			{children}
		</Text>
	);
}

export function HeadingLG({ children, ...props }: any) {
	return (
		<Text style={styles.HeadingLG} {...props}>
			{children}
		</Text>
	);
}

export function HeadingXL({ children, ...props }: any) {
	return (
		<Text style={styles.HeadingXL} {...props}>
			{children}
		</Text>
	);
}

export function HeadingXXL({ children, ...props }: any) {
	return (
		<Text style={styles.HeadingXXL} {...props}>
			{children}
		</Text>
	);
}

export function HeadingXXXL({ children, ...props }: any) {
	return (
		<Text style={styles.HeadingXXXL} {...props}>
			{children}
		</Text>
	);
}

export function P({ children, ...props }: any) {
	return (
		<Text style={styles.p} {...props}>
			{children}
		</Text>
	);
}

export function Small({ children, ...props }: any) {
	return (
		<Text style={styles.small} {...props}>
			{children}
		</Text>
	);
}

export function Label({ children, ...props }: any) {
	return (
		<Text style={styles.label} {...props}>
			{children}
		</Text>
	);
}

const styles = StyleSheet.create({
	HeadingSM: {
		fontSize: 12,
	},
	HeadingMD: {
		fontSize: 14,
	},
	HeadingLG: {
		fontSize: 16,
	},
	HeadingXL: {
		fontSize: 24,
	},
	HeadingXXL: {
		fontSize: 32,
		fontWeight: '600',
	},
	HeadingXXXL: {
		fontSize: 48,
		fontWeight: '600',
	},
	p: {
		fontSize: 14,
		fontWeight: '500',
	},
	small: {
		fontSize: 12,
		fontWeight: '400',
	},
	label: {
		...HeadingXXL,
		marginVertical: 6,
		fontWeight: '600',
		textTransform: 'capitalize',
	},
});
