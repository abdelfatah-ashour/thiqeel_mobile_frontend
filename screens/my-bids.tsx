import { StyleSheet, Text, View } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";

export function My_Bids() {
  return (
    <View style={styles.container}>
      <Text>My_Bids</Text>
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
