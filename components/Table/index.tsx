/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Dispatch,
  FC,
  ProviderExoticComponent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { fileURLToPath } from "url";
import { FavoritesIcon } from "../Icons/FavoritesIcon";
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
    async function fetchProtocolData() {
      await Promise.all(
        protocols.map(protocol => fetchProtocol(protocol.name))
      ).then((protocols) => {
        // filter out any undefined protocols so the type is Array<ProtocolData>
        const filteredProtocols = [...protocols].filter(
          (protocol): protocol is ProtocolData => !!protocol
        );
        const sortedProtocols = sortProtocols(filteredProtocols, "currentTvl");

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
