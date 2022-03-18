import { ProtocolData } from "../components/Table";

export const fetchProtocol = async (protocolName: string) => {
  try {
    const url = `https://api.llama.fi/protocol/${protocolName}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw Error("could not fetch the data");
    }
    const data = await response.json();

    const tvls = data.chainTvls?.Terra?.tvl;

    const protocolData: ProtocolData = {
      id: data.id,
      name: data.name,
      symbol: data.symbol,
      category: data.category,
      logo: data.logo,
    };

    if (tvls !== undefined) {
      const tvlsLength = tvls.length - 1;
      const currentTVL: number = tvls[tvlsLength].totalLiquidityUSD;
      console.log(currentTVL);

      // Have to check everything because otherwise it returns NaN and it shows up in the table
      if (currentTVL !== undefined) {
        protocolData.currentTvl = currentTVL;

        const tvlOneDayAgo: number = tvls[tvlsLength - 1]?.totalLiquidityUSD;

        if (tvlOneDayAgo !== undefined) {
          const oneDayTVLchange = (currentTVL / tvlOneDayAgo - 1) * 100;
          protocolData.oneDayChange = oneDayTVLchange;
        }

        const tvlOneWeekAgo: number = tvls[tvlsLength - 7]?.totalLiquidityUSD;
        if (tvlOneWeekAgo !== undefined) {
          const oneWeekTVLchange = (currentTVL / tvlOneWeekAgo - 1) * 100;
          protocolData.oneWeekChange = oneWeekTVLchange;
        }

        const tvlOneMonthAgo: number = tvls[tvlsLength - 30]?.totalLiquidityUSD;
        if (tvlOneMonthAgo !== undefined) {
          const oneMonthTVLchange = (currentTVL / tvlOneMonthAgo - 1) * 100;
          protocolData.oneMonthChange = oneMonthTVLchange;
        }
      }
      return protocolData;
    }
  } catch (error) {
    console.log(error);
  }
};
