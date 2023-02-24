/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  home: NavigatorScreenParams<RootTabParamList> | undefined;
  profile: NavigatorScreenParams<RootTabParamList> | undefined;
  my_bids: NavigatorScreenParams<RootTabParamList> | undefined;
  my_wallet: NavigatorScreenParams<RootTabParamList> | undefined;
  settings: NavigatorScreenParams<RootTabParamList> | undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  root_profile: undefined;
  my_bids: undefined;
  home: undefined;
  my_wallet: undefined;
  settings: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type axiosArgsType = {
  method?: "GET" | "POST";
  url: string;
  data?: { [key: string]: any };
  headers?: {
    Authorization: string;
    locale: string;
  };
};

export type axiosPayloadType = {
  [key: string]: any;
};

export type axiosResponseType = {
  status: number;
  message: string;
  errors: { [key: string]: any } | null;
  data: { [key: string]: any } | null;
};

export type authenticateStateType = {
  phone: string;
  email: string;
  password?: string;
  show?: boolean;
  type: "email" | "phone";
  disabled?: boolean;
  open?: boolean;
  errors?: {
    email?: string;
    phone?: string;
    password?: string;
  };
  onError?: string;
};
