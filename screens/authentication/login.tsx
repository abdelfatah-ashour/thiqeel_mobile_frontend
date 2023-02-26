import { useReducer } from "react";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { CreateErrorOptions } from "yup";

import { SafeArea } from "../../components/SafeArea";
import { AuthenticationLayout } from "../../components/AuthenticationLayout";
import { DispatchAction } from "../../Types/shared";
import { authenticateStateType } from "../../Types/authentication";
import { loginValidation } from "../../utils/validation/authentication";
import { loginApi } from "../../utils/api/authentication";
import { StoreToken, StoreUser } from "../../utils/storage";
import { Text } from "react-native-paper";
import { PrimaryButton } from "../../components/_buttons";
import { _Typography } from "../../styles/_typography";
import { setToken, setUser } from "../../store/slices/auth";
import { useDispatch } from "react-redux";

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
  const Dispatch = useDispatch();

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
    loginValidation(login)
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

            Dispatch(setUser(data));
            Dispatch(setToken(data?.token));

            // redirect
            navigation.navigate("home");
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
        <AuthenticationLayout state={login} dispatch={dispatch}>
          <View style={styles.wrap_label_and_input}>
            <PrimaryButton
              title="login"
              onPress={onLogin}
              disabled={login.disabled}
            />
          </View>

          <View style={styles.wrap_label_and_input}>
            <Text
              onPress={() => {
                navigation.navigate("register");
              }}
              variant="titleSmall"
              style={{
                ..._Typography.text_link,
                textDecorationLine: "underline",
              }}>
              {t("dont_have_account")}
            </Text>
          </View>

          <View style={{ ...styles.wrap_label_and_input }}>
            <Text
              variant="titleSmall"
              style={{ textDecorationLine: "underline" }}
              onPress={() => {
                navigation.navigate("forget-password");
              }}>
              {t("forget_password")}
            </Text>
          </View>
        </AuthenticationLayout>
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
