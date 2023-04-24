import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { Input } from "../components/inputs/input";
import { SafeAreaProfile } from "../components/SafeAreaProfile";
import { _extends } from "../styles/_extends";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { PrimaryButton } from "../components/_buttons";
import { useReducer, useState } from "react";
import { DispatchAction } from "../Types/shared";
import { updateProfileAPi } from "../utils/api/profile";
import { validatePassword } from "../utils/validation/authentication";

//  CONSTANTS

const ON_CHANGE = "ON_CHANGE";
const FIRST_EYE = "FIRST_EYE";
const SECOND_EYE = "SECOND_EYE";
const ON_ERROR = "ON_ERROR";
const DISABLED = "DISABLED";

type initStateType = {
  password: string;
  confirm_password: string;
  disable: boolean;
  first_eye: boolean;
  second_eye: boolean;
  errors: {
    password: string;
    confirm_password: string;
  };
};

const initState: initStateType = {
  password: "",
  confirm_password: "",
  disable: false,
  first_eye: false,
  second_eye: false,
  errors: {
    password: "",
    confirm_password: "",
  },
};

export function PasswordSecurity() {
  const { t } = useTranslation("common");
  const [password, dispatch] = useReducer(reducer, initState);

  function reducer(state: initStateType, { type, payload }: DispatchAction) {
    switch (type) {
      case ON_CHANGE:
        return {
          ...state,
          [payload.name]: payload.value,
          errors: {
            ...state.errors,
            [payload.name]: "",
          },
        };
      case DISABLED:
        return {
          ...state,
          disable: payload,
        };

      case FIRST_EYE:
        return {
          ...state,
          first_eye: !state.first_eye,
        };

      case SECOND_EYE:
        return {
          ...state,
          second_eye: !state.second_eye,
        };

      case ON_ERROR:
        return {
          ...state,
          errors: {
            ...state.errors,
            [payload.name]: payload.value,
          },
        };

      default:
        return state;
    }
  }

  function onChange(name: string, value: string) {
    dispatch({ type: ON_CHANGE, payload: { name, value } });
  }

  function onToggleEye(name: string) {
    if (name === FIRST_EYE) {
      dispatch({ type: FIRST_EYE });
    } else {
      dispatch({ type: SECOND_EYE });
    }
  }

  // call api -- update password
  function updatePassword() {
    validatePassword(password.password, password.confirm_password)
      .then(() => {
        updateProfileAPi({
          password: password.password,
          confirm_password: password.confirm_password,
        })
          .then(({ message }) => {
            Alert.alert(message);
          })
          .catch(({ message }) => {
            Alert.alert(message);
          })
          .finally(() => {
            dispatch({ type: DISABLED, payload: false });
          });
      })
      .catch(message => {
        dispatch({
          type: ON_ERROR,
          payload: {
            name: "password",
            value: {
              ...password.errors,
              password: message,
            },
          },
        });
      });
  }

  return (
    <SafeAreaProfile
      title={t("password_security_title")}
      description="password_security_desc">
      <View style={styles.container}>
        <Text variant="titleLarge" style={styles.change_password_title}>
          {t("change_password_title")}
        </Text>
        <Text variant="bodyMedium">{t("change_password_desc")}</Text>
        <View style={styles.form}>
          <View style={styles.input}>
            <Input
              label="password"
              value={password.password}
              onChange={text => {
                onChange("password", text);
              }}
              error={t(password.errors.password) || ""}
              disabled={false}
              iconLeft={<Entypo name="lock" size={24} color="black" />}
              iconRight={
                <Ionicons
                  name={password.first_eye ? "eye" : "eye-off"}
                  size={24}
                  color="black"
                  onPress={() => onToggleEye(FIRST_EYE)}
                />
              }
              secureTextEntry={password.first_eye ? false : true}
            />
          </View>
          <View style={styles.input}>
            <Input
              label="new_password"
              value={password.confirm_password}
              onChange={text => {
                onChange("confirm_password", text);
              }}
              error=""
              disabled={false}
              iconLeft={<Entypo name="lock" size={24} color="black" />}
              iconRight={
                <Ionicons
                  name={password.second_eye ? "eye" : "eye-off"}
                  size={24}
                  color="black"
                  onPress={() => onToggleEye(SECOND_EYE)}
                />
              }
              secureTextEntry={password.second_eye ? false : true}
            />
          </View>
          <View style={styles.button}>
            <PrimaryButton title={"save"} onPress={updatePassword} />
          </View>
        </View>
      </View>
    </SafeAreaProfile>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: _extends.paddingHorizontalPages,
  },
  change_password_title: {
    marginBottom: 12,
    fontWeight: "700",
  },
  form: {
    marginTop: 24,
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 24,
  },
});
