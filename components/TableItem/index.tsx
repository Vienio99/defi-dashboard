/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react";
import { FC } from "react";
import { FavoritesIcon } from "../Icons/FavoritesIcon";

{
  /* TO-DO: save images locally instead of displaying them from api */
}

interface TableItemProps {
  index: number;
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
  alignItems: "center",
});

const tableCell = css({
  width: "100%",
});

export const TableItem: FC<TableItemProps> = (protocolData) => {
  const { index, name, logo, tvl, symbol, category, tableRow } = protocolData;
  const formattedTVL = formatNumber(tvl);
  return (
    <tr css={tableRow}>
      <td css={nameCell}>
        <FavoritesIcon />
        <span>{index}</span>
        {logo && <img src={logo} width="30px" />}
        {name}
      </td>
      <td>${formattedTVL}</td>
      <td>{symbol ? symbol : "-"}</td>
      <td>{category}</td>
    </tr>
  );
};

const formatNumber = (num: number): string => {
  if (num / 1.0e9 >= 1) {
    const formattedNumber = (num / 1.0e9).toFixed(2).toString();
    return formattedNumber + "b";
  } else if (num / 1.0e6 >= 1) {
    const formattedNumber = (num / 1.0e6).toFixed(2).toString();
    return formattedNumber + "m";
  } else if (num / 1.0e3 >= 1) {
    const formattedNumber = (num / 1.0e3).toFixed(2).toString();
    return formattedNumber + "k";
  }
  
  return "0";
};
