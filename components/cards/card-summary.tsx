import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { summaryPropsType } from "../../Types/profile";
import { COLORS } from "../../constants/Colors";
import { _extends } from "../../styles/_extends";

export function CardSummary({ count, title, children }: summaryPropsType) {
  console.log("🚀 > file: card-summary.tsx:12 > title : ", title);
  return (
    <View style={styles.card}>
      <View style={styles.card_description}>
        <Text variant="labelLarge" style={styles.card_title_count}>
          {count}
        </Text>
        <Text variant="titleMedium" style={styles.card_main_title}>
          {title}
        </Text>
      </View>
      <Text variant="titleLarge">{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS._text_white,
    marginHorizontal: _extends.paddingHorizontalPages,
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    elevation: 5,
  },
  card_title_count: {
    fontSize: 28,
    lineHeight: 28,
    marginBottom: 10,
  },
  card_description: {
    justifyContent: "space-between",
  },
  card_main_title: {
    color: COLORS._links_hover,
  },
});
