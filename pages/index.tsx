/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import * as styles from "./styles/Home";
import { Navbar } from "../components/Navbar";
import { Table } from "../components/Table";

const Home: NextPage = () => {
  return (
    <div css={styles.container}>
      <Head>
        <title>Terra</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div css={styles.mainContainer}>
        <div css={styles.navbarWrapper}>
          <Navbar />
        </div>
        {/* Main content, chart etc. */}
        <div css={styles.contentContainer}>
          {/* Table */}
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;

// {/* Search bar */}
// <form>
//   <input placeholder="Search..." />
// </form>
// {/* Container for info about TVL, change etc. */}
// <div>
//   {/* TVL */}
//   <div>
//     <p>Total Value Locked (USD)</p>
//     <p>50m</p>
//   </div>
//   {/* Change */}
//   <div>
//     <p>Change 24h</p>
//     <p>50%</p>
//   </div>
// </div>
// {/* Historical analysis chart */}
// <div>Total TVL</div>
