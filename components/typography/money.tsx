import { View } from "react-native";
import { formatMoney } from "../../utils/utilites";
import { useTranslation } from "react-i18next";
import { utilStyles } from "../../utils/config";
import { Text } from "./Text";
import { Heading } from "../../Types/shared";

export function Money({ money }: { money: number }) {
  const { t } = useTranslation("common");

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-end",
      }}>
      <Text
        variant={Heading.h4}
        style={{
          fontSize: utilStyles.spacing._x6,
          fontWeight: "bold",
        }}
        text={formatMoney(money)}
      />

      <Text
        variant={Heading.h6}
        style={{
          marginHorizontal: utilStyles.spacing._x1,
        }}
        text={t("sar")}
      />
    </View>
  );
}
