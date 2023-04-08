import { Text } from "react-native-paper";
import { StyleSheet, Pressable } from "react-native";
import { useTranslation } from "react-i18next";

import { checkboxType } from "../Types/shared";

import Checked from "../assets/images/svg/rounded-selected.svg";
import UnChecked from "../assets/images/svg/rounded-unselected.svg";
import { COLORS } from "../constants/Colors";

export function CheckBoxTab({ checked, onCheck, label }: checkboxType) {
  const { t } = useTranslation("common");

  return (
    <Pressable style={styles.check_box} onPress={onCheck}>
      <Text variant="titleMedium" style={styles.label}>
        {t(label)}
      </Text>
      {checked ? <Checked /> : <UnChecked />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  check_box: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    borderWidth: 1.2,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  label: {
    paddingHorizontal: 8,
    color: COLORS._secondary,
  },
});
