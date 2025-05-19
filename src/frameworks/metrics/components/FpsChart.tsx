import {FC, useState} from "react";
import {Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {FpsData} from "../Metrics.tsx";
import "./FpsChart.css";

type Props = {
  currentFps: number|null,
  history: FpsData[],
};

export const FpsChart: FC<Props> = ({currentFps, history}) => {
  const [ animate, setAnimate ] = useState<boolean>(true);

  if (!history.length) {
    return <p>No data available.</p>;
  }

  return (
    <>
      <section className="debug-metrics__fps">
        <p className="current-fps">
          <strong>FPS:</strong>
          &nbsp;{currentFps}
        </p>

        <label style={{display: "inline"}}>
          <input type="checkbox" onChange={e => setAnimate(e.target.checked)} checked={animate} />
          &nbsp;Animate
        </label>

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart data={history}>
            <Line
              type="monotone"
              dataKey="fps"
              stroke="#FF0000"
              dot={false}
              isAnimationActive={animate}
            />

            <XAxis
              dataKey="time"
            />

            <YAxis
              // domain={[0, 120]}
            />

            <Tooltip
              labelFormatter={() => ""}
              formatter={(v: number) =>
                [`${Math.round(v)} FPS`, ""]}
            />
          </LineChart>
        </ResponsiveContainer>
      </section>
    </>
  );
};