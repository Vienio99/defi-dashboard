/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react";
import { FC } from "react";
import { FavoritesIcon } from "../Icons/FavoritesIcon";

interface TableItemProps {
  name: string;
  tvl: number;
  symbol: string | null;
  chains: Array<string>;
  logo: string | null;
  category: string;
  tableRow: SerializedStyles;
}

const nameCell = css({
  display: "flex",
  gap: "10px",
  alignItems: "center"
})

const tableCell = css({
  width: "100%"
});

export const TableItem: FC<TableItemProps> = (protocolData) => {
  const { name, logo, tvl, symbol, category, tableRow } = protocolData;
  return (
    <tr css={tableRow}>
      {/* TO-DO: save images locally instead of displaying them from api */}
      <td css={nameCell}>{logo && <img src={logo} width="30px" />}{name}</td>
      <td>{tvl}$</td>
      <td>{symbol ? symbol : "-"}</td>
      <td>{category}</td>
    </tr>
  );
};
