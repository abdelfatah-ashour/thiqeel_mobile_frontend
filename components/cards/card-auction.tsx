import { Image, StyleSheet, View } from "react-native";
import { COLORS } from "../../constants/Colors";
import { useTranslation } from "react-i18next";
import { formatDate } from "../../utils/utilites";
import { Money } from "../typography/money";
import { ButtonJoinBid } from "../buttons/join-bid";
import { ButtonBuyNow } from "../buttons/buy-now";
import { _extends } from "../../styles/_extends";
import { myListingModelType } from "../../Types/api-types";
import { Heading } from "../../Types/shared";
import { Text } from "../typography/Text";
import {
  AUCTION_STATUS_ACCEPTED,
  AUCTION_STATUS_BACKED_TO_CUSTOMER,
  AUCTION_STATUS_COMPLETED,
  AUCTION_STATUS_ON_HOLD,
  AUCTION_STATUS_UNDER_BIDING,
  AUCTION_STATUS_UNDER_REVIEW,
  ITEM_STATUS_APPROVED,
  ITEM_STATUS_BACKED_TO_CUSTOMER,
  ITEM_STATUS_DRAFT,
  ITEM_STATUS_REJECTED,
  ITEM_STATUS_REQ_BID,
} from "../../utils/constant";

export function CardAuction({
  coverImage,
  title,
  make,
  year,
  hightestBid,
  soldPrice,
  bidEndsIn,
  isControlBuyer,
  isControlSeller,
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
        <Text variant={Heading.h3} style={styles.card_title} text={title} />
        <Text
          variant={Heading.h6}
          style={styles.card_sub_title}
          text={`${make} - ${year}`}
        />

        {isControlSeller && (
          <>
            {[
              ITEM_STATUS_BACKED_TO_CUSTOMER,
              AUCTION_STATUS_BACKED_TO_CUSTOMER,
            ].includes(data?.status?.code) ? (
              <div>
                <label>{t("sell_req_back_to_client_note")}</label>
              </div>
            ) : null}

            {[AUCTION_STATUS_UNDER_BIDING].find(
              num => num === +data?.status?.code,
            ) ? (
              <>
                <>
                  <BasicImage src={BidIcon} />
                  <label>{t("bid_ends_in")}</label>
                </>
                <TimerCountDown date={data.end_time} />
              </>
            ) : null}

            {[AUCTION_STATUS_ON_HOLD].find(
              num => num === +data?.status?.code,
            ) ? (
              <>
                <>
                  <BasicImage src={BidIcon} />
                  <label>{t("ends_in")}</label>
                </>
                <div className={styles.closedDate}>
                  {formatDate(data.end_time, true, false, t)}
                </div>
              </>
            ) : null}

            {data?.status?.code == AUCTION_STATUS_ACCEPTED && (
              <>
                <>
                  <BasicImage src={BidIcon} />
                  <label>{t("bid_starts_in")}</label>
                </>
                <div className={styles.startInDate}>
                  {formatDate(data.start_time, true, false, t)}
                </div>
              </>
            )}

            {data?.status?.code == AUCTION_STATUS_COMPLETED && (
              <>
                <>
                  {data.buy_now_date && data.is_bought_directly ? (
                    <BasicImage src={soldoutIcon} className="icon_md" />
                  ) : (
                    <BasicImage src={BidIcon} />
                  )}
                  <label>
                    {t(
                      data?.buy_now_date && data?.is_bought_directly
                        ? "sold_out"
                        : "bid_closed",
                    )}
                  </label>
                </>
                <>
                  {formatDate(
                    data?.buy_now_date && data?.is_bought_directly
                      ? data.buy_now_date
                      : data.end_time,
                    true,
                    false,
                    t,
                  )}
                </>
              </>
            )}

            {[
              ITEM_STATUS_DRAFT,
              ITEM_STATUS_REQ_BID,
              ITEM_STATUS_APPROVED,
              AUCTION_STATUS_UNDER_REVIEW,
            ].includes(+data?.status?.code) ? (
              <>
                <>
                  <label>{t("added_in")}</label>
                </>
                <div className={styles.creationDate}>
                  {formatDate(data.created_at, true, false, t)}
                </div>
              </>
            ) : null}

            {data?.status?.code == ITEM_STATUS_REJECTED && (
              <div>
                <p className="p-cutter">{data.item_rejected_reason || ""}</p>
                <span
                  onClick={() =>
                    handleToggleShowMore(data?.title, data.item_rejected_reason)
                  }
                  className={`${styles.showMoreText} cursor-pointer`}>
                  {t("show_more")}
                </span>
              </div>
            )}

            {data?.status?.code == AUCTION_STATUS_REJECTED && (
              <div>
                <p className="p-cutter">{data.auction_rejected_reason || ""}</p>
                {data.auction_rejected_reason?.length >= MAX_CHARACTER && (
                  <span
                    onClick={() =>
                      handleToggleShowMore(
                        data?.title,
                        data.auction_rejected_reason,
                      )
                    }
                    className={`${styles.showMoreText} cursor-pointer`}>
                    {t("show_more")}
                  </span>
                )}
              </div>
            )}

            {data?.status?.code == AUCTION_STATUS_PENDING_PAYMENT && access ? (
              <div className="d-flex flex-column">
                <p>{t("pay_services_invoice")}</p>

                <Link href="/my-wallet">{t("go_to_wallet")}</Link>
              </div>
            ) : null}

            {data?.status?.code == AUCTION_STATUS_CANCELED && (
              <>
                <div className={styles.search_result_date_info}>
                  <div
                    className={`d-flex align-items-center gap-2 ${styles.counter} mb-2`}>
                    <BasicImage src={cancelGrayIcon} className="icon_md" />
                    <label>{t("bid_canceled")}</label>
                  </div>
                  <div className={styles.creationDate}>
                    {formatDate(data.cancel_date, true, false, t)}
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {isControlBuyer && (
          <>
            <View style={{ marginVertical: 12 }}>
              <Text
                variant={Heading.h6}
                style={styles.card_hightest_bid}
                text={t("hightest_bid")}
              />

              <View
                style={{
                  marginVertical: 4,
                }}>
                <Money money={hightestBid} />
              </View>
            </View>
            <View style={{ marginVertical: 12 }}>
              <Text
                variant={Heading.p}
                style={styles.card_hightest_bid}
                text={t("sold_price")}
              />
              <Money money={soldPrice} />
            </View>

            <View>
              <Text
                variant={Heading.h6}
                style={styles.card_hightest_bid}
                text={t("bid_ends_in")}
              />
              <Text
                variant={Heading.h6}
                text={formatDate(bidEndsIn, true, t)}
              />
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
          </>
        )}
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

/*

<div className="col-12 col-lg-5 p-0 d-flex align-items-center mb-sm-2">
                {[ITEM_STATUS_BACKED_TO_CUSTOMER, AUCTION_STATUS_BACKED_TO_CUSTOMER].includes(data?.status?.code) ? (
                  <div>
                    <label>{t("sell_req_back_to_client_note")}</label>
                  </div>
                ) : null}

                {[AUCTION_STATUS_UNDER_BIDING].find((num) => num === +data?.status?.code) ? (
                  <div className={styles.search_result_date_info}>
                    <div className={`d-flex align-items-center gap-2 ${styles.counter} mb-2`}>
                      <BasicImage src={BidIcon} />
                      <label>{t("bid_ends_in")}</label>
                    </div>
                    <TimerCountDown date={data.end_time} />
                  </div>
                ) : null}

                {[AUCTION_STATUS_ON_HOLD].find((num) => num === +data?.status?.code) ? (
                  <div className={styles.search_result_date_info}>
                    <div className={`d-flex align-items-center gap-2 ${styles.counter} mb-2`}>
                      <BasicImage src={BidIcon} />
                      <label>{t("ends_in")}</label>
                    </div>
                    <div className={styles.closedDate}>{formatDate(data.end_time, true, false, t)}</div>
                  </div>
                ) : null}

                {data?.status?.code == AUCTION_STATUS_ACCEPTED && (
                  <div className={styles.search_result_date_info}>
                    <div className={`d-flex align-items-center gap-2 ${styles.counter}`}>
                      <BasicImage src={BidIcon} />
                      <label>{t("bid_starts_in")}</label>
                    </div>
                    <div className={styles.startInDate}>{formatDate(data.start_time, true, false, t)}</div>
                  </div>
                )}

                {data?.status?.code == AUCTION_STATUS_COMPLETED && (
                  <div className={styles.search_result_date_info}>
                    <div className={`d-flex align-items-center gap-2 ${styles.counter}`}>
                      {data.buy_now_date && data.is_bought_directly ? (
                        <BasicImage src={soldoutIcon} className="icon_md" />
                      ) : (
                        <BasicImage src={BidIcon} />
                      )}
                      <label>{t(data?.buy_now_date && data?.is_bought_directly ? "sold_out" : "bid_closed")}</label>
                    </div>
                    <div className={styles.closedDate}>
                      {formatDate(
                        data?.buy_now_date && data?.is_bought_directly ? data.buy_now_date : data.end_time,
                        true,
                        false,
                        t
                      )}
                    </div>
                  </div>
                )}

                {[ITEM_STATUS_DRAFT, ITEM_STATUS_REQ_BID, ITEM_STATUS_APPROVED, AUCTION_STATUS_UNDER_REVIEW].includes(
                  +data?.status?.code
                ) ? (
                  <div className={styles.search_result_date_info}>
                    <div className={`d-flex align-items-center gap-2`}>
                      <label>{t("added_in")}</label>
                    </div>
                    <div className={styles.creationDate}>{formatDate(data.created_at, true, false, t)}</div>
                  </div>
                ) : null}

                {data?.status?.code == ITEM_STATUS_REJECTED && (
                  <div>
                    <p className="p-cutter">{data.item_rejected_reason || ""}</p>
                    {data.item_rejected_reason?.length >= MAX_CHARACTER && (
                      <span
                        onClick={() => handleToggleShowMore(data?.title, data.item_rejected_reason)}
                        className={`${styles.showMoreText} cursor-pointer`}
                      >
                        {t("show_more")}
                      </span>
                    )}
                  </div>
                )}

                {data?.status?.code == AUCTION_STATUS_REJECTED && (
                  <div>
                    <p className="p-cutter">{data.auction_rejected_reason || ""}</p>
                    {data.auction_rejected_reason?.length >= MAX_CHARACTER && (
                      <span
                        onClick={() => handleToggleShowMore(data?.title, data.auction_rejected_reason)}
                        className={`${styles.showMoreText} cursor-pointer`}
                      >
                        {t("show_more")}
                      </span>
                    )}
                  </div>
                )}

                {data?.status?.code == AUCTION_STATUS_PENDING_PAYMENT && access ? (
                  <div className="d-flex flex-column">
                    <p>{t("pay_services_invoice")}</p>

                    <Link href="/my-wallet">{t("go_to_wallet")}</Link>
                  </div>
                ) : null}

                {data?.status?.code == AUCTION_STATUS_CANCELED && (
                  <>
                    <div className={styles.search_result_date_info}>
                      <div className={`d-flex align-items-center gap-2 ${styles.counter} mb-2`}>
                        <BasicImage src={cancelGrayIcon} className="icon_md" />
                        <label>{t("bid_canceled")}</label>
                      </div>
                      <div className={styles.creationDate}>{formatDate(data.cancel_date, true, false, t)}</div>
                    </div>
                  </>
                )}
              </div>

              <div className="col-12 col-lg-4 p-0 d-flex align-items-center">
                {[AUCTION_STATUS_UNDER_BIDING, AUCTION_STATUS_ON_HOLD].find((num) => num === +data?.status?.code) ? (
                  <div className={styles.search_result_date_highest}>
                    <div className={`d-flex align-items-center gap-2`}>
                      <label>{t("highest_bid")}</label>
                    </div>

                    <div className={styles.value}>
                      <label>{formatMoney(data.highest_bid)}</label> <span className="px-1">{t("SAR")}</span>
                    </div>
                  </div>
                ) : null}

                {data?.status?.code == AUCTION_STATUS_ACCEPTED && (
                  <div className={styles.search_result_date_highest}>
                    <div className={`d-flex align-items-center gap-2 ${styles.counter}`}>
                      <label>{t("buy_now_price")}</label>
                    </div>

                    <div className={styles.value}>
                      <label>{formatMoney(data.buynow_price)}</label> <span className="px-1">{t("SAR")}</span>
                    </div>
                  </div>
                )}

                {data?.status?.code == AUCTION_STATUS_COMPLETED && (
                  <div className={styles.search_result_date_highest}>
                    <div className={`d-flex align-items-center gap-2 ${styles.counter}`}>
                      <label>{t("sold_price")}</label>
                    </div>
                    <div className={styles.value}>
                      <label>{formatMoney(data.price)}</label> <span className="px-1">{t("SAR")}</span>
                    </div>
                  </div>
                )}
              </div>



<div className="d-flex align-items-center justify-content-center col-12 col-lg-3 my-2 px-0">
                {[ITEM_STATUS_BACKED_TO_CUSTOMER, ITEM_STATUS_DRAFT, AUCTION_STATUS_BACKED_TO_CUSTOMER].includes(
                  data?.status?.code
                ) &&
                ((seller && data?.status?.code !== AUCTION_STATUS_BACKED_TO_CUSTOMER) || access) ? (
                  <button
                    type="button"
                    className={`${styles.continue_editing} secondary_button my-auto cursor-pointer`}
                    onClick={() => _handleAction(data?.status?.code)}
                  >
                    {[ITEM_STATUS_BACKED_TO_CUSTOMER, AUCTION_STATUS_BACKED_TO_CUSTOMER].includes(data?.status?.code)
                      ? t("view_suggestions")
                      : t("continue_editing")}
                  </button>
                ) : null}

                {[AUCTION_STATUS_UNDER_REVIEW, ITEM_STATUS_REQ_BID].includes(data?.status?.code) ? (
                  <label className={styles.status_ureview}>{t("in_review")}</label>
                ) : null}

                {data?.status?.code == AUCTION_STATUS_UNDER_BIDING && (
                  <label className={styles.status_proceeding}>{t("proceeding")}</label>
                )}

                {data?.status?.code == AUCTION_STATUS_PENDING_PAYMENT && (
                  <label className={styles.status_proceeding}>{t("pending_payment")}</label>
                )}

                {data?.status?.code == AUCTION_STATUS_ACCEPTED && (
                  <label className={styles.status_approved}>{t("approved")}</label>
                )}

                {AUCTION_STATUS_COMPLETED === +data?.status?.code ? (
                  <label className={styles.status_closed}>{t("closed")}</label>
                ) : null}

                {AUCTION_STATUS_ON_HOLD === +data?.status?.code ? (
                  <label className={styles.status_on_hold}>{t("on_hold")}</label>
                ) : null}

                {data?.status?.code == ITEM_STATUS_REJECTED && (
                  <label className={styles.status_rejected}>{t("equipment_rejected")}</label>
                )}

                {data?.status?.code == AUCTION_STATUS_REJECTED && (
                  <label className={styles.status_rejected}>{t("bidding_request_rejected")}</label>
                )}

                {data?.status?.code == AUCTION_STATUS_CANCELED && (
                  <label className={styles.status_rejected}>{t("bid_cancel_label")}</label>
                )}

                {data?.status?.code == ITEM_STATUS_APPROVED && access ? (
                  <button
                    type="button"
                    className={styles.reqBiddingBtn}
                    onClick={() => {
                      _handleAction(data?.status?.code);
                    }}
                  >
                    <BasicImage src={BidIcon} />
                    <span className="px-1">{t("request_bidding")}</span>
                  </button>
                ) : null}

                {data?.can_delete && (seller || access) ? (
                  <button
                    type="button"
                    className={"mx-2 secondary_button"}
                    onClick={() => {
                      setOpenDeleteModal(data?.item_id);
                    }}
                  >
                    <BasicImage src={DeleteIcon} className="icon_md" />
                  </button>
                ) : null}
              </div>

*/
