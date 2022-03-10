/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC, useEffect, useState } from "react";
import { FavoritesIcon } from "../Icons/FavoritesIcon";
import { TableItem } from "../TableItem";
// import * as styles from "./styles";

const tableWrapper = css({
  height: "100%",
  width: "64rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const tableContainer = css({
  border: "3px solid black",
  width: "100%",
  borderCollapse: "collapse",
});

const tableHeader = css({
  borderBottom: "2px solid black",
});

const tableRow = css({
  paddingBottom: "5px",
});

const headerRow = css({
  textAlign: "left",
});

export const Table: FC = () => {
  const [protocols, setProtocols] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProtocols() {
      const url = "https://api.llama.fi/protocols";
      const res = await fetch(url);
      const data = await res.json();
      const filteredData = data.filter(
        (protocol: { chains: string | string[] }) =>
          protocol.chains.includes("Terra")
      );
      console.log(filteredData);
      setProtocols(filteredData);
    }

    fetchProtocols();
  }, []);
  return (
    <div css={tableWrapper}>
      <h1>Total Value Locked Ranking</h1>
      <table css={tableContainer}>
        <thead css={tableHeader}>
          <tr css={headerRow}>
            <th>Name</th>
            <th>TVL</th>
            <th>Symbol</th>
            <th>Category</th>
            {/* TO-DO: some protocols are multi-chain and tvl parsed is for all chains so it needs to be terra specific */}
            {/* <th>1d change</th>
            <th>7d change</th>
            <th>1m change</th> */}
            <th>Terra only</th>
          </tr>
        </thead>
        <tbody>
          {/* TO-DO: make it render every protocol before displaying because now it's a bit clunky */}
          {protocols.map((protocolData, index) => {
            console.log(protocolData.chains.includes("Terra") && protocolData);
            return (
              <TableItem
                key={protocolData.id}
                index={index + 1}
                logo={protocolData.logo}
                name={protocolData.name}
                tvl={protocolData.chainTvls.Terra}
                symbol={protocolData.symbol}
                chains={protocolData.chains}
                category={protocolData.category}
                tableRow={tableRow}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
