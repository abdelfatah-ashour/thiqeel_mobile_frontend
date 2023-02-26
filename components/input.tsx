import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { COLORS } from "../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { isRTL } from "../i18n/isRTL";

export function Input(props: any) {
  const {
    value,
    onChange,
    label,
    error,
    iconLeft,
    iconRight,
    autoComplete = "off",
    keyboardType = "name",
    tabIndex = "done",
  } = props;

  const { t } = useTranslation("common");

  return (
    <View>
      {label ? (
        <Text variant="titleMedium" style={styles(props).label}>
          {t(label)}
        </Text>
      ) : null}
      <View style={styles(props).box_input}>
        {iconLeft ? (
          <View style={{ paddingHorizontal: 10 }}>{iconLeft}</View>
        ) : null}
        <TextInput
          value={value}
          onChange={onChange}
          autoCapitalize={"none"}
          autoComplete={autoComplete}
          underlineStyle={{
            display: "none",
          }}
          keyboardType={keyboardType}
          returnKeyType={tabIndex}
          style={styles(props).input}
        />
        {iconRight ? (
          <View style={{ paddingHorizontal: 10 }}>{iconRight}</View>
        ) : null}
      </View>

      {error ? (
        <Text variant="bodySmall" style={styles(props).error}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = (props: any) =>
  StyleSheet.create({
    box_input: {
      borderWidth: 1.25,
      borderColor: props.error ? COLORS._error_color : COLORS._secondary,
      textAlign: "left",
      borderRadius: 6,
      overflow: "hidden",
      flexDirection: "row",
      alignItems: "center",
      direction: isRTL() ? "ltr" : "inherit",
    },
    input: {
      height: 45,
      backgroundColor: COLORS._secondary_light,
      flex: 1,
      paddingHorizontal: props.iconLeft || props.iconRight ? 0 : 16,
    },
    label: {
      marginBottom: 4,
      textTransform: "capitalize",
      color: COLORS._Menu_text,
    },
    error: {
      color: COLORS._error_color,
      padding: 4,
    },
  });
