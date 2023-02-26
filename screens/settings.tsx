import { Button, Text } from "react-native-paper";
import { SafeArea } from "../components/SafeArea";
import { View, StyleSheet, Pressable } from "react-native";
import { useTranslation } from "react-i18next";

import { _Typography } from "../styles/_typography";
import ArabicFlag from "../assets/images/svg/suadi.svg";
import EnglishFlag from "../assets/images/svg/england-flag.svg";

import { isRTL } from "../i18n/isRTL";
import i18n from "../i18n/i18n";
import { _extends } from "../styles/_extends";
import { ScrollView } from "react-native-gesture-handler";

export function Settings({ navigation }: any) {
  const { t } = useTranslation("common");

  return (
    <SafeArea>
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              paddingTop: 30,
            }}>
            <Text
              variant="displayLarge"
              style={{ ...styles.text_margin, ...styles.title }}>
              {t("thiqeel")}
            </Text>
            <Text variant="headlineSmall" style={{ ...styles.text_margin }}>
              {t("thiqeel_desc")}
            </Text>
            <Text
              variant="titleLarge"
              onPress={() => {
                navigation.navigate("authentication");
              }}
              style={{
                ..._Typography.text_link,
                ...styles.text_margin,
              }}>
              {t("register")}
            </Text>
          </View>

          <View
            style={{
              marginTop: 30,
            }}>
            <View>
              <Text
                style={{ ..._Typography.text_link, ...styles.links }}
                onPress={() => navigation.navigate("terms-condition")}>
                {t("terms_condition")}
              </Text>
              <Text
                style={{ ..._Typography.text_link, ...styles.links }}
                onPress={() => navigation.navigate("contact-us")}>
                {t("contact_us")}
              </Text>
              <Text
                style={{ ..._Typography.text_link, ...styles.links }}
                onPress={() => navigation.navigate("about-us")}>
                {t("about_us")}
              </Text>
            </View>
            <View style={styles.language}>
              <Pressable
                style={{
                  flexDirection: "row",
                }}
                onPress={() => {
                  i18n.changeLanguage(isRTL() ? "en" : "ar");
                }}>
                {isRTL() ? (
                  <>
                    <EnglishFlag />
                    <Text style={styles.language_text}>English</Text>
                  </>
                ) : (
                  <>
                    <ArabicFlag />
                    <Text style={styles.language_text}>العربية</Text>
                  </>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: _extends.paddingHorizontalPages,
  },
  title: {
    fontWeight: "700",
    textTransform: "uppercase",
  },
  text_margin: {
    marginVertical: 12,
  },
  language: {
    flexDirection: "row",
  },
  language_text: {
    marginHorizontal: 6,
  },
  links: {
    marginBottom: 16,
  },
});
