/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC, useEffect, useRef, useState } from "react";
import { TableItem } from "../TableItem";
import * as styles from "./styles";
import { protocols } from "../../constants";
import sortProtocols from "../../utils/sortProtocols";
import { fetchProtocol } from "../../utils/fetchProtocol";
import dynamic from "next/dynamic";
import formatTvl from "../../utils/formatTvl";
import roundTvlChangePercentage from "../../utils/roundTvlChangePercentage";

// Needs dynamic import because >probably!< ligthweight-charts runs only in browser
const Chart = dynamic(() => import("../../components/Chart"), {
  ssr: false,
});

export interface ProtocolData {
  id: number;
  name: string;
  symbol: string;
  category: string;
  logo: string;
  currentTvl?: number;
  oneDayChange?: number;
  oneWeekChange?: number;
  oneMonthChange?: number;
  tvlHistory?: Array<{ date: number; totalLiquidityUSD: number }>;
}

export const Table: FC = () => {
  const [allProtocols, setAllProtocols] = useState<Array<ProtocolData>>([]);
  const [sortedBy, setSortedBy] = useState<keyof ProtocolData>("currentTvl");
  const [historicalTvls, setHistoricalTvls] = useState<
    Array<{ date: number; totalLiquidityUSD: number }>
  >([]);
  const reverseSortingRef = useRef<boolean>(false);

  console.log(historicalTvls);

  // TO-DO: Maybe extract sorting logic to external hook for Nfts etc that will be implemented in the future?
  const handleSort = (field: keyof ProtocolData) => {
    if (sortedBy === field) {
      reverseSortingRef.current = !reverseSortingRef.current;
    } else {
      reverseSortingRef.current = false;
    }

    // Create new array with [...protocolsData] to make re-render because otherwise React thinks that it's the same object using reference and doesn't re-render
    const sortedProtocols = sortProtocols(
      [...allProtocols],
      field,
      reverseSortingRef.current
    );

    setSortedBy(field);
    setAllProtocols(sortedProtocols);
  };

  useEffect(() => {
    async function fetchHistoricalTvls() {
      const url = "https://api.llama.fi/charts/terra";
      const res = await fetch(url);

      if (!res.ok) {
        throw Error("could not fetch the data");
      }
      const data = await res.json();
      setHistoricalTvls(data);
    }

    async function fetchAllProtocols() {
      await Promise.all(
        protocols.map((protocol) => fetchProtocol(protocol.name))
      ).then((protocols) => {
        // filter out any undefined protocols so the type is Array<ProtocolData> instead of Array<ProtocolData | undefined>
        const filteredProtocols = [...protocols].filter(
          (protocol): protocol is ProtocolData => !!protocol
        );
        // sort by current tvl initially, descending order
        const sortedProtocols = sortProtocols(
          filteredProtocols,
          sortedBy,
          false
        );

        setAllProtocols(sortedProtocols);
      });
    }
    if (allProtocols.length === 0) {
      fetchAllProtocols();
      fetchHistoricalTvls();
    }
  }, [allProtocols]);

  return (
    <div css={styles.tableWrapper}>
      <h1>TVL Ranking</h1>
      {/* TO-DO: put styles into the file */}
      <div css={styles.mainContainer}>
        <div css={styles.infoContainer}>
          {/* Three container on the left to the chart */}
          <div css={styles.infoBoxesContainer}>
            <div css={styles.infoBox}>
              <div>Total Value Locked (USD)</div>
              <div css={{ fontSize: "30px" }}>
                {historicalTvls && (
                  <>
                    $
                    {formatTvl(
                      historicalTvls[historicalTvls.length - 1]
                        ?.totalLiquidityUSD
                    )}
                  </>
                )}
              </div>
            </div>
            <div css={styles.infoBox}>
              <div>Change (24h)</div>
              <div css={{ fontSize: "30px" }}>
                {historicalTvls && (
                  <>
                    {roundTvlChangePercentage(
                      (historicalTvls[historicalTvls.length - 1]
                        ?.totalLiquidityUSD /
                        historicalTvls[historicalTvls.length - 2]
                          ?.totalLiquidityUSD -
                        1) *
                        100,
                      3
                    )}
                    %
                  </>
                )}
              </div>
            </div>
            <div css={styles.infoBox}>Anchor Dominance</div>
          </div>
          <Chart historicalTvls={historicalTvls} />
        </div>

        <table css={styles.tableContainer}>
          <thead css={styles.tableHeader}>
            <tr css={styles.headerRow}>
              <th>Name</th>
              <th onClick={() => handleSort("currentTvl")}>TVL</th>
              {/* TO-DO: make filtering for category */}
              <th>Category</th>
              <th onClick={() => handleSort("oneDayChange")}>1d change</th>
              <th onClick={() => handleSort("oneWeekChange")}>7d change</th>
              <th onClick={() => handleSort("oneMonthChange")}>1m change</th>
            </tr>
          </thead>
          <tbody>
            {/* TO-DO: make it render every protocol >>before<< displaying because now it's a bit clunky */}
            {allProtocols.map((protocol, index) => {
              if (protocol !== undefined) {
                return (
                  <TableItem
                    key={protocol.id}
                    protocol={protocol}
                    index={index + 1}
                  />
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
