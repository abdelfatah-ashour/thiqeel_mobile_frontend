import { StyleSheet, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { SafeAreaProfile } from "../components/SafeAreaProfile";
import { PrimaryButton } from "../components/_buttons";
import { Input } from "../components/input";

export function PersonalInfo({ navigation }: any) {
  return (
    <SafeAreaProfile
      SafeAreaProfile={navigation}
      title={"personal_info"}
      description={"profile_info_desc"}>
      <View style={styles.group_input}>
        <Input
          label="first_name"
          value=""
          onChange={() => {}}
          error=""
          tabIndex={"next"}
        />
      </View>
      <View style={styles.group_input}>
        <Input
          label="middle_name"
          value=""
          onChange={() => {}}
          error=""
          tabIndex={"next"}
        />
      </View>
      <View style={styles.group_input}>
        <Input
          label="last_name"
          value=""
          onChange={() => {}}
          error=""
          tabIndex={"next"}
        />
      </View>
      <View style={styles.group_input}>
        <Input
          label="email"
          value=""
          onChange={() => {}}
          error=""
          iconLeft={<MaterialIcons name="email" size={32} tabIndex={"next"} />}
          tabIndex={"next"}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.group_input}>
        <Input
          label="mobile_number"
          // value=""
          onChange={() => {}}
          error=""
          iconLeft={<MaterialIcons name="phone" size={32} />}
          keyboardType="phone-pad"
        />
      </View>
      <View style={styles.group_input}>
        <PrimaryButton title="update_profile" onPress={() => {}} />
      </View>
    </SafeAreaProfile>
  );
}

const styles = StyleSheet.create({
  container_profile: {
    padding: 0,
    margin: 0,
  },
  profile_description: {
    marginVertical: 12,
  },
  group_input: {
    marginBottom: 16,
  },
  label: {
    marginVertical: 6,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  page_head: {
    paddingTop: 30,
    paddingBottom: 50,
  },
  content: {
    backgroundColor: "#dadada",
    paddingVertical: 30,
    paddingHorizontal: 10,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    marginTop: -50,
  },
});
