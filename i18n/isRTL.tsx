import i18next from "i18next";

export const isRTL = (): boolean => i18next.dir() === "rtl";
