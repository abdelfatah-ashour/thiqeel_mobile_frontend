import AsyncStorage from '@react-native-async-storage/async-storage';

export async function StoreToken(token: string) {
	await AsyncStorage.setItem('thiqeel_token', JSON.stringify(token), () => {
		console.log('STORED');
	});
}

export async function StoreUser(payload?: any) {
	await AsyncStorage.setItem('thiqeel_user', JSON.stringify(payload), () => {
		console.log('STORED');
	});
}

export async function getToken() {
	return await AsyncStorage.getItem('thiqeel_token', error => {
		console.log('error get token ', error);
	});
	// return '';
}

export async function getUser() {
	return await AsyncStorage.getItem('thiqeel_user', error => {
		console.log('error get token ', error);
	});
	// return '';
}
