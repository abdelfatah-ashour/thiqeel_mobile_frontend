import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { PrimaryButton } from "./_buttons";
import { authenticateStateType } from "../Types/authentication";
import { DispatchAction } from "../Types/shared";
import { useTranslation } from "react-i18next";
import { COLORS } from "../constants/Colors";

type AuthenticationLayoutProps = {
  state: authenticateStateType;
  dispatch: (args: DispatchAction) => void;
  children: React.ReactNode;
};

const ON_TOGGLE_CURRENT_INPUT = "ON_TOGGLE_CURRENT_INPUT";
const ON_SHOW_TEXT = "ON_SHOW_TEXT";
const ON_CHANGE = "ON_CHANGE";

export function AuthenticationLayout({
  state,
  dispatch,
  children,
}: AuthenticationLayoutProps) {
  const { t } = useTranslation("common");

  function onShowText() {
    dispatch({
      type: ON_SHOW_TEXT,
    });
  }

  function onToggleCurrentInput(input: string) {
    dispatch({ type: ON_TOGGLE_CURRENT_INPUT, payload: input });
  }

  function onChangeValues(name: string, value: string) {
    dispatch({
      type: ON_CHANGE,
      payload: {
        name,
        value,
      },
    });
  }

  return (
    <>
      <View style={styles.wrap_control}>
        <Button
          onPress={() => onToggleCurrentInput("email")}
          style={styles.button}>
          <Text variant="titleMedium">{t("email")}</Text>
        </Button>
        <Button
          onPress={() => onToggleCurrentInput("phone")}
          style={styles.button}>
          <Text variant="titleMedium">{t("phone")}</Text>
        </Button>
      </View>
      {state.type === "email" ? (
        <View style={styles.wrap_label_and_input}>
          <Text variant="titleMedium">{t("email")}</Text>
          <TextInput
            value={state.email}
            placeholder={t("email") || ""}
            left={<TextInput.Icon icon="email" size={24} />}
            onChangeText={value => onChangeValues("email", value)}
            keyboardType="email-address"
            autoComplete={"off"}
          />
          <Text variant="labelLarge" style={styles.message_error}>
            {t(state.errors?.email || "")}
          </Text>
        </View>
      ) : (
        <View style={styles.wrap_label_and_input}>
          <Text variant="titleMedium">{t("phone")}</Text>

          <TextInput
            value={state.phone}
            placeholder={t("phone") || ""}
            left={<TextInput.Icon icon="phone" size={16} color="black" />}
            onChangeText={value => {
              onChangeValues("phone", value);
            }}
            keyboardType="phone-pad"
            autoComplete={"off"}
          />
          <Text variant="labelLarge" style={styles.message_error}>
            {t(state.errors?.phone || "")}
          </Text>
        </View>
      )}
      <View style={styles.wrap_label_and_input}>
        <Text variant="titleMedium">{t("password")}</Text>

        <TextInput
          value={state.password}
          placeholder={t("password") || ""}
          secureTextEntry={!state.show}
          left={
            <TextInput.Icon
              icon={state.show ? "eye" : "eye-off"}
              size={24}
              onPress={onShowText}
            />
          }
          onChangeText={value => onChangeValues("password", value)}
          autoComplete={"off"}
        />

        <Text variant="labelLarge" style={styles.message_error}>
          {t(state.errors?.password || "")}
        </Text>
      </View>
      {children}
    </>
  );
}

const styles = StyleSheet.create({
  wrap_control: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    marginBottom: 12,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
    height: 40,
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  wrap_label_and_input: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 16,
    fontWeight: "600",
  },
  message_error: {
    marginTop: 6,
    color: COLORS._error_color,
    textTransform: "capitalize",
  },
});
