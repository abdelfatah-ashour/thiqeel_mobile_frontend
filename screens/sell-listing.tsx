import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { SafeAreaProfile } from "../components/SafeAreaProfile";
import { CardAuction } from "../components/cards/card-auction";
import { Input } from "../components/inputs/input";
import SearchIcon from "../assets/images/svg/search-gray-icon.svg";
import { _extends } from "../styles/_extends";
import { useFetchData } from "../hooks/useFetchData";
import { useAlert } from "../hooks/useAlert";
import { showMessageStatusType } from "../Types/shared";
import { Modal } from "../components/modal";
import { Pagination } from "../components/pagination";

export function SellListing() {
  const [page, setPage] = useState(1);
  const { message, visibility, showMessage } = useAlert();

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
                  isControlSeller
                />
              </React.Fragment>
            ))}
            <Pagination
              page={data?.meta?.current_page}
              total={data?.meta?.total}
              onPageChange={function (page: number): void {
                // throw new Error("Function not implemented.");
                setPage(page);
              }}
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
