import {FC, useEffect, useRef, useState} from "react";
import "./Metrics.css";
import {Window} from "../../game/gui/windows/Window.tsx";
import {FpsChart} from "./components/FpsChart.tsx";

export const Metrics: FC = () => {
  const [isMetricsWindowOpened, setIsMetricsWindowOpened]
    = useState<boolean>(false);

  const toggleMetrics = () =>
    setIsMetricsWindowOpened(prevState => !prevState);

  const [ fpsData, setFpsData ] = useState<FpsData[]>([]);
  const [ currentFps, setCurrentFps ] = useState<number|null>(null);

  const MAX_POINTS: number = 60;
  const frameCounter = useRef<number>(1);

  const frameCount = useRef<number>(0);
  const lastTime = useRef<DOMHighResTimeStamp>(performance.now());

  useEffect(() => {
    const updateFps = () => {
      const now = performance.now();
      frameCount.current++;

      if (now - lastTime.current >= 1000) {
        const fps = frameCount.current;

        frameCount.current = 0;
        lastTime.current = now;

        setCurrentFps(fps);

        setFpsData(prev => {
          const newData = [...prev, { time: frameCounter.current, fps }];

          frameCounter.current++;

          return newData.length > MAX_POINTS ? newData.slice(-MAX_POINTS) : newData;
        });
      }

      requestAnimationFrame(updateFps);
    };

    requestAnimationFrame(updateFps);
  }, []);

  return (
    <>
      <div
        className="metrics__toggler"

        onClick={toggleMetrics}
      >

        <p className="label">
          METRICS
        </p>
      </div>

      {isMetricsWindowOpened &&
        <Window
          title="[DEV] Metrics"
          width="600px"
          height="auto"

          onClose={toggleMetrics}
        >

          <div className="metrics__container">
            <FpsChart
              currentFps={currentFps}
              history={fpsData}
            />
          </div>
        </Window>}
    </>
  );
};

export type FpsData = {
  time: number,
  fps: number,
};
