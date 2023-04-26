import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { CardAddress } from "../components/cards/card-address";
import { FormAddress } from "../components/form-address";
import { SafeAreaProfile } from "../components/SafeAreaProfile";
import { useFetchData } from "../hooks/useFetchData";
import { useReduxSelector } from "../store";
import { _extends } from "../styles/_extends";
import { addressDataType } from "../Types/profile";
import { utilStyles } from "../utils/config";

export function ShippingAddress() {
  const { t } = useTranslation("common");
  const store = useReduxSelector(s => s);

  const { loading, error, data, setData } = useFetchData({
    url: "/addresses",
  });

  return (
    <SafeAreaProfile
      title={t("shipping_address_title")}
      description="shipping_address_desc">
      <View style={styles.container}>
        {!loading ? (
          <>
            {(data as addressDataType[])?.map(item => {
              return (
                <View style={styles.card} key={item.id}>
                  <CardAddress
                    address={item}
                    sameBilling={item.is_default_billing}
                    selected={item.is_default_shipping}
                  />
                </View>
              );
            })}
          </>
        ) : null}

        <FormAddress />
      </View>
    </SafeAreaProfile>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: _extends.paddingHorizontalPages,
    marginBottom: utilStyles.spacing._x10 * 2,
  },
  card: {
    marginBottom: utilStyles.spacing._x6,
  },
});
