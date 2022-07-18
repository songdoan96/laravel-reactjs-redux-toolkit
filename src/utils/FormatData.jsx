export const formatMoney = (money) => {
  return money.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};

export const formatDateTime = (string) => {
  return new Date(string).toLocaleString("vi-VN");
};
