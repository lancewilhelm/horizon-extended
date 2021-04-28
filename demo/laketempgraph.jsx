import { useEffect, useState } from "react";
import styles from "../styles/LakeTempGraph.module.css";
import { timeFormat } from "d3-time-format";
import { Group } from "@visx/group";
import { scaleTime, scaleLinear } from "@visx/scale";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { curveMonotoneX } from "@visx/curve";
import { LinePath } from "@visx/shape";
import { LinearGradient } from "@visx/gradient";
import { extent } from "d3-array";

export default function LakeTempGraph() {
  // Define State
  const [data, setData] = useState([]); // Store temp data
  const [period, setPeriod] = useState("24h"); // Store the time period requested

  // Define variables for the graph
  const w_graph = 250;
  const h_graph = 100;
  const margin = { top: 10, right: 10, bottom: 30, left: 30 };

  const xMax = w_graph - margin.left - margin.right;
  const yMax = h_graph - margin.top - margin.bottom;

  // accessors
  const getDate = (d) => new Date(d["timestamp"] * 1000);
  const getTemp = (d) => Number(tempstring_to_f(d["temp"]));

  // rounding function
  function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  // Convert a tempstring from temp probe to C
  function tempstring_to_c(tempstring) {
    return tempstring / 1000;
  }

  // Convert a tempstring from temp probe to F
  function tempstring_to_f(tempstring) {
    var temp_c = tempstring_to_c(tempstring);
    return (temp_c * 9.0) / 5.0 + 32.0;
  }

  // Function to flip the period on click
  function flipPeriod() {
    if (period == "24h") {
      setPeriod("1y");
    } else {
      setPeriod("24h");
    }
  }

  // Generate scales for the graph
  const xScale = scaleTime({
    domain: extent(data, getDate),
    range: [0, xMax],
    round: false,
  });

  const yScale = scaleLinear({
    domain: extent(data, getTemp),
    range: [yMax, 0],
    round: false,
  });

  // Used to fetch the temperature data from the RPi API
  async function fetchTempData() {
    const res = await fetch(url_base + period, {
      method: "GET",
    });
    return res.json();
  }

  // Upon page load, fetch the data
  useEffect(() => {
    fetchTempData().then((d) => setData(d));
  }, [period]);

  // If the data exists, render the graph and stats
  if (data.length > 0) {
    return (
      <div className={styles.container} onClick={flipPeriod}>
        <div className={styles.currentTemp}>
          Surprise Lake Temp:{" "}
          {round(tempstring_to_f(data[0].temp), 1) + "\xB0F"}
        </div>
        <div className={styles.lastUpdated}>
          last updated {timeFormat("%d %b %H:%M")(data[0].timestamp * 1000)}
        </div>
        <div className={styles.graph}>
          <svg width={w_graph} height={h_graph}>
            <Group left={margin.left} top={margin.top}>
              <LinearGradient id="area-gradient" from="#abcff7" to="#185294" />
              <LinePath
                data={data}
                x={(d) => xScale(getDate(d)) ?? 0}
                y={(d) => yScale(getTemp(d)) ?? 0}
                strokeWidth={1}
                stroke="#000000"
                curve={curveMonotoneX}
              />
              <AxisBottom
                top={yMax}
                scale={xScale}
                stroke="#000000"
                numTicks={5}
                tickStroke="#000000"
              />
              <AxisLeft
                scale={yScale}
                numTicks={5}
                stroke="#000000"
                tickStroke="#000000"
              />
            </Group>
          </svg>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
