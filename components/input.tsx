import { TextInput, StyleSheet } from 'react-native';

export function Input({ value, onChange, ...props }: any) {
	return <TextInput onChange={onChange} style={styles.input} {...props} />;
}

const styles = StyleSheet.create({
	input: {
		borderWidth: 1,
		borderColor: '#000',
		paddingHorizontal: 8,
		paddingVertical: 6,
		fontSize: 16,
		textAlign: 'left',
		height: 42,
		borderRadius: 6,
	},
});
