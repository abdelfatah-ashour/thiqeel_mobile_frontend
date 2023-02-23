import { Pressable, StyleSheet, View, Image } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeArea } from "../components/SafeArea";
import { useTranslation } from "react-i18next";

export function Profile({ navigation }: any) {
  const { t } = useTranslation("common");

  return (
    <SafeArea>
      {/* <DrawerProfile /> */}
      <View style={styles.profile_container}>
        <View style={styles.profile_container}>
          <View style={styles.profile_box_image}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
              }}
              style={styles.profile_image}
            />
          </View>
          <View>
            <View style={styles.profile_heading}>
              <Text variant="bodyLarge">#</Text>
              <Text variant="bodyLarge">123</Text>
            </View>
            <View style={styles.profile_heading}>
              <Text variant="bodyLarge">{t("username")}</Text>
              <Text variant="bodyLarge">john</Text>
            </View>
            <View style={styles.profile_heading}>
              <Text variant="bodyLarge">{t("email")}</Text>
              <Text variant="bodyLarge">john@test.co</Text>
            </View>
            <View style={styles.profile_Box_button_edit}>
              <Pressable
                style={styles.profile_button_edit}
                onPress={() => navigation.navigate("profile_personal_info")}>
                <Text style={styles.profile_button_edit_text}>
                  {t("edit_profile")}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  profile_container: {
    justifyContent: "center",
  },
  profile_box_image: {
    width: 170,
    height: 170,
    borderRadius: 170 / 2,
    alignSelf: "center",
    marginTop: 100,
    marginBottom: 20,
    overflow: "hidden",
  },
  profile_image: {
    width: "100%",
    height: 170,
  },
  profile_heading: {
    flexDirection: "row",
    paddingHorizontal: 50,
    marginBottom: 16,
  },
  profile_heading_label: {
    width: "30%",
    fontWeight: "600",
  },
  profile_Box_button_edit: {
    alignItems: "center",
    marginTop: 40,
  },
  profile_button_edit: {
    borderWidth: 1,
    padding: 6,
    borderRadius: 6,
  },
  profile_button_edit_text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
