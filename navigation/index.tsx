import * as React from 'react';
import { ColorSchemeName, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootTabParamList } from '../Types/authentication';
import LinkingConfiguration from './LinkingConfiguration';
import { Home } from '../screens/home';
import { My_Bids } from '../screens/my-bids';
import { Settings } from '../screens/settings';
import { My_Wallet } from '../screens/my-wallet';

// import svg
import AuctionBidIcon from '../assets/images/svg/auction-bid.svg';
import ProfileIcon from '../assets/images/svg/profile-circle.svg';
import WalletIcon from '../assets/images/svg/wallet-icon.svg';
import HomeIcon from '../assets/images/svg/home-icon.svg';
import { DrawerProfile } from './DrawerProfile';
import { COLORS } from '../constants/Colors';
import { Login } from '../screens/authentication/login';
import { Register } from '../screens/authentication/register';

const BottomTab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator();

function BottomTabNavigator() {
	return (
		<BottomTab.Navigator initialRouteName="home" screenOptions={{}}>
			<BottomTab.Screen
				name="root_profile"
				component={DrawerProfile}
				options={props => {
					return {
						headerShown: false,
						tabBarShowLabel: false,
						tabBarIcon: () => (
							<View style={styles.tabButton}>
								<ProfileIcon name="user" width={32} height={32} stroke={COLORS._border_light_gray} />
							</View>
						),
						tabBarItemStyle: {
							bottom: props.navigation.isFocused() ? 16 : 0,
						},
					};
				}}
			/>
			<BottomTab.Screen
				name="my_bids"
				component={My_Bids}
				options={props => {
					return {
						headerShown: false,
						tabBarShowLabel: false,
						tabBarIcon: () => (
							<View style={styles.tabButton}>
								<AuctionBidIcon width={32} height={32} />
							</View>
						),
						tabBarItemStyle: {
							bottom: props.navigation.isFocused() ? 16 : 0,
						},
					};
				}}
			/>
			<BottomTab.Screen
				name="home"
				component={Register}
				options={props => {
					return {
						headerShown: false,
						tabBarShowLabel: false,
						tabBarIcon: () => (
							<View style={styles.tabButton}>
								<Text>
									<HomeIcon width={32} height={32} />
								</Text>
							</View>
						),
						tabBarItemStyle: {
							bottom: props.navigation.isFocused() ? 16 : 0,
						},
					};
				}}
			/>
			<BottomTab.Screen
				name="my_wallet"
				component={My_Wallet}
				options={props => {
					return {
						headerShown: false,
						tabBarShowLabel: false,
						tabBarIcon: () => {
							return (
								<View style={styles.tabButton}>
									<WalletIcon width={32} height={32} />
								</View>
							);
						},
						tabBarItemStyle: {
							bottom: props.navigation.isFocused() ? 16 : 0,
						},
					};
				}}
			/>
			<BottomTab.Screen
				name="settings"
				component={Settings}
				options={props => {
					return {
						headerShown: false,
						tabBarShowLabel: false,
						tabBarIcon: () => (
							<View style={styles.tabButton}>
								<Feather name="more-horizontal" size={32} color="black" />
							</View>
						),
						tabBarItemStyle: {
							bottom: props.navigation.isFocused() ? 16 : 0,
						},
					};
				}}
			/>
		</BottomTab.Navigator>
	);
}

function MainStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="root"
				component={BottomTabNavigator}
				options={{
					headerShown: false,
				}}
			/>
			{/* <Stack.Screen name="profile" component={DrawerProfile} /> */}
		</Stack.Navigator>
	);
}

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
	return (
		<NavigationContainer linking={LinkingConfiguration} theme={DefaultTheme}>
			<MainStack />
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	tabButton: {
		backgroundColor: '#fff',
		borderRadius: 50,
		overflow: 'hidden',
		padding: 4,
		width: 48,
		height: 48,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#eee',
		shadowRadius: 2,
	},
});
