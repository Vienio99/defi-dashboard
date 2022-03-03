/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC, useEffect, useState } from "react";
import { FavoritesIcon } from "../Icons/FavoritesIcon";
import { TableItem } from "../TableItem";
// import * as styles from "./styles";

const tableWrapper = css({
  height: "100%",
  width: "50%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const tableContainer = css({
  display: "flex",
  flexDirection: "column",
  border: "3px solid white",
});

const tableList = css({
  display: "flex",
  flexDirection: "column",
});

export const Table: FC = () => {
  const [protocols, setProtocols] = useState<any[]>([]);
  useEffect(() => {
    async function fetchProtocols() {
      const url = "https://api.llama.fi/protocols";
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setProtocols(data);
    }

    fetchProtocols();
  }, []);
  return (
    <div css={tableWrapper}>
      <h1>Total Value Locked Ranking</h1>
      <table css={tableContainer}>
        <thead>
          <tr>
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
          {protocols.map((protocolData) => {
            console.log(protocolData.chains.includes("Terra") && protocolData);
            return (
              protocolData.chains.includes("Terra") && (
                <TableItem
                  key={protocolData.id}
                  logo={protocolData.logo}
                  name={protocolData.name}
                  tvl={protocolData.chainTvls.Terra}
                  symbol={protocolData.symbol}
                  chains={protocolData.chains}
                  category={protocolData.category}
                />
              )
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
