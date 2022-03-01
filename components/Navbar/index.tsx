/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";
import { AboutIcon } from "../Icons/AboutIcon";
import { ChainsIcon } from "../Icons/ChainsIcon";
import { FavoritesIcon } from "../Icons/FavoritesIcon";
import { OverviewIcon } from "../Icons/OverviewIcon";
import * as styles from "./styles";

const navigation = css({
  display: "flex",
  flexDirection: "column",
  gap: "1.2rem",
});

const navItem = css({
  display: "flex",
  alignItems: "center",
  gap: "0.8rem",
  color: "#D3D3D3",
  '&:hover': {
    color: 'white'
  }
});

const navSwitch = css({
  display: "flex",
  gap: "0.4rem",
  margin: "12px 0 12px 0"
})

const navSwitchBtn = css({
  border: "none",
  background: "rgb(68, 94, 208)",
  flexGrow: "1",
  height: "1.8rem",
  borderRadius: "10px",
  color: "white",
  fontSize: "14px"
})

export const Navbar: FC = () => {
  return (
    // {/* Left navigation bar */}
    <nav css={styles.navbarContainer}>
      {/* Main logo and link to home page */}
      <a href="/" css={styles.title}>
        Defi Llama
      </a>
      {/* Switch from DeFi to NFTs */}
      <div css={navSwitch}>
        <button css={navSwitchBtn}>DeFi</button>
        <button css={navSwitchBtn}>NFTs</button>
      </div>
      {/* Navigation */}
      <div css={navigation}>
        <div css={navItem}>
          <OverviewIcon />
          Overview
        </div>
        <div css={navItem}>
          <ChainsIcon />
          Chains
        </div>
        <div css={navItem}>
          <FavoritesIcon />
          Favorites
        </div>
        <div css={navItem}>
          <AboutIcon />
          About
        </div>
      </div>
    </nav>
  );
};
