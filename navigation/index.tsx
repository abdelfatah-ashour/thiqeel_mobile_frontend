import * as React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootTabParamList } from "../Types/authentication";
import LinkingConfiguration from "../utils/LinkingConfiguration";
import { Home } from "../screens/home";
import { My_Bids } from "../screens/my-bids";
import { Settings } from "../screens/settings";
import { My_Wallet } from "../screens/my-wallet";

// import svg
import AuctionBidIcon from "../assets/images/svg/auction-bold.svg";
import AuctionBidWhiteIcon from "../assets/images/svg/auction-bold-white.svg";

import ProfileIcon from "../assets/images/svg/profile-circle.svg";
import ProfileWhiteIcon from "../assets/images/svg/profile-circle-white.svg";

import WalletIcon from "../assets/images/svg/wallet-gray-icon.svg";
import WalletWhiteIcon from "../assets/images/svg/wallet-white-icon.svg";

import HomeIcon from "../assets/images/svg/home-icon.svg";
import HomeWhiteIcon from "../assets/images/svg/home-white-icon.svg";

import { DrawerProfile } from "./DrawerProfile";
import { COLORS } from "../constants/Colors";
import { AuthenticateNavigator } from "./authentication";
import { TermsCondition } from "../screens/terms-conditions";
import { AboutUs } from "../screens/about-us";
import { ContactUs } from "../screens/contact-us";
import { useReduxSelector } from "../store";

const BottomTab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator();

function BottomTabNavigator() {
  const user = useReduxSelector(s => s.auth.user);
  const { width } = Dimensions.get("window");

  return (
    <BottomTab.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          flexDirection: "row",
          position: "absolute",
          bottom: 25,
          backgroundColor: "#ccc",
          borderRadius: 50,
          marginHorizontal: width * 0.05,
          alignContent: "center",
          alignItems: "center",
          height: 70,
          paddingHorizontal: 0.05,
        },
      }}>
      <BottomTab.Screen
        name="home"
        component={Home}
        options={props => {
          return {
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <View style={focused ? styles.activeTabButton : styles.tabButton}>
                {focused ? (
                  <HomeWhiteIcon width={24} height={24} />
                ) : (
                  <HomeIcon width={24} height={24} />
                )}
              </View>
            ),
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
            tabBarIcon: ({ focused }) => (
              <View style={focused ? styles.activeTabButton : styles.tabButton}>
                {focused ? (
                  <AuctionBidWhiteIcon width={24} height={24} />
                ) : (
                  <AuctionBidIcon width={24} height={24} />
                )}
              </View>
            ),
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
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={focused ? styles.activeTabButton : styles.tabButton}>
                  {focused ? (
                    <WalletWhiteIcon width={24} height={24} />
                  ) : (
                    <WalletIcon width={24} height={24} />
                  )}
                </View>
              );
            },
          };
        }}
      />

      {user?.user_id ? (
        <BottomTab.Screen
          name="root_profile"
          component={DrawerProfile}
          options={props => {
            return {
              headerShown: false,
              tabBarShowLabel: false,
              tabBarIcon: ({ focused }) => (
                <View
                  style={focused ? styles.activeTabButton : styles.tabButton}>
                  {focused ? (
                    <ProfileWhiteIcon width={24} height={24} />
                  ) : (
                    <ProfileIcon width={24} height={24} />
                  )}
                </View>
              ),
            };
          }}
        />
      ) : null}

      <BottomTab.Screen
        name="settings"
        component={Settings}
        options={() => {
          return {
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <View style={focused ? styles.activeTabButton : styles.tabButton}>
                <Feather
                  name="more-horizontal"
                  size={32}
                  color={focused ? "white" : "black"}
                />
              </View>
            ),
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
      <Stack.Screen
        name="authentication"
        component={AuthenticateNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="terms-condition"
        component={TermsCondition}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="about-us"
        component={AboutUs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="contact-us"
        component={ContactUs}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={DefaultTheme}>
      <MainStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabButton: {
    backgroundColor: "#fff",
    borderRadius: 50,
    width: 50,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#eee",
    shadowRadius: 2,
    marginTop: 30,
  },
  activeTabButton: {
    backgroundColor: COLORS._primary_yellow,
    borderRadius: 50,
    width: 50,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#eee",
    shadowRadius: 2,
    marginTop: 30,
  },
});
