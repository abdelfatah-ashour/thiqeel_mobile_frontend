import { StyleSheet, View } from "react-native";

import { SafeAreaProfile } from "../components/SafeAreaProfile";
import { PrimaryButton } from "../components/_buttons";
import { Input } from "../components/inputs/input";
import { CheckBox } from "../components/checkbox";
import { useEffect, useReducer } from "react";
import { DispatchAction } from "../Types/shared";
import { CardView } from "../components/card-view";
import { useFetchData } from "../hooks/useFetchData";
import { Text } from "react-native-paper";

// CONSTANTS
const ON_CHANGE = "ON_CHANGE";
const SELECT_PLAN = "SELECT_PLAN";
const ON_ERROR_FETCH_PROFILE = "ON_ERROR_FETCH_PROFILE";
const ON_LOADING_FETCH_PROFILE = "ON_LOADING_FETCH_PROFILE";
const ON_SUCCESS_FETCH_PROFILE = "ON_SUCCESS_FETCH_PROFILE";

type infoType = {
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  phone: string;
  plan: string[];
  errors: {
    first_name?: string;
    middle_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    plan?: string;
  };
  error_message?: string;
  loading?: boolean;
};

const infoState: infoType = {
  first_name: "",
  middle_name: "",
  last_name: "",
  email: "",
  phone: "",
  plan: [],
  errors: {
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phone: "",
    plan: "",
  },
  error_message: "",
  loading: false,
};

export function PersonalInfo({ navigation }: any) {
  const [info, dispatch] = useReducer(infoReducer, infoState);
  const { loading, data, error } = useFetchData({
    url: "/profile/personal-info",
  });

  function infoReducer(state: infoType, { type, payload }: DispatchAction) {
    switch (type) {
      case ON_ERROR_FETCH_PROFILE:
        return {
          ...state,
          error_message: payload,
          loading: false,
        };
      case ON_LOADING_FETCH_PROFILE:
        return {
          ...state,
          loading: payload,
        };
      case ON_SUCCESS_FETCH_PROFILE:
        return {
          ...state,
          ...payload,
          loading: false,
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
      case SELECT_PLAN:
        return {
          ...state,
          plan: payload,
        };

      default:
        return state;
    }
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

  function onSelectPlanning(plan: "buyer" | "seller") {
    dispatch({
      type: SELECT_PLAN,
      payload: info.plan.includes(plan)
        ? info.plan.filter((item: string) => item !== plan)
        : [info.plan, plan].flat(1),
    });
  }

  useEffect(() => {
    if (!loading) {
      if (!error) {
        dispatch({
          type: ON_SUCCESS_FETCH_PROFILE,
          payload: data,
        });
      }

      if (error) {
        dispatch({
          type: ON_ERROR_FETCH_PROFILE,
          payload: error,
        });
      }
    } else {
      dispatch({
        type: ON_LOADING_FETCH_PROFILE,
        payload: loading,
      });
    }
  }, [loading]);

  return (
    <SafeAreaProfile title={"personal_info"} description={"profile_info_desc"}>
      {info.loading ? (
        <Text variant="titleLarge">loading...</Text>
      ) : (
        <CardView>
          <View style={styles.group_input}>
            <Input
              label="first_name"
              value={info.first_name}
              onChange={(text: string) => {
                onChange("first_name", text);
              }}
              error={info.errors.first_name}
              tabIndex={"next"}
            />
          </View>
          <View style={styles.group_input}>
            <Input
              label="middle_name"
              value={info.middle_name}
              onChange={(text: string) => {
                onChange("middle_name", text);
              }}
              error={info.errors.middle_name}
              tabIndex={"next"}
            />
          </View>
          <View style={styles.group_input}>
            <Input
              label="last_name"
              value={info.last_name}
              onChange={(text: string) => {
                onChange("last_name", text);
              }}
              error={info.errors.last_name}
              tabIndex={"next"}
            />
          </View>
          <View style={styles.group_input}>
            <Input
              label="email"
              value={info.email}
              onChange={(text: string) => {
                onChange("email", text);
              }}
              error={info.errors.email}
              tabIndex={"next"}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.group_input}>
            <Input
              label="mobile_number"
              value={info.phone}
              onChange={(text: string) => {
                onChange("phone", text);
              }}
              error={info.errors.phone}
              tabIndex={"next"}
              keyboardType="phone-pad"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              ...styles.group_input,
            }}>
            <CheckBox
              label="buyer"
              checked={info.plan.includes("buyer")}
              onCheck={() => onSelectPlanning("buyer")}
            />
            <View style={{ marginHorizontal: 6 }}>
              <CheckBox
                label="seller"
                checked={info.plan.includes("seller")}
                onCheck={() => {
                  onSelectPlanning("seller");
                }}
              />
            </View>
          </View>
          <View
            style={{
              marginBottom: 30,
            }}>
            <PrimaryButton title="update_profile" onPress={() => {}} />
          </View>
        </CardView>
      )}
    </SafeAreaProfile>
  );
}

const styles = StyleSheet.create({
  container_profile: {
    padding: 0,
    margin: 0,
  },
  profile_description: {
    marginVertical: 12,
  },
  group_input: {
    marginBottom: 16,
  },
  label: {
    marginVertical: 6,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  page_head: {
    paddingTop: 30,
    paddingBottom: 50,
  },
  content: {
    backgroundColor: "#dadada",
    paddingVertical: 30,
    paddingHorizontal: 10,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    marginTop: -50,
  },
});
