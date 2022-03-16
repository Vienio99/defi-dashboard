/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const navbarContainer = css({
  display: "flex",
  flexDirection: "column",
  marginTop: "1rem",
  color: "white",
  padding: "2.8rem",
  gap: "1rem",
});

export const title = css({
  fontWeight: "bold",
  fontSize: "1.8rem",
});

export const navItems = css({
  display: "flex",
  flexDirection: "column",
  gap: "1.2rem",
});

export const navItem = css({
  display: "flex",
  alignItems: "center",
  gap: "0.8rem",
  color: "#D3D3D3",
  "&:hover": {
    color: "white",
  },
});

export const navSwitch = css({
  display: "flex",
  gap: "0.4rem",
  margin: "12px 0 12px 0",
});

export const navSwitchBtn = css({
  border: "none",
  background: "rgb(68, 94, 208)",
  flexGrow: "1",
  height: "1.8rem",
  borderRadius: "10px",
  color: "white",
  fontSize: "14px",
  fontWeight: "bold",
});
