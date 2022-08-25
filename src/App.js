import React, { useState, useRef, useEffect } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";

import data from "./data";

function App() {
  // Ref
  const audioRef = useRef(null);
  const backRef = useRef(null);
  const playRef = useRef(null);
  const forwardRef = useRef(null);

  const [Songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(() => {
    return Songs.filter((song) => song.active === true);
  });
  // State
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  const [isPlaying, setIsPlaying] = useState(false);

  const [libraryStatus, setLibraryStatus] = useState(false);

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animationPercentage = Math.round(
      (roundedCurrent / roundedDuration) * 100
    );

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration, // It's equal to duration: duration
      animationPercentage,
    });
  };

  return (
    <div className={`App${libraryStatus ? " library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong[0]} />
      <Player
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong[0]}
        audioRef={audioRef}
        backRef={backRef}
        playRef={playRef}
        forwardRef={forwardRef}
        timeUpdateHandler={timeUpdateHandler}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={Songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />
      <Library
        audioRef={audioRef}
        songs={Songs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
    </div>
  );
}

export default App;
