import { View } from 'react-native';
import { SafeArea } from './SafeArea';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

export function SafeAreaProfile({ navigation, children }: any) {
	return (
		<SafeArea>
			<MaterialCommunityIcons
				name="menu"
				size={24}
				color="black"
				onPress={() => {
					navigation.toggleDrawer();
				}}
			/>
			<ScrollView>{children}</ScrollView>
		</SafeArea>
	);
}
