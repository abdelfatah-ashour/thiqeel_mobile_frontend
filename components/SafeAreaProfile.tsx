import { SafeArea } from "./SafeArea";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { _extends } from "../styles/_extends";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

// safe area profile props type
type SafeAreaProfileProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  isRefreshing?: boolean;
  onRefresh?: () => void;
};

export function SafeAreaProfile({
  title,
  description,
  isRefreshing = false,
  onRefresh,
  children,
}: SafeAreaProfileProps) {
  const { t } = useTranslation("common");

  return (
    <SafeArea>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: "#f8f9fa",
        }}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.container_profile}>
          <View style={styles.page_head}>
            <Text variant="headlineLarge" style={styles.profile_title}>
              {t(title)}
            </Text>
            <Text variant="labelMedium" style={styles.profile_description}>
              {t(description)}
            </Text>
          </View>
          <>{children}</>
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
    paddingTop: 55,
    paddingBottom: 27.5,
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
