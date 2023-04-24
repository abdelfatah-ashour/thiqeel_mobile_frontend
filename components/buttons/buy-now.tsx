import { useTranslation } from "react-i18next";
import { PrimaryButton } from "../_buttons";

export function ButtonBuyNow() {
  const { t } = useTranslation("common");

  return <PrimaryButton title="buy_now" onPress={() => {}} disabled />;
}
