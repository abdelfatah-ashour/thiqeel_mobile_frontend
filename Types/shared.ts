import React from "react";
import {
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  TextInputAndroidProps,
} from "react-native";
import { TextInputProps } from "react-native-paper";

export type DispatchAction = {
  type: string;
  payload?: any;
};

export type buttonPropsType = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export type ModalPropsType = {
  open: boolean;
  onHide: () => void;
  title?: string;
  message?: string;
};

export type UserType = {
  user_id?: number;
  [key: string]: any;
};

export type checkboxType = {
  checked: boolean;
  label: string;
  onCheck: () => void;
};

export type inputPropsType = {
  value: string;
  onChange: (text: string) => void;
  label: string;
  error?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  autoComplete?: TextInputProps["autoComplete"];
  keyboardType?: KeyboardTypeOptions;
  tabIndex?: ReturnKeyTypeOptions;
  disabled?: boolean;
};

export enum showMessageStatusType {
  success = "success",
  error = "error",
}

export type showMessagePropsType = {
  status: showMessageStatusType.success | showMessageStatusType.error;
  message: string;
  setVisibility: (visibility: boolean) => void;
};
