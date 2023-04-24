import { SafeArea } from "./SafeArea";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { _extends } from "../styles/_extends";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { Text } from "./typography/Text";
import { Heading } from "../Types/shared";

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
            <Text
              variant={Heading.h1}
              style={styles.profile_title}
              text={t(title)}
            />
            <Text
              variant={Heading.span}
              style={styles.profile_description}
              text={t(description)}
            />
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
    fontWeight: "900",
    paddingBottom: 8,
  },
  profile_description: {
    marginBottom: 24,
    lineHeight: 24,
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
