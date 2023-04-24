import { useReducer, useState } from "react";
import { StyleSheet, View } from "react-native";
import { isRTL } from "../i18n/isRTL";
import { DispatchAction } from "../Types/shared";
import { utilStyles } from "../utils/config";
import { Input } from "./inputs/input";
import { InputMobileNumber } from "./inputs/input-mobile-number";
import { InputSelect } from "./inputs/input-select";
import { useFetchData } from "../hooks/useFetchData";

// CONSTANTS
const ON_CHANGE = "ON_CHANGE";

type initialStateType = {
  action: string;
  address: string;
  region_id: string;
  city: string;
  district: string;
  postalCode: string;
  secondary: string;
  additional_address: string;
  mobile_number: string;
  errors: {
    address: string;
    region_id: string;
    city: string;
    district: string;
  };
};

const initialState: initialStateType = {
  action: "",
  address: "",
  region_id: "",
  city: "",
  district: "",
  postalCode: "",
  secondary: "",
  additional_address: "",
  mobile_number: "",
  errors: {
    address: "",
    region_id: "",
    city: "",
    district: "",
  },
};

export function FormAddress() {
  const [address, dispatch] = useReducer(reducer, initialState);
  const { data } = useFetchData({
    url: "/regions",
  });

  function parseDataRegionToSelectList(data: any) {
    return (
      data?.map((item: any) => {
        return {
          label: item.name,
          value: item.id,
        };
      }) || []
    );
  }

  function reducer(state: initialStateType, { type, payload }: DispatchAction) {
    switch (type) {
      case ON_CHANGE: {
        return {
          ...state,
          [payload.name]: payload.value,
        };
      }

      default: {
        return state;
      }
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

  return (
    <>
      <View>
        <View style={styles.box_input}>
          <Input
            value={address.address}
            onChange={function (text: string): void {
              onChange("address", text);
            }}
            label={"address"}
          />
        </View>
        <View style={styles.box_input}>
          <View style={styles.container_row}>
            <View style={[styles.input, styles.gap]}>
              <InputSelect
                value={address.region_id}
                options={parseDataRegionToSelectList(data)}
                onChange={function (text: string): void {
                  onChange("region_id", text);
                }}
              />
            </View>
            <View style={styles.input}>
              <Input
                value={address.city}
                onChange={function (text: string): void {
                  onChange("city", text);
                }}
                label={"postalCode"}
              />
            </View>
          </View>
        </View>
        <View style={styles.box_input}>
          <View style={styles.container_row}>
            <View style={[styles.input, styles.gap]}>
              <Input
                value={address.district}
                onChange={function (text: string): void {
                  onChange("district", text);
                }}
                label={"district"}
              />
            </View>
            <View style={[styles.input]}>
              <Input
                value={address.postalCode}
                onChange={function (text: string): void {
                  onChange("secondary", text);
                }}
                label={"secondary"}
              />
            </View>
          </View>
        </View>
        <View style={styles.box_input}>
          <Input
            value={address.secondary}
            onChange={function (text: string): void {
              onChange("additional_address", text);
            }}
            label={"secondary"}
          />
        </View>
        <View style={styles.box_input}>
          <Input
            value={address.additional_address}
            onChange={function (text: string): void {
              onChange("additional_address", text);
            }}
            label={"additional_address"}
          />
        </View>
        <View style={styles.box_input}>
          <InputMobileNumber
            value={address.mobile_number}
            onChange={function (text: string): void {
              onChange("mobile_number", text);
            }}
            error={""}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  box_input: {
    marginBottom: utilStyles.spacing._x4,
  },
  input: {
    flex: 1,
  },
  container_row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gap: {
    marginRight: isRTL() ? 0 : utilStyles.spacing._x3,
    marginLeft: isRTL() ? utilStyles.spacing._x3 : 0,
  },
});
