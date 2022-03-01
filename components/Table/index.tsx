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
  const [chains, setChains] = useState<any[]>([]);
  useEffect(() => {
    async function fetchChains() {
      const url = "https://api.llama.fi/chains";
      const res = await fetch(url);
      const data = await res.json();
      setChains(data);
    }

    fetchChains();
  }, []);
  return (
    <div css={tableWrapper}>
      <h1>Total Value Locked Ranking</h1>
      <table css={tableContainer}>
        <thead>
          <tr>
            <th>Name</th>
            <th>TVL</th>
            <th>Token symbol</th>
          </tr>
        </thead>
        <tbody>
          {chains.map((chainData) => (
            <TableItem
              name={chainData.name}
              tvl={chainData.tvl}
              tokenSymbol={chainData.tokenSymbol}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
