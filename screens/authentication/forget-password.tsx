import React, { useReducer } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { SafeArea } from "../../components/SafeArea";
import { useTranslation } from "react-i18next";
import { DispatchAction } from "../../Types/shared";
import { PrimaryButton } from "../../components/_buttons";
import { COLORS } from "../../constants/Colors";

import { CodeFieldUI } from "../../components/code-field";
import {
  createNewPasswordValidator,
  forgetPasswordValidator,
} from "../../utils/validation/authentication";
import {
  createNewPasswordApi,
  forgetPasswordApi,
  sendCodeApi,
} from "../../utils/api/authentication";
import { Modal } from "../../components/modal";
import { verifyCodeType } from "../../Types/api-types";

type stateType = {
  email: string;
  phone: string;
  code: string;
  new_password: string;
  show_code: boolean;
  disabled: boolean;
  type: "email" | "phone";
  displayCodeInput: boolean;
  newPassword: string;
  isNewPassword: boolean;
  errors: {
    email: string;
    phone: string;
    new_password: string;
  };
  error: "";
  openModal: boolean;
};

let state: stateType = {
  email: "",
  phone: "",
  code: "",
  new_password: "",
  show_code: false,
  disabled: false,
  type: "email",
  displayCodeInput: false, // input code
  newPassword: "",
  isNewPassword: false, // input create new password
  errors: {
    email: "",
    phone: "",
    new_password: "",
  },
  error: "",
  openModal: false,
};

// constants
const ON_CHANGE = "ON_CHANGE";
const ON_DISABLED = "ON_DISABLED";
const ON_TOGGLE_CURRENT_INPUT = "ON_TOGGLE_CURRENT_INPUT";
const ON_DISPLAY_CODE_INPUT = "ON_DISPLAY_CODE_INPUT";
const ON_OPEN_MODAL = "ON_OPEN_MODAL";
const ON_ERROR = "ON_ERROR";
const ON_ERRORS = "ON_ERRORS";
const ON_CREATE_NEW_PASSWORD = "";

