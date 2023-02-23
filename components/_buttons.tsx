import { StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { COLORS } from "../constants/Colors";
import { buttonPropsType } from "../Types/shared";
import { useTranslation } from "react-i18next";

export function PrimaryButton({ title, onPress, disabled }: buttonPropsType) {
  const { t } = useTranslation("common");

  return (
    <Button
      style={{ ...styles.button, ...styles.primary_button }}
      disabled={disabled}
      onPress={onPress}>
      <Text variant="bodyLarge" style={styles.primary_Text}>
        {t(title)}
      </Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    minHeight: 45,
  },

  primary_button: {
    backgroundColor: COLORS._primary_black,
  },

  primary_Text: {
    color: COLORS._primary_yellow,
    fontWeight: "500",
    textTransform: "capitalize",
  },
});
