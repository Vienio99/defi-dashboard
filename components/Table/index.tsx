/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC, useEffect, useState } from "react";
import { fileURLToPath } from "url";
import { FavoritesIcon } from "../Icons/FavoritesIcon";
import { TableItem } from "../TableItem";
import * as styles from "./styles";

const protocols = [
  "lido",
  "anchor",
  "astroport",
  "stader",
  "terraswap",
  "mirror",
  "prism-protocol",
  "allbridge",
  "mars-protocol",
  "pylon-protocol",
  "spectrum-protocol",
  "loop-finance",
  "nexus-protocol",
  "white-whale",
  "edge-protocol",
  "apollodao",
  "starterra",
  "soluna",
  "ink-protocol",
  "loterra",
  "terrafloki",
  "valkyrie",
];

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

      setProtocols(filteredData);

      const urlTest = "https://api.llama.fi/protocol/anchor";
      const res2 = await fetch(urlTest);
      const data2 = await res2.json();
      const tvls = data2.chainTvls.Terra.tvl;

      const tvlsLength = tvls.length - 1;

      console.log(
        "TVL: " + tvls[tvlsLength].totalLiquidityUSD,
        "For day: " + tvls[tvlsLength].date
      );
      console.log(
        "TVL: " + tvls[tvlsLength - 1].totalLiquidityUSD,
        "For day: " + tvls[tvlsLength - 1].date
      );
      console.log(
        "TVL: " + tvls[tvlsLength - 7].totalLiquidityUSD,
        "For day: " + tvls[tvlsLength - 7].date
      );
      console.log(
        "TVL: " + tvls[tvlsLength - 30].totalLiquidityUSD,
        "For day: " + tvls[tvlsLength - 30].date
      );
    }

    fetchProtocols();
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
            {/* TO-DO: some protocols are multi-chain and tvl parsed is for all chains so it needs to be terra specific */}
            {/* <th>1d change</th>
            <th>7d change</th>
            <th>1m change</th> */}
            {/* <th>Terra only</th> */}
          </tr>
        </thead>
        <tbody>
          {/* TO-DO: make it render every protocol >>before<< displaying because now it's a bit clunky */}
          {protocols.map((protocolData, index) => {
            // console.log(protocolData.chains.includes("Terra") && protocolData);
            return (
              // TO-DO: change one props only instead of 10 like below
              <TableItem
                key={protocolData.id}
                index={index + 1}
                logo={protocolData.logo}
                name={protocolData.name}
                tvl={protocolData.chainTvls.Terra}
                symbol={protocolData.symbol}
                chains={protocolData.chains}
                category={protocolData.category}
                tableRow={styles.tableRow}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