export function ForgetPassword({ Navigation }: any) {
  const { t } = useTranslation("common");

  const [forgetPassword, dispatch] = useReducer(forgetPasswordReducer, state);

  function forgetPasswordReducer(
    state: stateType,
    { type, payload }: DispatchAction,
  ) {
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

      case ON_ERRORS:
        return {
          ...state,
          errors: {
            ...state.errors,
            [payload.name]: payload.value,
          },
        };

      case ON_DISPLAY_CODE_INPUT:
        return {
          ...state,
          displayCodeInput: payload,
        };

      case ON_DISABLED:
        return {
          ...state,
          disabled: payload,
        };

      case ON_TOGGLE_CURRENT_INPUT:
        return {
          ...state,
          type: payload,
        };
      case ON_ERROR:
        return {
          ...state,
          error: payload,
        };

      case ON_OPEN_MODAL:
        return {
          ...state,
          openModal: payload,
        };

      case ON_CREATE_NEW_PASSWORD:
        return {
          ...state,
          isNewPassword: payload,
        };

      default:
        return state;
    }
  }

  function onDisabled(val: boolean) {
    dispatch({
      type: ON_DISABLED,
      payload: val,
    });
  }

  function onToggleCurrentInput(input: string) {
    dispatch({ type: ON_TOGGLE_CURRENT_INPUT, payload: input });
  }

  function onChange(name: string, value: string) {
    dispatch({
      type: ON_CHANGE,
      payload: {
        name,
        value,
      },
    });
  }

  function onDisplayInputCode(val: boolean) {
    dispatch({
      type: ON_DISPLAY_CODE_INPUT,
      payload: val,
    });
  }

  function onOpenModal(val: boolean) {
    dispatch({
      type: ON_OPEN_MODAL,
      payload: val,
    });
  }

  function onSendForgetPassword() {
    onDisabled(true);
    forgetPasswordValidator(forgetPassword)
      ?.then(() => {
        let data: { [ket: string]: string } = {
          type: forgetPassword.type,
        };

        if (forgetPassword.type === "email") {
          data = {
            ...data,
            email: forgetPassword.email,
          };
        } else {
          data = {
            ...data,
            phone: forgetPassword.phone,
          };
        }
        forgetPasswordApi(data)
          .then(() => {
            onDisplayInputCode(true);
          })
          .catch(error => {
            console.log(error);

            dispatch({
              type: ON_ERROR,
              payload: error.message,
            });

            dispatch({
              type: ON_OPEN_MODAL,
              payload: true,
            });
            onDisabled(false);
          });
      })
      .catch(errors => {
        onDisabled(false);
        errors.inner.map(
          ({ path, message }: { path: string; message: string }) => {
            dispatch({
              type: ON_ERRORS,
              payload: {
                name: path,
                value: message,
              },
            });
          },
        );
      });
  }

  function verifyCode(code: string) {
    let payload: verifyCodeType = {
      code: "",
      type: "email",
    };

    payload = {
      ...payload,
      type: forgetPassword.type,
      code,
    };

    if (forgetPassword.type === "email") {
      payload = {
        ...payload,
        email: forgetPassword.email,
      };
    }

    if (forgetPassword.type === "phone") {
      payload = {
        ...payload,
        phone: forgetPassword.phone,
      };
    }

    if (code.length === 6) {
      sendCodeApi(payload)
        .then(() => {
          dispatch({
            type: ON_CREATE_NEW_PASSWORD,
            payload: true,
          });
        })
        .catch(error => {
          dispatch({
            type: ON_ERROR,
            payload: error.message,
          });
        });
    }
  }

  function onCreateNewPassword() {
    onDisabled(true);
    createNewPasswordValidator({
      new_password: forgetPassword.new_password,
    })
      .then(() => {
        createNewPasswordApi({
          password: forgetPassword.new_password,
          password_confirmation: forgetPassword.new_password,
        })
          .then(() => {
            Navigation.navigate("login");
          })
          .catch(({ message }) => {
            dispatch({
              type: ON_ERROR,
              payload: message,
            });
          });
      })
      .catch(errors => {
        onDisabled(false);
        errors.inner.map(
          ({ path, message }: { path: string; message: string }) => {
            dispatch({
              type: ON_ERRORS,
              payload: {
                name: path,
                value: message,
              },
            });
          },
        );
      });
  }

  return (
    <SafeArea>
      <View style={styles.container}>
        <Text variant="headlineLarge" style={styles.page_title}>
          {t("forget_password")}
        </Text>
        {!forgetPassword.isNewPassword ? (
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
            {forgetPassword.type === "email" ? (
              <View style={styles.wrap_label_and_input}>
                <TextInput
                  value={forgetPassword.email}
                  placeholder={t("email") || ""}
                  left={<TextInput.Icon icon="email" size={24} />}
                  onChangeText={value => onChange("email", value)}
                  keyboardType="email-address"
                  autoComplete={"off"}
                  autoCapitalize={"none"}
                />
                <Text variant="labelLarge" style={styles.message_error}>
                  {t(forgetPassword.errors?.email)}
                </Text>
              </View>
            ) : (
              <View style={styles.wrap_label_and_input}>
                <TextInput
                  value={forgetPassword.phone}
                  placeholder={t("phone") || ""}
                  left={<TextInput.Icon icon="phone" size={16} color="black" />}
                  onChangeText={value => {
                    onChange("phone", value);
                  }}
                  keyboardType="phone-pad"
                  autoComplete={"off"}
                  autoCapitalize={"none"}
                />
                <Text variant="labelLarge" style={styles.message_error}>
                  {t(forgetPassword.errors?.phone)}
                </Text>
              </View>
            )}
            <View>
              <PrimaryButton
                title="get_code"
                onPress={onSendForgetPassword}
                disabled={forgetPassword.disabled}
              />
            </View>
          </>
        ) : null}

        {forgetPassword.displayCodeInput && !forgetPassword.isNewPassword ? (
          <CodeFieldUI
            value={forgetPassword.code}
            onTextChanged={(text: string) => {
              onChange("code", text);
              verifyCode(text);
            }}
          />
        ) : null}

        {forgetPassword.isNewPassword ? (
          <View style={styles.wrap_label_and_input}>
            <TextInput
              value={forgetPassword.new_password}
              placeholder={t("new_password") || ""}
              onChangeText={value => {
                onChange("new_password", value);
              }}
              autoComplete={"off"}
            />
            <Text variant="labelLarge" style={styles.message_error}>
              {t(forgetPassword.errors?.new_password)}
            </Text>
            <View>
              <PrimaryButton
                title="create_new_password"
                onPress={onCreateNewPassword}
                // disabled={forgetPassword.disabled}
              />
            </View>
          </View>
        ) : null}

        <Modal
          open={forgetPassword.openModal}
          onHide={() => {
            onOpenModal(false);
          }}
          title="error"
          message={forgetPassword.error}
        />
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  wrap_control: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    marginBottom: 12,
  },
  page_title: {
    marginBottom: 24,
    textTransform: "capitalize",
    fontWeight: "700",
  },
  wrap_label_and_input: {
    marginBottom: 16,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
    height: 40,
  },
  message_error: {
    marginTop: 6,
    color: COLORS._error_color,
    textTransform: "capitalize",
  },
});
