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

export function LightButton({ title, onPress, disabled }: buttonPropsType) {
  const { t } = useTranslation("common");

  return (
    <Button
      style={{ ...styles.button, ...styles.light_button }}
      disabled={disabled}
      onPress={onPress}>
      <Text variant="bodyLarge" style={styles.light_Text}>
        {t(title)}
      </Text>
    </Button>
  );
}

export function SecondaryButton({ title, onPress, disabled }: buttonPropsType) {
  const { t } = useTranslation("common");

  return (
    <Button
      style={{ ...styles.button, ...styles.secondary_button }}
      disabled={disabled}
      onPress={onPress}>
      <Text variant="bodyLarge" style={styles.secondary_text}>
        {t(title)}
      </Text>
    </Button>
  );
}

export function WarnButton({ title, onPress, disabled }: buttonPropsType) {
  const { t } = useTranslation("common");

  return (
    <Button
      style={{ ...styles.button, ...styles.warn_button }}
      disabled={disabled}
      onPress={onPress}>
      <Text variant="bodyLarge" style={styles.warn_button_text}>
        {t(title)}
      </Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    minHeight: 45,
    width: "100%",
  },

  primary_button: {
    backgroundColor: COLORS._primary_black,
  },

  primary_Text: {
    color: COLORS._text_white,
    fontWeight: "500",
    textTransform: "capitalize",
  },

  light_button: {
    backgroundColor: COLORS._text_white,
  },
  light_Text: {
    color: COLORS._primary_black,
  },
  secondary_text: {
    color: COLORS._primary_black,
    fontWeight: "500",
  },
  secondary_button: {
    backgroundColor: COLORS._secondary_light,
  },
  warn_button: {
    backgroundColor: COLORS._primary_yellow,
  },
  warn_button_text: {
    color: COLORS._primary_black,
  },
});
