import { ReactNode } from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import { isRTL } from "../i18n/isRTL";
import { useHeaderHeight } from "@react-navigation/elements";

export function SafeArea({ children }: { children: ReactNode }) {
  const height = useHeaderHeight();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        direction: isRTL() ? "rtl" : "ltr",
        paddingHorizontal: 30,
        paddingVertical: 20,
      }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={height}>
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
