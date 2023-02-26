import { SafeArea } from "./SafeArea";
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { _extends } from "../styles/_extends";

export function SafeAreaProfile({ title, description, children }: any) {
  const { t } = useTranslation("common");

  return (
    <SafeArea>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: "#f8f9fa",
        }}>
        <View style={styles.container_profile}>
          <View style={styles.page_head}>
            <Text variant="headlineLarge" style={styles.profile_title}>
              {t(title)}
            </Text>
            <Text variant="labelMedium" style={styles.profile_description}>
              {t(description)}
            </Text>
          </View>
          <View style={styles.content}>{children}</View>
          <View style={styles.footer}></View>
        </View>
      </ScrollView>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  container_profile: {
    padding: 0,
    margin: 0,
  },
  profile_title: {
    fontWeight: "700",
    paddingBottom: 8,
  },
  profile_description: {
    marginBottom: 24,
  },
  page_head: {
    paddingTop: 30,
    paddingBottom: 50,
    paddingHorizontal: _extends.paddingHorizontalPages,
  },
  content: {
    backgroundColor: "#ebebeb",
    paddingVertical: 30,
    paddingHorizontal: _extends.paddingHorizontalPages,
    borderRadius: 50,
    marginTop: -50,
  },
  footer: {
    minHeight: 25,
  },
});
