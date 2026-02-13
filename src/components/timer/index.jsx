import { useEffect, useState } from "react";
import styles from "./styles.module.css";

function Timer() {
  const [secons, setSecons] = useState(0);
  const [isTimerOn, setIsTimerOn] = useState(false);

  useEffect(() => {
    if (isTimerOn) {
      const timeId = setInterval(() => {
        setSecons((prev) => prev + 1);
      }, 1000);
      return () => {
        clearInterval(timeId);
      };
    }
  }, [isTimerOn]);

  return (
    <div>
      <p>Timer: {secons}</p>
      <div>
        <button onClick={() => setIsTimerOn(true)}>Start</button>
        <button onClick={() => setIsTimerOn(false)}>Stop</button>
        <button
          onClick={() => {
            setSecons(0);
            setIsTimerOn(false);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
export default Timer;
