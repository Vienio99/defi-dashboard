/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const mainContainer = css({
  display: "flex",
});

export const contentContainer = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  flex: "1 0 auto",
});

export const navbarWrapper = css({
  backgroundColor: "rgb(31, 34, 55)",
  boxShadow: "rgb(17 19 30) 1px 1px 2px, rgb(53 57 84) -1px -1px 2px",
  height: "100vh",
  width: "18rem",
  position: "fixed",
  zIndex: "1",
  top: "0",
  left: "0",
  overflowX: "hidden",
  padding: "2.8rem",
});

export const container = css({
  color: "white",
  height: "100vh"
});
