import "./App.css";
import React, { useState, useRef, useEffect } from "react";

function App() {
  const [url, setUrl] = useState(undefined);
  const [playericon, setPlayericon] = useState(true);
  const [currentTime, setcurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [timer, setTimer] = useState(100);
  // var timer = "";

  var audio = useRef();

  // useRef(): it will keep holding the audio instance so we can play and pause the audio of the same instance.
  //  If we dont use useRef then every time app is rendered React will create new istance of audio everytime.
  //  Then old instance will be lost(but alive and keep playing the song) and we wont be able to stop the audio.

  const sliderUpdate = () => {
    const timerInterval = setInterval(() => {
      console.log("interval running");
      setcurrentTime(Math.floor(audio.current.currentTime));
    }, 100);
    setTimer(timerInterval);
  };

  const play = () => {
    // console.log("URL Reached to Play btn: " + url);
    // console.log("audio.current Reached to Play btn : " + audio);

    if (url != undefined) {
      setDuration(Math.floor(audio.current.duration));
      setcurrentTime(Math.floor(audio.current.currentTime));
      sliderUpdate();
      audio.current.play();
      setPlayericon(false);
    } else {
      alert("Please insert URL");
    }

    // console.log(inputURL);
    // console.log(Math.floor(audio.current.duration));
  };
  const pause = () => {
    if (playericon === false) {
      clearInterval(timer);
      audio.current.pause();
      setPlayericon(true);
    }
  };

  // useEffect(() => {
  //   audio.current = new Audio(url);
  // }, []);
  useEffect(() => {
    console.log("destruction check");
    if (currentTime === duration) {
      console.log("stop everything");
      pause();
      clearInterval(timer);
      setPlayericon(true);
    }
  }, []);

  // useEffect(() => {
  //   first

  // }, [third])

  return (
    <>
      <div className="container">
        <h1>Submit your Song URL to play song</h1>
        <input
          type="text"
          value="https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/5a/33/4b/5a334b5e-a966-1d5e-fba7-2092dedcefcb/mzaf_6087715471338854682.plus.aac.p.m4a"
        />

        <input
          className="url-input"
          type="text"
          value={url}
          placeholder={"Please Paste Your URL Here"}
          onChange={(e) => {
            setUrl(e.target.value);
            audio.current = new Audio(e.target.value);
          }}
        />
        <div className="player">
          <h1 className="heading">Cipher Audio Player</h1>
          <div className="slider-container">
            <input
              type="range"
              id="music"
              value={currentTime}
              name="vol"
              min="0"
              max={duration}
            />
          </div>
          <button className="btn" onClick={playericon ? play : pause}>
            {playericon ? (
              <i className="fa-solid fa-play" />
            ) : (
              <i className="fa-solid fa-pause" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
