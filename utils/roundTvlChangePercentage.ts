// Round number to given amount of decimal places, if number is higher than 100, return without decimal places for clarity

const roundTvlChangePercentage = (num: number, decimalPlaces: number): string => {
  const roundedNumber = Number(
    Math.round(Number(num + "e" + decimalPlaces)) + "e-" + decimalPlaces
  );

  if (roundedNumber >= 100) {
    const roundedNumberFixed = roundedNumber.toFixed();
    return roundedNumberFixed;
  }

  const roundedNumberFixed = roundedNumber.toFixed(2);
  return roundedNumberFixed;
};

export default roundTvlChangePercentage;
