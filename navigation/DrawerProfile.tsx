import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Text, View, Pressable } from "react-native";
import { useTranslation, getI18n } from "react-i18next";
import { Button } from "react-native-paper";

import { Summary } from "../screens/summary";
import { PersonalInfo } from "../screens/personal-info";
import { AccountType } from "../screens/account-type";
import { SellListing } from "../screens/sell-listing";
import { CategoriesOfInterest } from "../screens/categories-of-interesting";
import { PasswordSecurity } from "../screens/password-security";
import { ShippingAddress } from "../screens/shipping-address";
import { PaymentMethod } from "../screens/payment-method";
import { MyWatchList } from "../screens/my-watch-list";
import { Notification } from "../screens/notification";
import { isRTL } from "../i18n/isRTL";
import i18n from "../i18n/i18n";

import MenuList from "../assets/images/svg/burger-list-menu-navigation.svg";

const Drawer = createDrawerNavigator();

export function DrawerProfile() {
  const { t } = useTranslation("common");
  const { language } = getI18n();
  return (
    <Drawer.Navigator
      initialRouteName="profile_personal_info"
      drawerContent={(props: any) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <View>
              <Button
                onPress={() => {
                  i18n.changeLanguage(language === "en" ? "ar" : "en");
                }}>
                <Text>{t("change_to")}</Text>
              </Button>
            </View>
          </DrawerContentScrollView>
        );
      }}
      screenOptions={{
        drawerStyle: {
          direction: isRTL() ? "rtl" : "ltr",
        },
        headerLeft: () => {
          return (
            <Pressable
              onPress={() => {
                // navigation.toggleDrawer();
              }}>
              <MenuList />
            </Pressable>
          );
        },
      }}>
      <Drawer.Screen
        name="profile_summary"
        component={Summary}
        options={{
          title: t("profile_summary") || "",
          headerStyle: {
            justifyContent: language === "en" ? "flex-start" : "flex-end",
          },
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="profile_personal_info"
        component={PersonalInfo}
        options={{
          title: t("personal_info") || "",
          headerStyle: {
            justifyContent: language === "en" ? "flex-start" : "flex-end",
            backgroundColor: "red",
          },
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="profile_account_type"
        component={AccountType}
        options={{
          title: t("account_type") || "",
          headerStyle: {
            justifyContent: language === "en" ? "flex-start" : "flex-end",
          },
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="profile_sell_listing"
        component={SellListing}
        options={{
          headerStyle: {
            justifyContent: language === "en" ? "flex-start" : "flex-end",
          },
          title: t("sell_listing") || "",
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="profile_categories_of_interest"
        component={CategoriesOfInterest}
        options={{
          title: t("profile_categories_of_interest") || "",
          headerStyle: {
            justifyContent: language === "en" ? "flex-start" : "flex-end",
          },
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="profile_notification"
        component={Notification}
        options={{
          title: t("profile_notification") || "",
          headerStyle: {
            justifyContent: language === "en" ? "flex-start" : "flex-end",
          },
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="profile_password_security"
        component={PasswordSecurity}
        options={{
          title: t("profile_password_security") || "",
          headerStyle: {
            justifyContent: language === "en" ? "flex-start" : "flex-end",
          },
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="profile_payment_method"
        component={PaymentMethod}
        options={{
          title: t("payment_method") || "",
          headerStyle: {
            justifyContent: language === "en" ? "flex-start" : "flex-end",
          },
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="profile_shipping_address"
        component={ShippingAddress}
        options={{
          title: t("profile_shipping_address") || "",
          headerStyle: {
            justifyContent: language === "en" ? "flex-start" : "flex-end",
          },
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="profile_my_watch_list"
        component={MyWatchList}
        options={{
          title: t("profile_my_watch_list") || "",
          headerStyle: {
            justifyContent: language === "en" ? "flex-start" : "flex-end",
          },
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}
