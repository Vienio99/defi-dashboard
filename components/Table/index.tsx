/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC, useEffect, useState } from "react";
import { fileURLToPath } from "url";
import { FavoritesIcon } from "../Icons/FavoritesIcon";
import { TableItem } from "../TableItem";
import * as styles from "./styles";
import { protocols } from "../../constants";

export const Table: FC = () => {
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
          {protocols.map((protocol, index) => {
            return (
              <TableItem
                key={protocol.id}
                protocolName={protocol.name}
                index={index + 1}
              />
            );
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
