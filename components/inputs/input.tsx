import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
import { COLORS } from "../../constants/Colors";
import { isRTL } from "../../i18n/isRTL";
import { Heading, inputPropsType } from "../../Types/shared";
import { utilStyles } from "../../utils/config";
import { Text } from "../typography/Text";

export function Input(props: inputPropsType) {
  const {
    value,
    onChange,
    label,
    error,
    iconLeft,
    iconRight,
    autoComplete = "off",
    keyboardType = "default",
    tabIndex = "done",
    disabled,
    secureTextEntry = false,
  } = props;

  const { t } = useTranslation("common");

  return (
    <View>
      {label ? (
        <Text
          variant={Heading.label}
          style={styles(props).label}
          text={t(label)}
        />
      ) : null}
      <View style={styles(props).box_input}>
        {iconLeft ? (
          <View style={{ paddingHorizontal: 10 }}>{iconLeft}</View>
        ) : null}
        <TextInput
          value={value}
          onChangeText={text => {
            onChange(text);
          }}
          autoCapitalize={"none"}
          autoComplete={autoComplete}
          underlineStyle={{
            display: "none",
          }}
          keyboardType={keyboardType}
          returnKeyType={tabIndex}
          style={styles(props).input}
          disabled={disabled}
          secureTextEntry={secureTextEntry}
        />
        {iconRight ? (
          <View style={{ paddingHorizontal: 10 }}>{iconRight}</View>
        ) : null}
      </View>

      {error ? (
        <Text variant={Heading.span} style={styles(props).error} text={error} />
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
      height: utilStyles.dimension.heightInput,
      backgroundColor: COLORS._secondary_light,
      flex: 1,
      paddingHorizontal: props.iconLeft || props.iconRight ? 8 : 16,
    },
    label: {
      marginBottom: utilStyles.spacing._x2,
      textTransform: "capitalize",
      color: COLORS._Menu_text,
    },
    error: {
      color: COLORS._error_color,
      padding: utilStyles.spacing._x1,
    },
  });
