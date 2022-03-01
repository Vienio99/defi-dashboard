/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";
import { FavoritesIcon } from "../Icons/FavoritesIcon";

interface TableItemProps {
  name: string;
  tvl: number;
  tokenSymbol: string | null;
}

export const TableItem: FC<TableItemProps> = (chainData) => {
  console.log(chainData.name);
  return (
    <tr>
      <td>{chainData.name}</td>
      <td>{chainData.tvl}</td>
      <td>{chainData.tokenSymbol ? chainData.tokenSymbol : "-"}</td>
    </tr>
  );
};
