// Turn high TVL into more readable format f. e. 1.32b, 1.28m, 1.84k
const formatTvl = (num: number): string => {
  if (num / 1.0e9 >= 1) {
    const formattedNumber = (num / 1.0e9).toFixed(2).toString();
    return formattedNumber + "b";
  } else if (num / 1.0e6 >= 1) {
    const formattedNumber = (num / 1.0e6).toFixed(2).toString();
    return formattedNumber + "m";
  } else if (num / 1.0e3 >= 1) {
    const formattedNumber = (num / 1.0e3).toFixed(2).toString();
    return formattedNumber + "k";
  }

  return "0";
};

export default formatTvl;
