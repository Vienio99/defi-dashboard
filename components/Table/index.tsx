/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC, useEffect, useState } from "react";
import { TableItem } from "../TableItem";
import * as styles from "./styles";
import { protocols } from "../../constants";
import sortProtocols from "../../utils/sortProtocols";
import { fetchProtocol } from "../../utils/fetchProtocol";

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
}

export const Table: FC = () => {
  const [protocolsData, setProtocolsData] = useState<Array<ProtocolData>>([]);

  useEffect(() => {
    async function fetchProtocolsData() {
      await Promise.all(
        protocols.map((protocol) => fetchProtocol(protocol.name))
      ).then((protocols) => {
        // filter out any undefined protocols so the type is Array<ProtocolData> instead of Array<ProtocolData | undefined>
        const filteredProtocols = [...protocols].filter(
          (protocol): protocol is ProtocolData => !!protocol
        );
        const sortedProtocols = sortProtocols(filteredProtocols, "currentTvl");

        setProtocolsData(sortedProtocols);
      });
    }

    fetchProtocolsData();
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
