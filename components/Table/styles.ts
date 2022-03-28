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
  gap: "0.8rem",
});

export const mainContainer = css({
  width: "100%",
  display: "grid",
  gap: "1.6rem",
});

export const infoBoxesContainer = css({
  display: "grid",
  gridAutoRows: "auto",
  width: "100%",
  gap: "1rem",
});

export const infoBox = css({
  border: "1px solid grey",
  borderRadius: "8px",
  fontWeight: "bold",
  padding: "18px",
  display: "flex",
  flexDirection: "column",
  gap: "0.6rem",
});
