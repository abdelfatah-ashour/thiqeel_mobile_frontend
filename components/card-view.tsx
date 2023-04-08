import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { _extends } from "../styles/_extends";

export function CardView({ children }: { children: ReactNode }) {
  return <View style={styles.content}>{children}</View>;
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#ebebeb",
    paddingVertical: 30,
    paddingHorizontal: _extends.paddingHorizontalPages,
    borderRadius: 50,
    // marginTop: -50,
    overflow: "hidden",
  },
});
