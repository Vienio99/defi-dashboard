/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { FC, useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode, IChartApi } from "lightweight-charts";
import * as styles from "./styles";

interface ChartProps {
  historicalTvls: Array<{ date: number; totalLiquidityUSD: number }>;
}

export const Chart: FC<ChartProps> = (props) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chart = useRef<IChartApi | null>(null);
  const resizeObserver = useRef<ResizeObserver | null>(null);

  const [historicalTvls, setHistoricalTvls] = useState<Array<{ time: string; value: number }>>([]);

  // function convertUnixToDate(data) {
  //   console.log(props.historicalTvls);
  // }
  // ASYNC?



  useEffect(() => {

    function convertHistoricalTvl(data) {
      const convertedTvls: Array<{ time: string; value: number }> = [];
      const dtFormat: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "2-digit",
        year: "numeric",
      };
  
      for (const record in data) {
        const date = data[record].date * 1000;
        const convertedDate = new Date(date);

        const formattedDate = convertedDate.getFullYear() + "-" + (convertedDate.getMonth() + 1) + "-" + convertedDate.getDate();
        console.log(formattedDate);

  
        const tvl: number = data[record].totalLiquidityUSD;
  
        const convertedTvl = { time: formattedDate, value: tvl };
        convertedTvls.push(convertedTvl);
      }
  
      setHistoricalTvls(convertedTvls);
    }

    if (chart.current === null && historicalTvls.length !== 0) {
      // TO-DO: might be an anti-pattern to use that type predicates?
      chart.current = createChart(chartContainerRef.current as HTMLDivElement, {
        width: 700,
        height: 300,
        layout: {
          backgroundColor: "rgb(31, 34, 55)",
          textColor: "rgba(255, 255, 255, 0.9)",
        },
        grid: {
          vertLines: {
            color: "#334158",
          },
          horzLines: {
            color: "#334158",
          },
        },
        crosshair: {
          mode: CrosshairMode.Normal,
        },
        timeScale: {
          borderColor: "rgb(63, 63, 63)",
        },
      });

      const areaSeries = chart.current.addAreaSeries({
        // topColor: "rgba(38,198,218, 0.56)",
        // bottomColor: "white",
        lineColor: "rgb(75, 219, 75)",
        lineWidth: 2,
      });

      areaSeries.setData(historicalTvls);
    }

    if (historicalTvls.length === 0) {
      convertHistoricalTvl(props.historicalTvls);
    }

    console.log(historicalTvls);
  }, [historicalTvls]);

  // Resize chart on container resizes.
  useEffect(() => {
    resizeObserver.current = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (chart.current !== null) {
        chart.current.applyOptions({ width, height });
        setTimeout(() => {
          if (chart.current !== null) {
            chart.current.timeScale().fitContent();
          }
        }, 0);
      }
    });

    resizeObserver.current.observe(chartContainerRef.current as HTMLDivElement);

    resizeObserver.current !== null && resizeObserver.current.disconnect();
  }, []);

  return (
    <div css={styles.chartWrapper}>
      <div ref={chartContainerRef} className="chart-container" />
    </div>
  );
};

export default Chart;
