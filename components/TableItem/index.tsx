/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react";
import { FC, useEffect, useState } from "react";
import formatNumber from "../../utils/formatNumber";
import roundNumber from "../../utils/roundNumber";
import { FavoritesIcon } from "../Icons/FavoritesIcon";
import * as styles from "./styles";

{
  /* TO-DO: save images locally instead of displaying them from api */
}

// interface TableItemProps {
//   index: number;
//   name: string;
//   tvl: number;
//   symbol: string | null;
//   chains: Array<string>;
//   logo: string | null;
//   category: string;
//   tableRow: SerializedStyles;
// }

interface TableItemProps {
  index: number;
  protocolName: string;
}

interface ProtocolData {
  name: string;
  logo: string;
  symbol: string;
  category: string;
  chainTvls: {
    Terra: {
      tvl:
        | Array<{ date: number; totalLiquidityUSD: number | undefined }>
        | undefined;
    };
  };
}

export const TableItem: FC<TableItemProps> = (data) => {
  // const { index, name, logo, tvl, symbol, category, tableRow } = protocolData;
  const { index, protocolName } = data;

  // const formattedTVL = formatNumber(tvl);

  const [protocolData, setProtocolData] = useState<ProtocolData>();
  const [currentTVL, setCurrentTVL] = useState<number>();

  // TVL change percentage
  const [oneDayChange, setOneDayChange] = useState<number>();
  const [oneWeekChange, setOneWeekChange] = useState<number>();
  const [oneMonthChange, setOneMonthChange] = useState<number>();

  useEffect(() => {
    async function fetchProtocolData() {
      const url = `https://api.llama.fi/protocol/${protocolName}`;
      const res = await fetch(url);
      const data: ProtocolData = await res.json();

      setProtocolData(data);

      const tvls = data.chainTvls?.Terra?.tvl;
      console.log(tvls);

      if (tvls !== undefined) {
        const tvlsLength = tvls.length - 1;
        const currentTVL = tvls[tvlsLength].totalLiquidityUSD;
        console.log(currentTVL);

        if (currentTVL !== undefined) {
          setCurrentTVL(currentTVL);

          const tvlOneDayAgo = tvls[tvlsLength - 1]?.totalLiquidityUSD;

          if (tvlOneDayAgo !== undefined) {
            const oneDayTVLchange = (currentTVL / tvlOneDayAgo - 1) * 100;
            setOneDayChange(oneDayTVLchange);
          }

          const tvlOneWeekAgo = tvls[tvlsLength - 7]?.totalLiquidityUSD;
          if (tvlOneWeekAgo !== undefined) {
            const oneWeekTVLchange = (currentTVL / tvlOneWeekAgo - 1) * 100;
            setOneWeekChange(oneWeekTVLchange);
          }

          const tvlOneMonthAgo = tvls[tvlsLength - 30]?.totalLiquidityUSD;
          if (tvlOneMonthAgo !== undefined) {
            const oneMonthTVLchange = (currentTVL / tvlOneMonthAgo - 1) * 100;
            setOneMonthChange(oneMonthTVLchange);
          }
        }
      }
    }

    fetchProtocolData();
  }, []);

  return (
    // <tr css={tableRow}>
    <>
      {protocolData && (
        <tr>
          <td css={styles.nameCell}>
            <FavoritesIcon />
            <span>{index}</span>
            {protocolData.logo && (
              <img
                src={protocolData.logo}
                css={css({ borderRadius: "50%" })}
                height="30px"
              />
            )}
            {protocolData.name}
            {protocolData.symbol != "-" && ` (${protocolData.symbol})`}
          </td>
          <td>{currentTVL && formatNumber(currentTVL)}</td>
          <td>{protocolData.category}</td>
          <td>{oneDayChange && <>{roundNumber(oneDayChange, 3)}%</>}</td>
          <td>{oneWeekChange && <>{roundNumber(oneWeekChange, 3)}%</>}</td>
          <td>{oneMonthChange && <>{roundNumber(oneMonthChange, 3)}%</>}</td>
        </tr>
      )}
    </>
  );
};

// console.log(
//   "TVL: " + tvls[tvlsLength].totalLiquidityUSD,
//   "For day: " + tvls[tvlsLength].date
// );
// console.log(
//   "TVL: " + tvls[tvlsLength - 1].totalLiquidityUSD,
//   "For day: " + tvls[tvlsLength - 1].date
// );
// console.log(
//   "TVL: " + tvls[tvlsLength - 7].totalLiquidityUSD,
//   "For day: " + tvls[tvlsLength - 7].date
// );
// console.log(
//   "TVL: " + tvls[tvlsLength - 30].totalLiquidityUSD,
//   "For day: " + tvls[tvlsLength - 30].date
// );
