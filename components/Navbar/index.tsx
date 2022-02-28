/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";
import { ChainsIcon } from "../Icons/ChainsIcon";
import { OverviewIcon } from "../Icons/OverviewIcon";
import * as styles from "./styles";

const navigation = css({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const navItemContainer = css({
  display: "flex",
  alignItems: "center",
});

export const Navbar: FC = () => {
  return (
    // {/* Left navigation bar */}
    <nav css={styles.navbarContainer}>
      {/* Main logo and link to home page */}
      <a href="/" css={styles.title}>
        Defi Llama
      </a>
      {/* Switch from DeFi to NFTs */}
      <div>
        <button>DeFi</button>
        <button>NFTs</button>
      </div>
      {/* Navigation */}
      <div css={navigation}>
        <div css={navItemContainer}>
          <OverviewIcon />
          Overview
        </div>
        <div>
          <ChainsIcon />
          Chains
        </div>
        <div>Favourites</div>
        <div>About</div>
      </div>
    </nav>
  );
};
