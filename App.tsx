import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { Text, View } from 'react-native';

import 'react-native-gesture-handler';
import './i18n/i18n';

export default function App() {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();

	if (!isLoadingComplete) {
		return (
			<View>
				<Text>loading....</Text>
			</View>
		);
	} else {
		return (
			<SafeAreaProvider>
				<Navigation colorScheme={colorScheme} />

				<StatusBar />
			</SafeAreaProvider>
		);
	}
}
