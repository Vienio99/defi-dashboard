/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const tableWrapper = css({
  height: "100%",
  width: "64rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const tableContainer = css({
  border: "3px solid black",
  width: "100%",
  borderCollapse: "collapse",
});

export const tableHeader = css({
  borderBottom: "2px solid black",
});

export const tableRow = css({
  paddingBottom: "5px",
});

export const headerRow = css({
  textAlign: "left",
});
