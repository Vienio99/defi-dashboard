// Round number to given amount of decimal places

const roundNumber = (num: number, decimalPlaces: number): string => {
  return Number(
    Math.round(Number(num + "e" + decimalPlaces)) + "e-" + decimalPlaces
  ).toFixed(2);
};

export default roundNumber;
