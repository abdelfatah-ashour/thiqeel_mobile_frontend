import { View } from "react-native";
import { Text } from "react-native-paper";
import { formatMoney } from "../../utils/utilites";
import { useTranslation } from "react-i18next";

export function Money({ money }: { money: number }) {
  const { t } = useTranslation("common");

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-end",
      }}>
      <Text
        variant="bodyLarge"
        style={{
          fontSize: 20,
          fontWeight: "bold",
        }}>
        {formatMoney(money)}
      </Text>
      <Text
        variant="bodySmall"
        style={{
          marginHorizontal: 4,
        }}>
        {t("sar")}
      </Text>
    </View>
  );
}
