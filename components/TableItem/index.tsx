/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react";
import { FC, useEffect, useState } from "react";
import formatTvl from "../../utils/formatTvl";
import roundTvlChangePercentage from "../../utils/roundTvlChangePercentage";
import { FavoritesIcon } from "../Icons/FavoritesIcon";
import * as styles from "./styles";

{
  /* TO-DO: save images locally instead of displaying them from api */
}

// interface TableItemProps {
//   index: number;
//   name: string;
//   tvl: number;
//   symbol: string | null;
//   chains: Array<string>;
//   logo: string | null;
//   category: string;
//   tableRow: SerializedStyles;
// }

interface TableItemProps {
  index: number;
  protocolData: {
    name: string;
    symbol: string;
    category: string;
    logo: string;
    currentTvl?: number;
    oneDayChange?: number;
    oneWeekChange?: number;
    oneMonthChange?: number;
  };
}

// TO-DO: take into consideration what happens with the page if list passes 100vh
export const TableItem: FC<TableItemProps> = (data) => {
  const { index, protocolData } = data;

  return (
    <>
      {protocolData && (
        <tr>
          <td css={styles.nameCell}>
            <FavoritesIcon />
            <span>{index}</span>
            {protocolData.logo && (
              <img
                src={protocolData.logo}
                css={css({ borderRadius: "50%" })}
                height="30px"
              />
            )}
            {protocolData.name}
            {protocolData.symbol != "-" && ` (${protocolData.symbol})`}
          </td>
          <td>{protocolData.currentTvl && formatTvl(protocolData.currentTvl)}</td>
          <td>{protocolData.category}</td>

          {protocolData.oneDayChange && (
            <td css={{ color: protocolData.oneDayChange >= 0 ? "green" : "red" }}>
              {roundTvlChangePercentage(protocolData.oneDayChange, 3)}%
            </td>
          )}

          {protocolData.oneWeekChange && (
            <td css={{ color: protocolData.oneWeekChange >= 0 ? "green" : "red" }}>
              {roundTvlChangePercentage(protocolData.oneWeekChange, 3)}%
            </td>
          )}

          {protocolData.oneMonthChange && (
            <td css={{ color: protocolData.oneMonthChange >= 0 ? "green" : "red" }}>
              {roundTvlChangePercentage(protocolData.oneMonthChange, 3)}%
            </td>
          )}
        </tr>
      )}
    </>
  );
};
