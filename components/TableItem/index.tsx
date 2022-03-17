/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react";
import { FC, useEffect, useState } from "react";
import formatTvl from "../../utils/formatTvl";
import roundTvlChangePercentage from "../../utils/roundTvlChangePercentage";
import { FavoritesIcon } from "../Icons/FavoritesIcon";
import * as styles from "./styles";

{
  /* TO-DO: save images locally instead of displaying them from api */
}

// interface TableItemProps {
//   index: number;
//   name: string;
//   tvl: number;
//   symbol: string | null;
//   chains: Array<string>;
//   logo: string | null;
//   category: string;
//   tableRow: SerializedStyles;
// }

interface TableItemProps {
  index: number;
  protocolData: {
    name: string;
    symbol: string;
    category: string;
    logo: string;
    currentTvl?: number;
    oneDayChange?: number;
    oneWeekChange?: number;
    oneMonthChange?: number;
  };
}

// TO-DO: take into consideration what happens with the page if list passes 100vh
export const TableItem: FC<TableItemProps> = (data) => {
  // const { index, name, logo, tvl, symbol, category, tableRow } = protocolData;
  const { index, protocolData } = data;

  return (
    <>
      {protocolData && (
        <tr>
          <td css={styles.nameCell}>
            <FavoritesIcon />
            <span>{index}</span>
            {protocolData.logo && (
              <img
                src={protocolData.logo}
                css={css({ borderRadius: "50%" })}
                height="30px"
              />
            )}
            {protocolData.name}
            {protocolData.symbol != "-" && ` (${protocolData.symbol})`}
          </td>
          <td>{protocolData.currentTvl && formatTvl(protocolData.currentTvl)}</td>
          <td>{protocolData.category}</td>

          {protocolData.oneDayChange && (
            <td css={{ color: protocolData.oneDayChange >= 0 ? "green" : "red" }}>
              {roundTvlChangePercentage(protocolData.oneDayChange, 3)}%
            </td>
          )}

          {protocolData.oneWeekChange && (
            <td css={{ color: protocolData.oneWeekChange >= 0 ? "green" : "red" }}>
              {roundTvlChangePercentage(protocolData.oneWeekChange, 3)}%
            </td>
          )}

          {protocolData.oneMonthChange && (
            <td css={{ color: protocolData.oneMonthChange >= 0 ? "green" : "red" }}>
              {roundTvlChangePercentage(protocolData.oneMonthChange, 3)}%
            </td>
          )}
        </tr>
      )}
    </>
  );
};

// /** @jsxImportSource @emotion/react */
// import { css, SerializedStyles } from "@emotion/react";
// import { FC, useEffect, useState } from "react";
// import formatTvl from "../../utils/formatTvl";
// import roundTvlChangePercentage from "../../utils/roundTvlChangePercentage";
// import { FavoritesIcon } from "../Icons/FavoritesIcon";
// import * as styles from "./styles";

// {
//   /* TO-DO: save images locally instead of displaying them from api */
// }

// // interface TableItemProps {
// //   index: number;
// //   name: string;
// //   tvl: number;
// //   symbol: string | null;
// //   chains: Array<string>;
// //   logo: string | null;
// //   category: string;
// //   tableRow: SerializedStyles;
// // }

// interface TableItemProps {
//   index: number;
//   protocolName: string;
// }

// interface ProtocolData {
//   name: string;
//   logo: string;
//   symbol: string;
//   category: string;
//   chainTvls: {
//     Terra: {
//       tvl: Array<{ date: number; totalLiquidityUSD: number }>;
//     };
//   };
// }

// // TO-DO: take into consideration what happens with the page if list passes 100vh
// export const TableItem: FC<TableItemProps> = (data) => {
//   // const { index, name, logo, tvl, symbol, category, tableRow } = protocolData;
//   const { index, protocolName } = data;

//   // const formattedTVL = formatNumber(tvl);

//   const [protocolData, setProtocolData] = useState<ProtocolData>();
//   const [currentTVL, setCurrentTVL] = useState<number>();

//   // TVL change percentage
//   const [oneDayChange, setOneDayChange] = useState<number>();
//   const [oneWeekChange, setOneWeekChange] = useState<number>();
//   const [oneMonthChange, setOneMonthChange] = useState<number>();

//   useEffect(() => {
//     // TO-DO: move this function to getStaticProps
//     // TO-DO: provide filtering
//     async function fetchProtocolData() {
//       const url = `https://api.llama.fi/protocol/${protocolName}`;
//       const res = await fetch(url);
//       const data: ProtocolData = await res.json();

//       setProtocolData(data);

//       const tvls = data.chainTvls?.Terra?.tvl;
//       console.log(tvls);

//       if (tvls !== undefined) {
//         const tvlsLength = tvls.length - 1;
//         const currentTVL = tvls[tvlsLength].totalLiquidityUSD;
//         console.log(currentTVL);

//         if (currentTVL !== undefined) {
//           setCurrentTVL(currentTVL);

//           const tvlOneDayAgo = tvls[tvlsLength - 1]?.totalLiquidityUSD;

//           if (tvlOneDayAgo !== undefined) {
//             const oneDayTVLchange = (currentTVL / tvlOneDayAgo - 1) * 100;
//             setOneDayChange(oneDayTVLchange);
//           }

//           const tvlOneWeekAgo = tvls[tvlsLength - 7]?.totalLiquidityUSD;
//           if (tvlOneWeekAgo !== undefined) {
//             const oneWeekTVLchange = (currentTVL / tvlOneWeekAgo - 1) * 100;
//             setOneWeekChange(oneWeekTVLchange);
//           }

//           const tvlOneMonthAgo = tvls[tvlsLength - 30]?.totalLiquidityUSD;
//           if (tvlOneMonthAgo !== undefined) {
//             const oneMonthTVLchange = (currentTVL / tvlOneMonthAgo - 1) * 100;
//             setOneMonthChange(oneMonthTVLchange);
//           }
//         }
//       }
//     }

//     // fetchProtocolData();
//   }, []);

//   return (
//     <>
//       {protocolData && (
//         <tr>
//           <td css={styles.nameCell}>
//             <FavoritesIcon />
//             <span>{index}</span>
//             {protocolData.logo && (
//               <img
//                 src={protocolData.logo}
//                 css={css({ borderRadius: "50%" })}
//                 height="30px"
//               />
//             )}
//             {protocolData.name}
//             {protocolData.symbol != "-" && ` (${protocolData.symbol})`}
//           </td>
//           <td>{currentTVL && formatTvl(currentTVL)}</td>
//           <td>{protocolData.category}</td>

//           {oneDayChange && (
//             <td css={{ color: oneDayChange >= 0 ? "green" : "red" }}>
//               {roundTvlChangePercentage(oneDayChange, 3)}%
//             </td>
//           )}

//           {oneWeekChange && (
//             <td css={{ color: oneWeekChange >= 0 ? "green" : "red" }}>
//               {roundTvlChangePercentage(oneWeekChange, 3)}%
//             </td>
//           )}

//           {oneMonthChange && (
//             <td css={{ color: oneMonthChange >= 0 ? "green" : "red" }}>
//               {roundTvlChangePercentage(oneMonthChange, 3)}%
//             </td>
//           )}
//         </tr>
//       )}
//     </>
//   );
// };
