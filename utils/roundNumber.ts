// Round number to given amount of decimal places

const roundNumber = (num: number, decimalPlaces: number): number => {
  return Number(
    Math.round(Number(num + "e" + decimalPlaces)) + "e-" + decimalPlaces
  );
};

export default roundNumber;
