import { StyleSheet, Text, View } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { RootTabScreenProps } from "../types";

export function My_Wallet({ navigation }: RootTabScreenProps<"my_wallet">) {
  return (
    <View style={styles.container}>
      <Text>My_Wallet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
