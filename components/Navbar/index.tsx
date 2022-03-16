/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";
import { AboutIcon } from "../Icons/AboutIcon";
import { ChainsIcon } from "../Icons/ChainsIcon";
import { FavoritesIcon } from "../Icons/FavoritesIcon";
import { NftIcon } from "../Icons/NftIcon";
import { OverviewIcon } from "../Icons/OverviewIcon";
import * as styles from "./styles";

export const Navbar: FC = () => {
  return (
    // {/* Left navigation bar */}
    <nav css={styles.navbarContainer}>
      {/* Main logo and link to home page */}
      <a href="/" css={styles.title}>
        🌕 Defi Luna
      </a>
      {/* Switch from DeFi to NFTs */}
      <div css={styles.navSwitch}>
        <button css={styles.navSwitchBtn}>DeFi</button>
        <button css={styles.navSwitchBtn}>NFTs</button>
      </div>
      {/* Navigation */}
      <div css={styles.navItems}>
        <div css={styles.navItem}>
          <OverviewIcon />
          Overview
        </div>
        <div css={styles.navItem}>
          <ChainsIcon />
          Protocols
        </div>
        <div css={styles.navItem}>
          <NftIcon />
          NFTs
        </div>
        <div css={styles.navItem}>
          <FavoritesIcon />
          Favorites
        </div>
        <div css={styles.navItem}>
          <AboutIcon />
          About
        </div>
      </div>
    </nav>
  );
};
