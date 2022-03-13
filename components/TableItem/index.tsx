/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react";
import { FC } from "react";
import formatNumber from "../../utils/formatNumbers";
import { FavoritesIcon } from "../Icons/FavoritesIcon";
import * as styles from "./styles";

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

export const TableItem: FC<TableItemProps> = (protocolData) => {
  const { index, name, logo, tvl, symbol, category, tableRow } = protocolData;
  const formattedTVL = formatNumber(tvl);
  return (
    <tr css={tableRow}>
      <td css={styles.nameCell}>
        <FavoritesIcon />
        <span>{index}</span>
        {logo && (
          <img src={logo} css={css({ borderRadius: "50%" })} height="30px" />
        )}
        {name}
        {symbol != "-" && ` (${symbol})`}
      </td>
      <td>${formattedTVL}</td>
      <td>{category}</td>
    </tr>
  );
};
