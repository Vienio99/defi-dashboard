/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";
import { FavoritesIcon } from "../Icons/FavoritesIcon";
import * as styles from "./styles";

export const Table: FC = () => {
  return (
    <div>
      <h1>Total Value Locked Ranking</h1>
      <table>
        <thead>
          <th>Name</th>
          <th>Chains</th>
          <th>1d Change</th>
          <th>7d Change</th>
          <th>1m Change</th>
        </thead>
        <tr>
          <td>Curve</td>
          <td>Ethereum</td>
          <td>12%</td>
          <td>13%</td>
          <td>5%</td>
        </tr>
      </table>
    </div>
  );
};
