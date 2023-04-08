import { Text } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { SafeAreaProfile } from "../components/SafeAreaProfile";
import { CardSummary } from "../components/cards/card-summary";
import { useFetchData } from "../hooks/useFetchData";
import { _extends } from "../styles/_extends";

import AuctionIcon from "../assets/images/svg/auction-free.svg";
import EquipmentIcon from "../assets/images/svg/bulldozer.svg";
import FileIcon from "../assets/images/svg/file.svg";
import CheckedIcon from "../assets/images/svg/check-circle.svg";
import UncheckedIcon from "../assets/images/svg/un-check-circle.svg";
import { COLORS } from "../constants/Colors";

const listProfileStatus = [
  {
    label: "create_account",
    flag: "create_account",
  },
  {
    label: "tell_us_about_yourself",
    flag: "tell_us_about_yourself",
  },
  {
    label: "create_sadad_account",
    flag: "account_type",
  },
  {
    label: "national_address",
    flag: "national_address",
  },
  {
    label: "specify_your_interests",
    flag: "specify_your_interests",
  },
];

const listCardSummary = [
  {
    flag: "proceeding_bids",
    Icon: AuctionIcon,
  },
  {
    flag: "upcoming_bids",
    Icon: AuctionIcon,
  },
  {
    flag: "won_bids",
    Icon: AuctionIcon,
  },
  {
    flag: "sell_requests",
    Icon: EquipmentIcon,
  },
  {
    flag: "approved_auctions",
    Icon: EquipmentIcon,
  },
  {
    flag: "sold_auctions",
    Icon: EquipmentIcon,
  },
  {
    flag: "canceled_auctions",
    Icon: EquipmentIcon,
  },
];

export function Summary() {
  const { t } = useTranslation("common");
  const { loading, data } = useFetchData({
    url: "/profile/summary",
  });

  if (loading) <Text>Loading...</Text>;

  if (!loading && data) {
    return (
      <SafeAreaProfile
        title={"summary_title"}
        description={"summary_description"}>
        <View style={styles.container}>
          <View style={styles.profile_status}>
            <Text variant="headlineMedium">{t("profile_status")}</Text>
            <Text variant="labelLarge">100%</Text>
          </View>
          <View>
            {listProfileStatus.map(({ label, flag }, index) => {
              return (
                <View style={styles.profile_status_row} key={index}>
                  <View style={styles.profile_status_row_icon}>
                    {data?.profile_status[flag] ? (
                      <CheckedIcon width={24} height={24} />
                    ) : (
                      <UncheckedIcon width={24} height={24} />
                    )}
                  </View>
                  <Text variant="labelLarge">{t(label)}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {listCardSummary.map(({ flag, Icon }, index) => {
          return (
            <CardSummary
              count={data[flag]}
              title={t(flag)}
              description="description">
              <Icon width={48} height={48} key={flag} />
            </CardSummary>
          );
        })}

        <CardSummary
          count={data.due_invoices_list.data.length}
          title={t("due_invoices")}
          description="description"
          key={"due_invoices"}>
          <FileIcon width={48} height={48} />
        </CardSummary>
      </SafeAreaProfile>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: _extends.paddingHorizontalPages,
    borderWidth: 1,
    borderColor: COLORS._text_info_tips,
    borderRadius: 8,
    padding: 16,
    margin: _extends.paddingHorizontalPages,
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
  },
  profile_status: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  profile_status_row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  profile_status_row_icon: {
    marginRight: 12,
  },
});
