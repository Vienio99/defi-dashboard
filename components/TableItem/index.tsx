/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";
import formatTvl from "../../utils/formatTvl";
import roundTvlChangePercentage from "../../utils/roundTvlChangePercentage";
import { FavoritesIcon } from "../Icons/FavoritesIcon";
import * as styles from "./styles";

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
export const TableItem: FC<TableItemProps> = (props) => {
  // TO-DO: destructure props maybe?

  return (
    <>
      {props.protocolData && (
        <tr>
          <td css={styles.nameCell}>
            <FavoritesIcon />
            <span>{props.index}</span>
            {props.protocolData.logo && (
              <img
                src={props.protocolData.logo}
                css={css({ borderRadius: "50%" })}
                height="30px"
              />
            )}
            {props.protocolData.name}
            {props.protocolData.symbol != "-" && ` (${props.protocolData.symbol})`}
          </td>
          <td>
            {props.protocolData.currentTvl && formatTvl(props.protocolData.currentTvl)}
          </td>
          <td>{props.protocolData.category}</td>

          {props.protocolData.oneDayChange && (
            <td
              css={{ color: props.protocolData.oneDayChange >= 0 ? "green" : "red" }}
            >
              {roundTvlChangePercentage(props.protocolData.oneDayChange, 3)}%
            </td>
          )}

          {props.protocolData.oneWeekChange && (
            <td
              css={{ color: props.protocolData.oneWeekChange >= 0 ? "green" : "red" }}
            >
              {roundTvlChangePercentage(props.protocolData.oneWeekChange, 3)}%
            </td>
          )}

          {props.protocolData.oneMonthChange && (
            <td
              css={{
                color: props.protocolData.oneMonthChange >= 0 ? "green" : "red",
              }}
            >
              {roundTvlChangePercentage(props.protocolData.oneMonthChange, 3)}%
            </td>
          )}
        </tr>
      )}
    </>
  );
};
