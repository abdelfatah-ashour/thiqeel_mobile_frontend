import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaProfile } from "../components/SafeAreaProfile";
import { CardAuction } from "../components/cards/card-auction";
import { Input } from "../components/inputs/input";
import SearchIcon from "../assets/images/svg/search-gray-icon.svg";
import { _extends } from "../styles/_extends";
import { useFetchData } from "../hooks/useFetchData";
import { Button, DataTable } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { useAlert } from "../hooks/useAlert";
import { showMessageStatusType } from "../Types/shared";
import { Modal } from "../components/modal";
import { Pagination } from "../components/pagination";

export function SellListing() {
  const [page, setPage] = useState(1);
  const { message, visibility, showMessage } = useAlert();

  const from = (page - 1) * 6;
  const to = page * 6;

  const { loading, error, data, setData } = useFetchData({
    url: `/profile/my-auctions?perpage=6&page=${page}`,
  });

  return (
    <SafeAreaProfile
      onRefresh={() => {
        setPage(1);
      }}
      isRefreshing={loading}
      title={"sell_listing_title"}
      description={"sell_listing_description"}>
      <View style={styles.container}>
        <View>
          <Input
            label="all_your_listings"
            onChange={() => {}}
            value=""
            iconLeft={<SearchIcon />}
          />
        </View>
        {loading ? <Text>Loading...</Text> : null}
        {error ? <Text>Something went wrong</Text> : null}

        {data?.data.length ? (
          <>
            {data?.data.map((item: any, index: number) => (
              <React.Fragment key={index}>
                <CardAuction
                  title={item.title}
                  make={item.make.name}
                  year={+item.year}
                  hightestBid={item.highest_bid}
                  soldPrice={item.highest_bid}
                  bidEndsIn={item.end_time}
                  coverImage={item.image}
                />
              </React.Fragment>
            ))}
            <Pagination
              page={page}
              onPageChange={num => setPage(num)}
              total={data?.meta.total}
            />
          </>
        ) : null}
      </View>
      <Modal
        open={visibility}
        onHide={() => showMessage("", showMessageStatusType.success, false)}
        message={message}
        title=""
      />
    </SafeAreaProfile>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 50,
    paddingHorizontal: _extends.paddingHorizontalPages,
  },
});
