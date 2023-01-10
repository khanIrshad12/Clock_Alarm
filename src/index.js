import { useEffect, useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { createRoot } from "react-dom/client";
import "./styles.css";

const App = () => {
  const [Bl, setBl] = useState(5);
  const [Sl, setSl] = useState(25);
  const [play, setPlay] = useState(false);
  const [timingType, setTimingType] = useState("SESSION");
  const [timeleft, setTimeleft] = useState(1500);

  function handleincrementBl() {
    if (Bl < 60) {
      setBl(Bl + 1);
    }
  }
  function handledecrementBl() {
    if (Bl > 1) {
      setBl(Bl - 1);
    }
  }
  function handleincrementSl() {
    if (Sl < 60) {
      setSl(Sl + 1);
    }
    setTimeleft(timeleft + 60);
  }
  function handledecrementSl() {
    if (Sl > 1) {
      setSl(Sl - 1);
    }
    setTimeleft(timeleft - 60);
  }
  function timerFormat() {
    const minute = Math.floor(timeleft / 60);
    const second = Math.floor(timeleft - minute * 60);
    const formateMinute = minute < 10 ? "0" + minute : minute;
    const formateSecond = second < 10 ? "0" + second : second;
    return formateMinute + ":" + formateSecond;
  }
  const timeOut = setTimeout(() => {
    if (timeleft && play) {
      setTimeleft(timeleft - 1);
    }
  }, 1000);

  function Resettime() {
    const audio = document.getElementById("beep");
    if (!timeleft && timingType === "SESSION") {
      setTimeleft(Bl * 60);
      setTimingType("BREAK");
      audio.play();
    }
    if (!timeleft && timingType === "BREAK") {
      setTimeleft(Sl * 60);
      setTimingType("SESSION");
      audio.pause();
      audio.currentTime = 0;
    }
  }

  function HandleReset() {
    clearTimeout(timeOut);
    setPlay(false);
    setTimeleft(1500);
    setBl(5);
    setSl(25);
    setTimingType("SESSION");
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  }

  function handlePlay() {
    clearTimeout(timeOut);
    setPlay(!play);
  }
  function clock() {
    if (play) {
      timeOut;
      Resettime();
    } else {
      clearTimeout(timeOut);
    }
  }
  useEffect(() => {
    clock();
  }, [play, timeOut, timeleft]);
  let title = timingType === "SESSION" ? "Session" : "Break";

  return (
    <div className="wholebody">
      <div className="Wrapper">
        <h2>25 + 5 Clock</h2>
        <div className="break-session-length">
          <div>
            <h3 id="break-label">Break Length</h3>
            <div>
              <FaArrowUp
                className="button icon"
                disabled={play}
                id="break-increment"
                onClick={handleincrementBl}
              />
              <strong id="break-length">{Bl}</strong>
              <FaArrowDown
                className="button icon"
                disabled={play}
                onClick={handledecrementBl}
                id="break-decrement"
              />
            </div>
          </div>

          <div className="break-session">
            <div>
              <h3 id="session-label">Break Session</h3>
              <div>
                <FaArrowUp
                  className="button icon"
                  onClick={handleincrementSl}
                  id="session-increment"
                />
                <strong id="break-session">{Sl}</strong>
                <FaArrowDown
                  className="button icon"
                  onClick={handledecrementSl}
                  id="session-decrement"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="timer-wrapper">
        <div className="timer">
          <h2 id="timer-label">{title}</h2>
          <h3 id="time-left">{timerFormat()}</h3>
        </div>
        <div className="start_stopbtn">
          <div className="stbtn">
            <button onClick={handlePlay} id="start_stop">
              Start/Stop
            </button>
          </div>

          <button onClick={HandleReset} id="reset">
            Reset
          </button>
        </div>
      </div>
      <audio
        id="beep"
        preload="auto"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<App />);
