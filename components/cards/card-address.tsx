import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { addressDataType } from "../../Types/profile";
import { MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { utilStyles } from "../../utils/config";
import { AntDesign } from "@expo/vector-icons";
import { useReducer } from "react";
import { DispatchAction } from "../../Types/shared";

type CardAddressProps = {
  address: addressDataType;
  selected?: boolean;
  sameBilling?: boolean;
};

export function CardAddress({
  address,
  selected,
  sameBilling,
}: CardAddressProps) {
  const { t } = useTranslation("common");

  return (
    <View style={[styles.card, selected ? styles.card_Selected : {}]}>
      <View style={styles.input_checked}>
        <MaterialIcons
          name={`radio-button-${selected ? "checked" : "unchecked"}`}
          size={utilStyles.sizes_icon._md}
          color={
            selected
              ? utilStyles.colors._links_hover
              : utilStyles.colors._text_info_tips
          }
        />
        <Text variant="titleMedium" style={styles.input_checked_label}>
          {t(sameBilling ? "same_billing_address" : "address")}
        </Text>
      </View>
      <View style={styles.card_body}>
        <Text variant="titleMedium">{address.address}</Text>
        <Text variant="titleMedium">{address.region.name}</Text>
        <Text variant="titleMedium">{address.city}</Text>
        <Text variant="titleMedium">{address.district}</Text>
      </View>
      <View style={styles.card_options}>
        <View style={styles.card_option_delete}>
          <MaterialIcons
            name="delete"
            size={utilStyles.sizes_icon._md}
            color={utilStyles.colors._error_color}
          />
        </View>
        <AntDesign
          name="edit"
          size={utilStyles.sizes_icon._md}
          color={utilStyles.colors._text_info_tips}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: utilStyles.spacing._x1,
    borderRadius: utilStyles.spacing._x1,
    borderWidth: 1,
    borderColor: utilStyles.colors._text_info_tips,
  },
  card_Selected: {
    borderColor: utilStyles.colors._links_hover,
  },
  card_body: {
    paddingHorizontal: utilStyles.spacing._x1,
  },
  input_checked: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: utilStyles.spacing._x2,
  },
  input_checked_label: {
    paddingHorizontal: utilStyles.spacing._x1,
    textTransform: "capitalize",
    color: utilStyles.colors._links_hover,
  },
  card_options: {
    flexDirection: "row",
    marginTop: utilStyles.spacing._x3,
    marginBottom: utilStyles.spacing._x1,
  },
  card_option__spacing: {
    marginHorizontal: utilStyles.spacing._x4,
  },
  card_option_edit: {
    color: utilStyles.colors._links_hover,
    textTransform: "capitalize",
  },
  card_option_delete: {
    marginRight: utilStyles.spacing._x4,
  },
});
