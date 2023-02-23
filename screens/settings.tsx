import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native";

import { SafeAreaProfile } from "../components/SafeAreaProfile";

export function Settings({ navigation }: any) {
  return (
    <SafeAreaProfile navigation={navigation}>
      <></>
    </SafeAreaProfile>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
