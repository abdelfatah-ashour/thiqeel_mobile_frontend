import { StyleSheet, View } from "react-native";

import { SafeArea } from "../../components/SafeArea";
import { AuthenticationLayout } from "../../components/AuthenticationLayout";
import { DispatchAction } from "../../Types/shared";
import { authenticateStateType } from "../../Types/authentication";
import { authenticateValidation } from "../../utils/validation/authentication";
import { loginApi } from "../../utils/api/authentication";
import { StoreToken, StoreUser } from "../../utils/storage";
import { Text } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useReducer } from "react";
import { CreateErrorOptions } from "yup";

// CONSTANT
const loginState: authenticateStateType = {
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

export function Login({ navigation }: { navigation: any }) {
  const { t } = useTranslation("common");
  const [login, dispatch] = useReducer(registerReducer, loginState);

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

  function onLogin() {
    authenticateValidation(login)
      ?.then(() => {
        loginApi({
          type: login.type,
          email: login.email,
          phone: login.phone,
          password: login.password,
        })
          .then(({ data }) => {
            StoreToken(data?.token);
            StoreUser({
              ...data,
              token: "",
            });

            // redirect
            navigation.navigate("profile_personal_info");
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
          });
      })
      .catch(error => {
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
          {t("login")}
        </Text>
        <AuthenticationLayout
          state={login}
          dispatch={dispatch}
          onSubmit={onLogin}
        />
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  title: {
    marginBottom: 24,
    textTransform: "capitalize",
    fontWeight: "700",
  },
});
