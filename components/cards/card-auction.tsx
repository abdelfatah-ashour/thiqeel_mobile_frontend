import { Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { COLORS } from "../../constants/Colors";
import { useTranslation } from "react-i18next";
import { formatDate, formatMoney } from "../../utils/utilites";
import { Money } from "../typography/money";
import { ButtonJoinBid } from "../buttons/join-bid";
import { ButtonBuyNow } from "../buttons/buy-now";
import { _extends } from "../../styles/_extends";
import { myListingModelType } from "../../Types/api-types";

export function CardAuction({
  coverImage,
  title,
  make,
  year,
  hightestBid,
  soldPrice,
  bidEndsIn,
}: myListingModelType) {
  const { t } = useTranslation("common");

  return (
    <View style={styles.card}>
      <View>
        <Image
          source={{
            uri: coverImage,
          }}
          style={styles.card_image}
        />
      </View>
      <View>
        <Text variant="titleLarge" style={styles.card_title}>
          {title}
        </Text>
        <Text variant="bodyMedium" style={styles.card_sub_title}>
          {make} - {year}
        </Text>
        <View style={{ marginVertical: 12 }}>
          <Text variant="titleSmall" style={styles.card_hightest_bid}>
            {t("hightest_bid")}
          </Text>
          <View
            style={{
              marginVertical: 4,
            }}>
            <Money money={hightestBid} />
          </View>
        </View>
        <View style={{ marginVertical: 12 }}>
          <Text variant="titleSmall" style={styles.card_hightest_bid}>
            {t("sold_price")}
          </Text>
          <Money money={soldPrice} />
        </View>

        <View>
          <Text variant="titleSmall" style={styles.card_hightest_bid}>
            {t("bid_ends_in")}
          </Text>
          <Text variant="bodyLarge">{formatDate(bidEndsIn, true, t)}</Text>
        </View>
        <View
          style={{
            marginTop: 10,
          }}>
          <ButtonJoinBid />
        </View>
        <View
          style={{
            marginTop: 10,
          }}>
          <ButtonBuyNow />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginVertical: _extends.paddingHorizontalPages,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  card_image: {
    // display full image
    width: "100%",
    height: 270,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    resizeMode: "cover",
  },
  card_title: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS._primary_black,
    marginTop: 10,
    marginBottom: 10,
  },
  card_sub_title: {
    fontSize: 16,
    fontWeight: "400",
    color: COLORS._text_info_tips,
  },
  card_hightest_bid: {
    fontSize: 16,
    fontWeight: "400",
    color: COLORS._text_info_tips,
  },
});
