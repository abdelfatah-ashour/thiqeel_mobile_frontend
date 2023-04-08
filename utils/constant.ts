export const MSG_ERROR = "error";
export const MSG_SUCCESS = "success";

export const phoneExpire =
  /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;

export const PATTERN_PASSWORD_REGISTER =
  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\\?;,./{}|\\":<>\\[\]\\\\' ~_]).{8,}/;

export const ITEM_STATUS_DRAFT = 1801;
export const ITEM_STATUS_REQ_BID = 1802;
export const ITEM_STATUS_APPROVED = 1803;
export const ITEM_STATUS_REJECTED = 1804;
export const ITEM_STATUS_BACKED_TO_CUSTOMER = 1805;
export const ITEM_STATUS_SOLD = 1806;

export const AUCTION_STATUS_UNDER_REVIEW = 1901;
export const AUCTION_STATUS_ACCEPTED = 1902;
export const AUCTION_STATUS_REJECTED = 1903;
export const AUCTION_STATUS_BACKED_TO_CUSTOMER = 1904;
export const AUCTION_STATUS_CANCELED = 1905;
export const AUCTION_STATUS_COMPLETED = 1906;
export const AUCTION_STATUS_UNDER_BIDING = 1907;
export const AUCTION_STATUS_ON_HOLD = 1908;
export const AUCTION_STATUS_PENDING_PAYMENT = 1909;

export const MSG_TYPE_SUCCESS = "success";
export const MSG_TYPE_ERROR = "error";

// session storages keys
export const SESSION_AGE = 315569260000;
export const SESSION_LOGIN_TYPE = "type_login";

export const USER_IS_INDIVIDUAL = 1101;
export const USER_IS_COMPANY = 1102;

// Pusher events
export const PUSHER_PRIVATE_PLACE_BID_EVENT = "PlaceBidEvent";
export const PUSHER_PRIVATE_GET_NOTIFICATIONS = "SendNotificationEvent";
export const PUSHER_PRIVATE_GET_WALLET_BALANCE = "BalanceChanged";
export const PUSHER_PRIVATE_BID_AUCTION_STARTED = "AuctionStarted";
export const PUSHER_PRIVATE_BID_AUCTION_ENDED = "AuctionEnded";
export const PUSHER_AUCTION_EXTENDED = "AuctionExtended";

/**
 * AuctionStarted
AuctionEnded
 */

// add equipment details
export const equipment_images = "equipment_images";
export const equipment_certificates = "equipment_certificates";

export const passport_pattern = /^[A-Za-z]{1}[0-9]{6}$/;

// Notification Action Type
export const SELL = "sell";
export const BID = "bid";
export const WALLET = "wallet";
export const ITEM = "item";
export const AUTO_BID = "auto-bid";
export const AUTO_BID_STOPPED = "auto-bid-stopped";

// CRM Reviews
export const enum_labels_images_item = [
  {
    name: "image",
    label: "images",
  },
  {
    name: "certificate",
    label: "certifications",
  },
];

export const enum_labels_images_item_links = (item_id?: number | string) => {
  return [
    {
      label: "Images",
      name: "image",
      url: `/sell-request/images-equipment?item_id=${item_id}`,
    },
    {
      label: "Certifications",
      name: "certificate",
      url: `/sell-request/equipment-certificates?item_id=${item_id}`,
    },
  ];
};

export const enum_labels_details_item = [
  {
    name: "year",
    label: "year",
  },
  {
    name: "make",
    label: "make",
  },
  {
    name: "model",
    label: "model",
  },
  {
    name: "title",
    label: "title",
  },
  {
    name: "description",
    label: "description",
  },
];

// WALLET
export const INIT_CHARGING_WALLET = 1000;

// account types
export const PERSONAL = "PERSONAL";
export const BUSINESS = "BUSINESS";

// SOCIAL MEDIA URL
export const SHARE_NOW_FACEBOOK = (url: string) => {
  return `https://www.facebook.com/sharer.php?u=${url}`;
};

export const SHARE_NOW_TWITTER = (
  url: string,
  title?: string,
  via?: string,
  hashtags?: string,
) => {
  return `https://twitter.com/share?url=${url}&text=${title}&${
    via ? `via=${via}&` : ""
  }${hashtags ? `hashtags=${hashtags}` : ""}`;
};

export const SHARE_NOW_LINKED_IN = (url?: string, title?: string) => {
  return `https://www.linkedin.com/shareArticle?url=${url}&title=${title}`;
};

export const SHARE_NOW_WHATSAPP = (url: string) => {
  return `whatsapp://send?text=${url}`;
};

// Members and Roles
export const IS_OWNER = "owner";
export const IS_PERSONAL = "personal";
export const IS_MEMBER = "member";

export const IS_SELLER = "seller";
export const IS_BUYER = "buyer";

export const MEMBER_ACTIVE = 1101;
export const MEMBER_DEACTIVATED = 1102;
export const MEMBER_INVITED = 1103;

export const enum_roles = [
  {
    label: "seller",
    role: IS_SELLER,
  },
  {
    label: "buyer",
    role: IS_BUYER,
  },
];
