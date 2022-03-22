/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC, useEffect, useRef, useState } from "react";
import { TableItem } from "../TableItem";
import * as styles from "./styles";
import { protocols } from "../../constants";
import sortProtocols from "../../utils/sortProtocols";
import { fetchProtocol } from "../../utils/fetchProtocol";
import dynamic from "next/dynamic";

// TO-DO: not sure why it needs to be that way
const Chart = dynamic(() => import("../../components/Chart"), {
  ssr: false
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
  const [protocolsData, setProtocolsData] = useState<Array<ProtocolData>>([]);
  const [sortedBy, setSortedBy] = useState<keyof ProtocolData>("currentTvl");
  const reverseSortingRef = useRef<boolean>(false);

  // TO-DO: Maybe extract sorting logic to external hook for Nfts etc that will be implemented in the future?
  const handleSort = (field: keyof ProtocolData) => {
    if (sortedBy === field) {
      reverseSortingRef.current = !reverseSortingRef.current;
    } else {
      reverseSortingRef.current = false;
    }

    // Create new array with [...protocolsData] to make re-render
    const sortedProtocols = sortProtocols(
      [...protocolsData],
      field,
      reverseSortingRef.current
    );

    setSortedBy(field);
    setProtocolsData(sortedProtocols);
  };

  useEffect(() => {
    async function fetchProtocolsData() {
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

        setProtocolsData(sortedProtocols);
        console.log(sortedProtocols);
      });
    }
    if (protocolsData.length === 0) {
      fetchProtocolsData();
    }
    console.log("rerender");
  }, [protocolsData]);


  return (
    <div css={styles.tableWrapper}>
      <h1>TVL Ranking</h1>
      <Chart/>
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
