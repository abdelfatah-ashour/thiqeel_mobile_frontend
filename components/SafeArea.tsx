import { ReactNode } from "react";
import { Platform, SafeAreaView, StatusBar } from "react-native";
import { isRTL } from "../i18n/isRTL";

export function SafeArea({ children }: { children: ReactNode }) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        direction: isRTL() ? "rtl" : "ltr",
      }}>
      {children}
    </SafeAreaView>
  );
}
