import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
import { isRTL } from "../../i18n/isRTL";
import { Heading } from "../../Types/shared";
import { utilStyles } from "../../utils/config";
import { Text } from "../typography/Text";

type inputPropsType = {
  value: string;
  onChange: (text: string) => void;
  error: string;
};

export function InputMobileNumber({ value, onChange, error }: inputPropsType) {
  const { t } = useTranslation("common");

  return (
    <View>
      <Text
        variant={Heading.h1}
        style={styles.label}
        text={t("mobile_number")}
      />

      <View style={[styles.box_input, error ? styles.error : {}]}>
        <Text variant={Heading.h3} style={styles.input_code} text={"+977"} />
        <TextInput
          style={styles.input}
          keyboardType="name-phone-pad"
          textContentType="telephoneNumber"
          value={value}
          onChangeText={text => {
            onChange(text);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box_input: {
    borderWidth: 1.25,
    borderColor: utilStyles.colors._secondary,
    textAlign: "left",
    borderRadius: utilStyles.spacing._x2,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    direction: isRTL() ? "ltr" : "inherit",
  },
  input: {
    height: 45,
    backgroundColor: utilStyles.colors._secondary_light,
    flex: 1,
    paddingHorizontal: 16,
  },
  input_code: {
    height: 45,
    alignSelf: "center",
    lineHeight: 45,
    paddingHorizontal: utilStyles.spacing._x2,
    backgroundColor: utilStyles.colors._secondary_light,
    borderWidth: 1,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: utilStyles.spacing._x2,
    borderBottomLeftRadius: utilStyles.spacing._x2,
  },
  label: {
    marginBottom: 4,
    textTransform: "capitalize",
    color: utilStyles.colors._Menu_text,
  },
  error: {
    borderColor: utilStyles.colors._error_color,
  },
});
