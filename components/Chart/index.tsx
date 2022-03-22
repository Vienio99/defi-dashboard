// /** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useRef } from "react";
import { createChart, CrosshairMode, IChartApi } from "lightweight-charts";

function Chart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chart = useRef<IChartApi | null>(null);
  const resizeObserver = useRef<ResizeObserver | null>(null);

  useEffect(() => {
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

    console.log(chart.current);

    const areaSeries = chart.current.addAreaSeries({
      // topColor: "rgba(38,198,218, 0.56)",
      // bottomColor: "white",
      lineColor: "rgb(75, 219, 75)",
      lineWidth: 2,
    });

    areaSeries.setData([
      { time: "2018-10-19", value: 19103293.0 },
      { time: "2018-10-22", value: 21737523.0 },
      { time: "2018-10-23", value: 29328713.0 },
      { time: "2018-10-24", value: 37435638.0 },
      { time: "2018-10-25", value: 25269995.0 },
      { time: "2018-10-26", value: 24973311.0 },
    ]);
  }, []);

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
      <div ref={chartContainerRef} className="chart-container"/>
  );
}

export default Chart;
