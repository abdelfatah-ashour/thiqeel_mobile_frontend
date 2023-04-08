import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { COLORS } from "../../constants/Colors";
import { PrimaryButton, WarnButton } from "../_buttons";

export function ButtonBuyNow() {
  const { t } = useTranslation("common");

  return <PrimaryButton title="buy_now" onPress={() => {}} disabled />;
}
