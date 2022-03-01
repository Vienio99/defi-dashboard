/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";
import { FavoritesIcon } from "../Icons/FavoritesIcon";

// TO-DO: props interface

export const TableItem: FC = () => {
  return (
    <tr>
      <td>Curve</td>
      <td>Ethereum</td>
      <td>12%</td>
      <td>13%</td>
      <td>5%</td>
    </tr>
  );
};
