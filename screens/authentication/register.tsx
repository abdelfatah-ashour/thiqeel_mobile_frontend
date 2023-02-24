import { StyleSheet, View } from "react-native";

import { SafeArea } from "../../components/SafeArea";
import { AuthenticationLayout } from "../../components/AuthenticationLayout";
import { DispatchAction } from "../../Types/shared";
import { authenticateStateType } from "../../Types/authentication";
import { registerValidation } from "../../utils/validation/authentication";
import { registerApi } from "../../utils/api/authentication";
import { Text } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { Modal } from "../../components/modal";
import { useReducer } from "react";
import { CreateErrorOptions } from "yup";
import { PrimaryButton } from "../../components/_buttons";
import { _Typography } from "../../styles/_typography";

// CONSTANT
const registerState: authenticateStateType = {
  phone: "",
  email: "",
  password: "",
  show: false,
  type: "email",
  disabled: false,
  open: false,
  errors: {
    email: "",
    phone: "",
    password: "",
  },
  onError: "",
};

const ON_TOGGLE_CURRENT_INPUT = "ON_TOGGLE_CURRENT_INPUT";
const ON_SHOW_TEXT = "ON_SHOW_TEXT";
const ON_CHANGE = "ON_CHANGE";
const ON_ERRORS = "ON_ERRORS";
const ON_ERROR = "ON_ERROR";
const ON_OPEN = "ON_OPEN";
const ON_RESET = "ON_RESET";
const ON_DISABLED = "ON_DISABLED";

export function Register({ navigation }: { navigation: any }) {
  const { t } = useTranslation("common");
  const [register, dispatch] = useReducer(registerReducer, registerState);

  function registerReducer(
    state: authenticateStateType,
    { type, payload }: DispatchAction,
  ) {
    switch (type) {
      case ON_TOGGLE_CURRENT_INPUT:
        return {
          ...state,
          type: payload,
        };

      case ON_CHANGE:
        return {
          ...state,
          [payload.name]: payload.value,
          errors: {
            ...state.errors,
            [payload.name]: "",
          },
        };

      case ON_SHOW_TEXT:
        return {
          ...state,
          show: !state.show,
        };

      case ON_OPEN:
        return {
          ...state,
          open: payload,
        };

      case ON_ERRORS:
        return {
          ...state,
          errors: {
            ...state.errors,
            [payload.name]: payload.message,
          },
        };

      case ON_ERROR:
        return {
          ...state,
          onError: payload,
        };

      case ON_RESET:
        return {
          ...state,
          phone: "",
          email: "",
          password: "",
          show: false,
          type: "email",
          disabled: false,
          open: false,
          errors: {
            email: "",
            phone: "",
            password: "",
          },
          onError: "",
        };
      default:
        return state;
    }
  }

  function onRegister() {
    dispatch({
      type: ON_DISABLED,
      payload: true,
    });
    registerValidation(register)
      ?.then(() => {
        registerApi({
          type: register.type,
          email: register.email,
          phone: register.phone,
          password: register.password,
        })
          .then(({ data, message }) => {
            // redirect
            navigation.navigate("root");
          })
          .catch(error => {
            dispatch({
              type: ON_ERROR,
              payload: error.message,
            });
            dispatch({
              type: ON_OPEN,
              payload: true,
            });
          })
          .finally(() => {
            dispatch({
              type: ON_DISABLED,
              payload: true,
            });
          });
      })
      .catch(error => {
        dispatch({
          type: ON_DISABLED,
          payload: false,
        });
        error?.inner?.map((msg: CreateErrorOptions) => {
          dispatch({
            type: ON_ERRORS,
            payload: {
              name: msg.path,
              message: msg.message,
            },
          });
        });
      });
  }

  return (
    <SafeArea>
      <View style={styles.container}>
        <Text variant="displaySmall" style={styles.title}>
          {t("create_account")}
        </Text>
        <AuthenticationLayout state={register} dispatch={dispatch}>
          <View style={styles.wrap_label_and_input}>
            <PrimaryButton
              title="create_account"
              onPress={onRegister}
              disabled={register.disabled}
            />
          </View>
          <View style={styles.wrap_label_and_input}>
            <Text
              onPress={() => {
                navigation.navigate("login");
              }}
              variant="titleMedium"
              style={_Typography.text_link}>
              {t("already_have_account")}
            </Text>
          </View>
        </AuthenticationLayout>
      </View>
      <Modal
        open={register.open}
        onHide={() => {
          dispatch({ type: ON_OPEN, payload: false });
        }}
        title="error"
        message={register.onError}
      />
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    justifyContent: "center",
  },
  title: {
    marginBottom: 24,
    textTransform: "capitalize",
    fontWeight: "700",
  },
  wrap_label_and_input: {
    marginBottom: 16,
  },
});
