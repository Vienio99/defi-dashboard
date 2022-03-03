/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";
import { FavoritesIcon } from "../Icons/FavoritesIcon";

interface TableItemProps {
  name: string;
  tvl: number;
  symbol: string | null;
  chains: Array<string>;
  logo: string | null;
  category: string;
}

export const TableItem: FC<TableItemProps> = (protocolData) => {
  return (
    <tr>
      {/* TO-DO: save images locally instead of displaying them from api */}
      <td>{protocolData.logo && <img src={protocolData.logo} width="30px"/>}</td>
      <td>{protocolData.name}</td>
      <td>{protocolData.tvl}$</td>
      <td>{protocolData.symbol ? protocolData.symbol : "-"}</td>
      <td>{protocolData.category}</td>
    </tr>
  );
};
