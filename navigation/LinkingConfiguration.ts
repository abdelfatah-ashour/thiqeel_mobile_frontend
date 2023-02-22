import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
	prefixes: [Linking.createURL('/')],
	config: {
		screens: {
			home: 'home',
			profile: 'profile',
			my_bids: 'my_bids',
			my_wallet: 'my_wallet',
			settings: 'settings',
			NotFound: '*',
		},
		initialRouteName: 'home',
	},
};

export default linking;
