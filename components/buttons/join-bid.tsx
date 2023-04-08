import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { COLORS } from "../../constants/Colors";
import { PrimaryButton, SecondaryButton, WarnButton } from "../_buttons";
import { useState } from "react";
import HalfModal from "../half-modal";

export function ButtonJoinBid() {
  const { t } = useTranslation("common");
  const [isOep, setOpen] = useState<boolean>(false);

  return (
    <>
      <HalfModal open={isOep} onClose={() => {}}>
        <View>
          <Text variant="titleLarge" style={styles.join_title}>
            {t("join_bid")}
          </Text>
          <Text variant="bodyMedium" style={styles.join_message}>
            {t("join_bid_confirmation_message")}
          </Text>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
            }}>
            <View
              style={{
                // marginHorizontal: 5,
                width: "50%",
                elevation: 5,
              }}>
              <PrimaryButton title="confirm" onPress={() => {}} />
            </View>
            <View
              style={{
                marginHorizontal: 5,
                width: "50%",
                elevation: 5,
              }}>
              <SecondaryButton
                title="cancel"
                onPress={() => {
                  setOpen(false);
                }}
              />
            </View>
          </View>
        </View>
      </HalfModal>

      <WarnButton
        title="join_bid"
        onPress={() => {
          console.log("pressed");
          setOpen(true);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  join_title: {
    color: COLORS._primary_black,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  join_message: {
    color: COLORS._primary_black,
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 10,
  },
});
