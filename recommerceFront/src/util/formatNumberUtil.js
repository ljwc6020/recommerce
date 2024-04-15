export const formatNumber = (num) => {
  if (num == null) return "0"; // `null` 또는 `undefined`인 경우 "0" 반환

  let regex = /(^[+-]?\d+)(\d{3})/;
  let nstr = num.toString();
  while (regex.test(nstr)) {
    nstr = nstr.replace(regex, "$1" + "," + "$2");
  }
  return nstr;
};
