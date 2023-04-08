export function showMessage(
  type: "success" | "error",
  message: string,
  confirmText?: string,
) {}

export function formatDate(
  date: number,
  withTime: boolean,
  t = (zone: string) => {},
) {
  // write code to format date as dd/mm/yyyy hh:mm am/pm
  if (!date) {
    return "";
  }
  const dateConverted = new Date(date);

  const day = dateConverted.getDate();
  const month = dateConverted.getMonth() + 1;
  const year = dateConverted.getFullYear();

  let formattedDate = `${day < 10 ? `0${day}` : day}/${
    month < 10 ? `0${month}` : month
  }/${year}`;

  let formattedDateWithTime = `${formattedDate} ${formatTime(date, t)}`;

  return withTime ? formattedDateWithTime : formattedDate;
}

export function formatTime(date: number, t = (zone: string) => {}) {
  if (!date) {
    return "";
  }

  const dateConverted = new Date(date);
  const hour = dateConverted.getHours();
  const minute = dateConverted.getMinutes();

  // format time with am/pm
  const ampm = hour >= 12 ? t("pm") : t("am");
  const hour12 = hour % 12 || 12;

  let formattedTime = `${hour12}:${
    minute < 10 ? `0${minute}` : minute
  } ${ampm}`;

  return formattedTime;
}

export function formatMoney(amount: number) {
  return new Intl.NumberFormat().format(amount);
}
