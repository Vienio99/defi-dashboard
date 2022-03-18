/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC, useEffect, useState } from "react";
import { fileURLToPath } from "url";
import { FavoritesIcon } from "../Icons/FavoritesIcon";
import { TableItem } from "../TableItem";
import * as styles from "./styles";
import { protocols } from "../../constants";

interface ProtocolData {
  id: number;
  name: string;
  symbol: string;
  category: string;
  logo: string;
  currentTvl?: number;
  oneDayChange?: number;
  oneWeekChange?: number;
  oneMonthChange?: number;
}

export const Table: FC = () => {
  const [protocolsData, setProtocolsData] = useState<Array<ProtocolData>>([]);

  const sortProtocolsData = (
    data: Array<ProtocolData>,
    field: keyof ProtocolData,
    reverse?: boolean
  ): Array<ProtocolData> => {
    const sortedData = data.sort((a, b) => {
      if (a[field] === undefined) {
        return 1;
      } else if (b[field] === undefined) {
        return -1;
      }
      if (reverse) {
        return (a[field] as number) - (b[field] as number);
      }
      return (b[field] as number) - (a[field] as number);
    });

    return sortedData;
  };

  useEffect(() => {
    async function fetchProtocolData() {
      await Promise.all(
        protocols.map(async (protocol) => {
          try {
            const url = `https://api.llama.fi/protocol/${protocol.name}`;
            const response = await fetch(url);
            const data = await response.json();

            const tvls = data.chainTvls?.Terra?.tvl;

            const protocolData: ProtocolData = {
              id: data.id,
              name: data.name,
              symbol: data.symbol,
              category: data.category,
              logo: data.logo,
              currentTvl: undefined,
              oneDayChange: undefined,
              oneWeekChange: undefined,
              oneMonthChange: undefined,
            };

            if (tvls !== undefined) {
              const tvlsLength = tvls.length - 1;
              const currentTVL = tvls[tvlsLength].totalLiquidityUSD;
              console.log(currentTVL);

              if (currentTVL !== undefined) {
                protocolData.currentTvl = currentTVL;

                const tvlOneDayAgo = tvls[tvlsLength - 1]?.totalLiquidityUSD;

                if (tvlOneDayAgo !== undefined) {
                  const oneDayTVLchange = (currentTVL / tvlOneDayAgo - 1) * 100;
                  protocolData.oneDayChange = oneDayTVLchange;
                }

                const tvlOneWeekAgo = tvls[tvlsLength - 7]?.totalLiquidityUSD;
                if (tvlOneWeekAgo !== undefined) {
                  const oneWeekTVLchange =
                    (currentTVL / tvlOneWeekAgo - 1) * 100;
                  protocolData.oneWeekChange = oneWeekTVLchange;
                }

                const tvlOneMonthAgo = tvls[tvlsLength - 30]?.totalLiquidityUSD;
                if (tvlOneMonthAgo !== undefined) {
                  const oneMonthTVLchange =
                    (currentTVL / tvlOneMonthAgo - 1) * 100;
                  protocolData.oneMonthChange = oneMonthTVLchange;
                }
              }
              return protocolData;
            }
          } catch (error) {
            console.log(error);
          }
        })
      ).then((protocols) => {
        const filteredProtocols = [...protocols].filter(
          (protocol): protocol is ProtocolData => !!protocol
        );
        // const sortedProtocols = filteredProtocols.sort(function (a, b) {
        //   if (a.oneMonthChange === undefined) {
        //     return 1;
        //   } else if (b.oneMonthChange === undefined) {
        //     return -1;
        //   }
        //   return b.oneMonthChange - a.oneMonthChange;
        // });
        const sortedProtocols = sortProtocolsData(filteredProtocols, "oneMonthChange");
        setProtocolsData(sortedProtocols);
      });
    }

    fetchProtocolData();
  }, []);

  return (
    <div css={styles.tableWrapper}>
      <h1>TVL Ranking</h1>
      <table css={styles.tableContainer}>
        <thead css={styles.tableHeader}>
          <tr css={styles.headerRow}>
            <th>Name</th>
            <th>TVL</th>
            <th>Category</th>
            <th>1d change</th>
            <th>7d change</th>
            <th>1m change</th>
          </tr>
        </thead>
        <tbody>
          {/* TO-DO: make it render every protocol >>before<< displaying because now it's a bit clunky */}
          {protocolsData.map((protocol, index) => {
            if (protocol !== undefined) {
              return (
                <TableItem
                  key={protocol.id}
                  protocolData={protocol}
                  index={index + 1}
                />
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

// const [protocols, setProtocols] = useState<any[]>([]);

// useEffect(() => {
//   async function fetchProtocols() {
//     const url = "https://api.llama.fi/protocols";
//     const res = await fetch(url);
//     const data = await res.json();
//     const filteredData = data.filter(
//       (protocol: { chains: string | string[] }) =>
//         protocol.chains.includes("Terra")
//     );

//     setProtocols(filteredData);
//   }

//   fetchProtocols();
// }, []);
