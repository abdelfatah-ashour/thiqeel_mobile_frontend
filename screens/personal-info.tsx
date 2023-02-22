import { StyleSheet, View } from 'react-native';

import { SafeAreaProfile } from '../components/SafeAreaProfile';
import { Button, Checkbox, Text, TextInput } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

export function PersonalInfo({ navigation }: any) {
	const { t } = useTranslation('common');

	return (
		<SafeAreaProfile navigation={navigation}>
			<View style={styles.container_profile}>
				<Text variant="displaySmall">{t('personal_info')}</Text>
				<Text variant="bodyMedium" style={styles.profile_description}>
					{t('profile_info_desc')}
				</Text>

				<View style={{ marginBottom: 16 }}>
					<Text variant="labelLarge" style={styles.label}>
						{t('first_name')}
					</Text>
					<TextInput
						// value="123"
						onChange={text => {}}
						style={{
							backgroundColor: '#fff',
						}}
					/>
				</View>

				<View style={{ marginBottom: 16 }}>
					<Text variant="labelLarge" style={styles.label}>
						{t('middle_name')}
					</Text>
					<TextInput
						// value="123"
						onChange={text => {}}
						style={{
							backgroundColor: '#fff',
						}}
					/>
				</View>

				<View style={{ marginBottom: 16 }}>
					<Text variant="labelLarge" style={styles.label}>
						{t('last_name')}
					</Text>
					<TextInput
						// value="123"
						onChange={text => {}}
						style={{
							backgroundColor: '#fff',
						}}
					/>
				</View>

				<View style={{ marginBottom: 16 }}>
					<Text variant="labelLarge" style={styles.label}>
						{t('email')}
					</Text>
					<TextInput
						// value="123"
						onChange={text => {}}
						style={{
							backgroundColor: '#fff',
						}}
					/>
				</View>

				<View>
					<Text variant="labelLarge" style={styles.label}>
						{t('mobile_number')}
					</Text>
					<TextInput
						// value="123"
						onChange={text => {}}
						style={{
							backgroundColor: '#fff',
						}}
					/>
				</View>

				<View>
					<Text variant="labelLarge" style={styles.label}>
						{t('planning')}
					</Text>
					<View
						style={{
							flexDirection: 'row',
						}}>
						<View>
							<Checkbox.Item label={t('buyer')} status="checked" labelVariant="labelLarge" />
						</View>

						<View>
							<Checkbox.Item label={t('seller')} status="checked" labelVariant="labelLarge" />
						</View>
					</View>
				</View>
				<View>
					<Button
						style={{
							width: '25%',
						}}>
						{t('update_Profile')}
					</Button>
				</View>
			</View>
		</SafeAreaProfile>
	);
}

const styles = StyleSheet.create({
	container_profile: {
		paddingHorizontal: 10,
		paddingVertical: 16,
	},
	profile_description: {
		marginVertical: 12,
	},
	label: {
		marginVertical: 6,
		fontWeight: '600',
		textTransform: 'capitalize',
	},
});
