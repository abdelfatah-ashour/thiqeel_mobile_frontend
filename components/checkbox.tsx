import { Text } from "react-native-paper";
import Checked from "../assets/images/svg/chekbox-checked.svg";
import UnChecked from "../assets/images/svg/chekbox-unchecked.svg";
import { StyleSheet, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import { checkboxType } from "../Types/shared";

export function CheckBox({ checked, onCheck, label }: checkboxType) {
  const { t } = useTranslation("common");

  return (
    <Pressable style={styles.check_box} onPress={onCheck}>
      {checked ? <Checked /> : <UnChecked />}
      <Text variant="titleMedium" style={styles.label}>
        {t(label)}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  check_box: {
    flexDirection: "row",
    alignItems: "center",
    // flex: 1,
  },
  label: {
    paddingHorizontal: 8,
  },
});
