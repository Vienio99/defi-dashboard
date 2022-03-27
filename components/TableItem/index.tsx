/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";
import formatTvl from "../../utils/formatTvl";
import roundTvlChangePercentage from "../../utils/roundTvlChangePercentage";
import { FavoritesIcon } from "../Icons/FavoritesIcon";
import * as styles from "./styles";

interface TableItemProps {
  index: number;
  protocol: {
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

export const TableItem: FC<TableItemProps> = (props) => {
  const { protocol } = props;
  return (
    <>
      {protocol && (
        <tr>
          <td css={styles.nameCell}>
            <FavoritesIcon />
            <span>{props.index}</span>
            {protocol.logo && (
              <img
                src={protocol.logo}
                css={css({ borderRadius: "50%" })}
                height="30px"
              />
            )}
            {protocol.name}
            {protocol.symbol != "-" && ` (${protocol.symbol})`}
          </td>
          <td>
            {protocol.currentTvl && formatTvl(protocol.currentTvl)}
          </td>
          <td>{protocol.category}</td>

          {protocol.oneDayChange && (
            <td
              css={{ color: protocol.oneDayChange >= 0 ? "green" : "red" }}
            >
              {roundTvlChangePercentage(protocol.oneDayChange, 3)}%
            </td>
          )}

          {protocol.oneWeekChange && (
            <td
              css={{ color: protocol.oneWeekChange >= 0 ? "green" : "red" }}
            >
              {roundTvlChangePercentage(protocol.oneWeekChange, 3)}%
            </td>
          )}

          {protocol.oneMonthChange && (
            <td
              css={{
                color: protocol.oneMonthChange >= 0 ? "green" : "red",
              }}
            >
              {roundTvlChangePercentage(protocol.oneMonthChange, 3)}%
            </td>
          )}
        </tr>
      )}
    </>
  );
};
