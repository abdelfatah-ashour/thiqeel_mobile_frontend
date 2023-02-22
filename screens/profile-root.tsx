import { Text, StyleSheet, View, ScrollView } from 'react-native';
import { SafeArea } from '../components/SafeArea';
import { t } from 'i18next';
import { profile_links } from '../utils/profile_links';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';

export function ProfileRoot({ navigation }: any) {
	const { isFocused }: { isFocused: boolean } = useNavigation();

	return (
		<SafeArea>
			<ScrollView>
				<View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', padding: 20 }}>
					{profile_links.map((item, index) => {
						return (
							<Button
								key={index}
								style={isFocused ? styles.profile_page_card_active : styles.profile_page_card}
								onPress={() => navigation.navigate(item.url)}>
								<Text>{t(item.label)}</Text>
							</Button>
						);
					})}
				</View>
			</ScrollView>
		</SafeArea>
	);
}

const styles = StyleSheet.create({
	profile_page_card: {
		width: '90%',
		height: 50,
		marginBottom: 16,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingLeft: 16,
	},
	profile_page_card_active: {
		width: '90%',
		height: 50,
		marginBottom: 16,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingLeft: 16,
		borderLeftColor: '#ccc751',
		borderLeftWidth: 4,
	},
});
