/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const tableWrapper = css({
  height: "100%",
  width: "64rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1.2rem",
});

export const tableContainer = css({
  borderCollapse: "collapse",
  width: "100%",
});

export const tableHeader = css({
  borderBottom: "1px solid grey",
});

export const headerRow = css({
  textAlign: "left",
});

export const infoContainer = css({
  display: "flex",
  gap: "0.8rem"
})
